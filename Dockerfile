FROM nginx
COPY src /usr/share/nginx/src
COPY nginx/default.conf /etc/nginx/conf.d/default.conf