FROM ubuntu:latest
WORKDIR /app
COPY . .
RUN mv .env.prod .env
RUN apt-get update
RUN apt-get install -y npm
RUN npm install
RUN npm run build
EXPOSE 3333
CMD ["npm", "run", "start:prod"]
