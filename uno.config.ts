import { defineConfig } from 'unocss'

export default defineConfig({
    content: {
        pipeline: {
            include: [/\.vue$/, /\.vue\?vue/, /\.md$/, /\.html$/]
        }
    }
})