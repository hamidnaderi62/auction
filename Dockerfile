FROM node:14-alpine
WORKDIR /home
COPY . .
RUN npm install
EXPOSE 7052
CMD ["npm", "run", "start"]
