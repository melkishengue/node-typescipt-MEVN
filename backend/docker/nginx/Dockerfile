# Use the standard Nginx image from Docker Hub
FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080
EXPOSE 8081

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]