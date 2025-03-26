
CREATE TABLE IF NOT EXISTS subscription (
    token TEXT,
    subscription TEXT,
    key TEXT
);

CREATE TABLE IF NOT EXISTS history (
    info TEXT,
    push_time TEXT,
    token TEXT
);