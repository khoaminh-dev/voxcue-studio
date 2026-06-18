# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Pass build args if needed (like VITE_FIREBASE_API_KEY)
# ARG VITE_FIREBASE_API_KEY
# ENV VITE_FIREBASE_API_KEY=$VITE_FIREBASE_API_KEY

RUN npm run build

# Production stage using Nginx
FROM nginx:alpine

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Add custom nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
