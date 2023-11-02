FROM node:18

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]
