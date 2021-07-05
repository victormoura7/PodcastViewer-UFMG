# creating an image based on Node
FROM node:14.15.4-alpine

# Creating app dir on the machine
WORKDIR /app

# copy project to the container
COPY . .

# running project
CMD ["node", "dist/main.js"]
