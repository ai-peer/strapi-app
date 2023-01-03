const fs = require("fs");
function buildSecret(size = 24) {
  let secret = buildSN(size);
  return Buffer.from(secret).toString("base64");
}
function buildSN(size = 24) {
  let r = Math.random().toString(36).slice(2);
  if (r.length < size) {
    r += buildSN(size - r.length);
  }
  return r;
}

function build() {
  let env = {
    HOST: "0.0.0.0",
    PORT: 80,
    APP_KEYS: `${buildSecret()},${buildSecret()}`,
    API_TOKEN_SALT: `${buildSecret()}`,
    ADMIN_JWT_SECRET: `${buildSecret()}`,
    JWT_SECRET: `${buildSecret()}`,
  };
  let writer = fs.createWriteStream(".env");
  for (let key in env) {
    writer.write(key + "=" + env[key] + "\r\n");
  }
  writer.end();
  writer.close();
}

//console.info("sn", buildSecret());
build();