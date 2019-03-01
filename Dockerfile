FROM nginx:1.15.5

MAINTAINER jerrychir <jerrychir@163.com>

WORKDIR /usr/src/app/


COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY ./dist  /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
