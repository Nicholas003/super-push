
import { Hono } from "hono";
import { env } from 'hono/adapter'
import { buildPushPayload } from '@block65/webcrypto-web-push';
import { cors } from 'hono/cors'
import { md5 } from "hono/utils/crypto";


const app = new Hono<{ Bindings: Env }>();

app.use('*', cors())

app.get("/env/publicKey", async (c) => {

    const { publicKey } = env(c)

    const { token } = c.req.query()

    const subscriptionData = await c.env.DB.prepare(
        "SELECT * FROM subscription WHERE token = ?",
    )
        .bind(token)
        .first<{ token: string, subscription: string, key: string }>()

    let pushKey = subscriptionData?.key

    if (!subscriptionData) {
        pushKey = await md5(`${token}${Date.now()}`) as string
        // 新增
        await c.env.DB.prepare(
            "INSERT INTO subscription (token, key) VALUES (?,?)",
        )
            .bind(token, pushKey)
            .run();
    }

    return c.json({
        code: 200,
        data: {
            publicKey,
            pushKey: pushKey,
            subscription: !!subscriptionData?.subscription
        }
    });
})

app.post("/subscribe", async (c) => {
    const { subscription, token } = await c.req.json();
    // const subscriptionData = await c.env.DB.prepare(
    // 	"INSERT INTO subscription (token, subscription) VALUES (?, ?)",
    // )

    //查询是否存在 
    const subscriptionData = await c.env.DB.prepare(
        "SELECT * FROM subscription WHERE token = ?",
    )
        .bind(token)
        .first<{ token: string, subscription: string }>()

    let res
    if (subscriptionData) {
        //更新
        res = await c.env.DB.prepare(
            "UPDATE subscription SET subscription = ? WHERE token = ?",
        )
            .bind(JSON.stringify(subscription), token)
            .run();
    } else {
        //插入
        res = await c.env.DB.prepare(
            "INSERT INTO subscription (token, subscription, key) VALUES (?,?,?)",
        )
            .bind(token, JSON.stringify(subscription), md5(`${token}${Date.now()}`))
            .run();
    }

    return c.json({
        code: 200,
        data: res
    })
})



app.all("/push/:key", async (c) => {

    const { publicKey, privateKey } = env(c)

    let requestData = c.req.query()

    // const postData = await c.req.json()
    if (c.req.method === 'POST') {
        const postData = await c.req.json()
        requestData = Object.assign({}, requestData, postData)
    }

    const { title, body, data, icon, redirect_uri } = { ...requestData }

    const subscriptionData = await c.env.DB.prepare(
        "SELECT * FROM subscription WHERE key = ?",
    )
        .bind(c.req.param("key"))
        .first<{ token: string, subscription: string }>();

    // return c.json({ subscription });

    const subscriptionInfo = JSON.parse(subscriptionData!.subscription);

    const pl = JSON.stringify({ title, body, icon, data });

    const payload = await buildPushPayload({
        data: pl,
        options: {
            ttl: 86400
        }
    }, subscriptionInfo, {
        subject: 'mailto:test@163.com',
        publicKey: publicKey,
        privateKey: privateKey
    });

    const res = await fetch(subscriptionInfo.endpoint, payload).then((res) => {
        console.log(res)
        return res.status
    })

    if (redirect_uri) {
        return c.redirect(redirect_uri, 302)
    }

    return c.json({ code: res });
});

export default new Hono().route('/api', app)
