FROM node:slim

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

CMD ["npm", "run", "start:test"]

EXPOSE 3000