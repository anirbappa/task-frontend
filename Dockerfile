FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 1. Declare the ARG argument parameter
ARG REACT_APP_API_URL
# 2. Inject it into the environment scope during compilation
ENV REACT_APP_API_URL=$REACT_APP_API_URL


FROM nginx:1.25-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
