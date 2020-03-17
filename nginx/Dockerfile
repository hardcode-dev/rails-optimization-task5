FROM nginx:1.17.9-alpine

#COPY nginx-repo.crt /etc/ssl/nginx/
#COPY nginx-repo.key /etc/ssl/nginx/

#RUN mkdir /etc/nginx/sites-enabled/ /etc/nginx/sites-available/
#COPY nginx/sites-available/* ./etc/nginx/sites-available/
#
#RUN ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default

EXPOSE 80

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
