FROM node as builder

# RUN npm install
# RUN npm install package.json

COPY . /app
WORKDIR /app

RUN npm ci
RUN npm run build


FROM nginx:stable-alpine as runner

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY nginx.conf /etc/nginx/nginx.conf
