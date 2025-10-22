# Sử dụng Node 22
FROM node:22-alpine

# Đặt thư mục làm việc
WORKDIR /app

# Copy package.json để cài trước
COPY package*.json ./
RUN npm install

# Copy toàn bộ code
COPY . .

# Expose cổng dev server
EXPOSE 5173

# Chạy ở chế độ dev (nếu build production thì có thể thay)
CMD ["npm", "run", "dev", "--", "--host"]
