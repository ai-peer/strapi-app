# 具体每个服务的去看 packages 里面的 Dockerfile
# 这个是 all in one 的。

## env 1
FROM  mixnet/node:v18 as ADMIN_BUILDER
ENV NODE_OPTIONS='--max_old_space_size=4096 --openssl-legacy-provider'
ENV EEE=production
WORKDIR /app
USER root
#RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
COPY ./packages/admin/ ./
RUN source /etc/profile
#RUN npm install --global yarn
RUN npm config set registry https://registry.npm.taobao.org/
RUN yarn config set registry https://registry.npm.taobao.org/
RUN yarn install
# RUN sed -i 's/\/assets/\/admin\/assets/g' dist/admin/index.html
RUN yarn build


## env 2
FROM mixnet/node:v18 as SERVER_BUILDER
ENV NODE_OPTIONS=--max_old_space_size=4096
WORKDIR /app
COPY ./packages/server/ .
RUN source /etc/profile
#RUN npm install --global yarn
RUN npm config set registry https://registry.npm.taobao.org/
RUN yarn config set registry https://registry.npm.taobao.org/
RUN yarn install
RUN yarn build


## env 3
FROM mixnet/node:v18 AS WEBSITE_BUILDER
WORKDIR /app
#RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
COPY ./pnpm-lock.yaml ./
COPY ./pnpm-workspace.yaml ./
COPY ./tsconfig.base.json ./
COPY ./lerna.json ./
COPY ./packages/website ./packages/website
COPY ./package.json ./
ENV isBuild t
ENV VAN_BLOG_ALLOW_DOMAINS "pic.mereith.com"
ARG VAN_BLOG_BUILD_SERVER
ENV VAN_BLOG_SERVER_URL ${VAN_BLOG_BUILD_SERVER}
ARG VAN_BLOG_VERSIONS
ENV VAN_BLOG_VERSION ${VAN_BLOG_VERSIONS}
RUN source /etc/profile
#RUN npm install --global yarn
RUN npm config set registry https://registry.npm.taobao.org/
RUN yarn config set registry https://registry.npm.taobao.org/
RUN yarn install
RUN cd ./packages/website && yarn install
RUN cd /app
RUN yarn build:website
# RUN pnpm install --frozen-lockfile
# RUN pnpm build:website






## env 4
#运行容器
FROM mixnet/node:v18 AS RUNNER
WORKDIR /app
#RUN timedatectl set-timezone Asia/Shanghai 
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
  && echo "Asia/Shanghai" > /etc/timezone 
RUN dnf install -y 'dnf-command(copr)'
RUN dnf copr -y enable @caddy/caddy
RUN dnf install -y caddy
RUN source /etc/profile
#RUN npm install --global yarn
# 安装 waline
WORKDIR /app/waline
COPY ./packages/waline/ ./
RUN yarn install
# 复制 server
WORKDIR /app/server
COPY --from=SERVER_BUILDER /app/node_modules ./node_modules
COPY --from=SERVER_BUILDER /app/dist/ ./
# 复制 website
WORKDIR /app/website
COPY --from=WEBSITE_BUILDER  /app/packages/website/.next/standalone/ ./
COPY --from=WEBSITE_BUILDER /app/packages/website/next.config.js ./next.config.js
COPY --from=WEBSITE_BUILDER /app/packages/website/public ./public
COPY --from=WEBSITE_BUILDER /app/packages/website/package.json ./package.json
COPY --from=WEBSITE_BUILDER  /app/packages/website/.next/static ./.next/static
RUN  cd  /app/website  && cd ..
ENV NODE_ENV production
ENV VAN_BLOG_SERVER_URL "http://127.0.0.1:3000"
ENV VAN_BLOG_ALLOW_DOMAINS "pic.mereith.com"
ENV VAN_BLOG_DATABASE_URL "mongodb://mongo:27017/vanBlog?authSource=admin"
ENV EMAIL "vanblog@mereith.com"
ENV VAN_BLOG_WALINE_DB "waline"
# 复制静态文件
WORKDIR /app/admin
COPY --from=ADMIN_BUILDER /app/dist/ ./

# 复制入口文件
WORKDIR /app
COPY caddyTemplate.json /app/caddyTemplate.json
COPY ./entrypoint.sh /root/bootstrap.sh
RUN pwd && ls
ENV PORT 3001 
# 增加版本
ARG VAN_BLOG_VERSIONS
ENV VAN_BLOG_VERSION ${VAN_BLOG_VERSIONS}
VOLUME /app/static
VOLUME /var/log
VOLUME /root/.config/caddy
VOLUME /root/.local/share/caddy



EXPOSE 80
# ENTRYPOINT [ "/app/entrypoint.sh" ]
# CMD [ "entrypoint.sh" ]
