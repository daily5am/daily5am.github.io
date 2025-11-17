# 全栈不止编程 Dockerfile
# 用于开发环境的容器化部署

FROM node:20-alpine

# 设置工作目录
WORKDIR /app

# 复制 package 文件并安装依赖
COPY package*.json ./
RUN npm install

# 复制项目文件（用于开发，支持热重载）
COPY . .

# 暴露端口
EXPOSE 5173

# 启动开发服务器（添加 --host 参数以监听所有网络接口）
CMD ["sh", "-c", "npm run docs:dev -- --host 0.0.0.0"]

