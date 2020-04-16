FROM nginx:stable-alpine
COPY ./dist /usr/share/nginx/html
ADD ./misc/nginx.default /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

