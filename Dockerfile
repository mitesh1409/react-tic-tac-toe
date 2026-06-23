# Step 1: Use the latest Node 24 Alpine image
FROM node:24-alpine

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package files
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Expose Vite's default port
EXPOSE 5173

# Step 7: Run Vite dev server, exposing it to the network
CMD ["npm", "run", "dev", "--", "--host"]
