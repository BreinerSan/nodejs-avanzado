
FROM node:20

WORKDIR /app

COPY . .

CMD ["node", "middleware/index.js"]