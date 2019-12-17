# 第一阶段yarn-build
FROM wen911119/node-alpine-with-yarn AS yarn-builder
ADD /src /root/src
ADD package.json /root
ADD template.html /root

WORKDIR /root

ARG BUILD_TARGET=dev

RUN node -v
RUN yarn -v
RUN yarn
RUN yarn build:${BUILD_TARGET}

# 第二阶段上传
FROM wen911119/oss-uploader:latest
COPY --from=yarn-builder /root/dist /bundle
ARG region
ARG accessKeyId
ARG accessKeySecret
ARG bucket

RUN ls /bundle
RUN node index.js
