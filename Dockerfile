# Use official Node.js slim image
FROM node:18-slim

# Install necessary packages for Puppeteer + Chrome
RUN apt-get update && \
    apt-get install -y \
      wget \
      gnupg \
      apt-transport-https \
      ca-certificates \
      fonts-liberation \
      libappindicator3-1 \
      xdg-utils \
      libu2f-udev \
      libvulkan1 \
      libgbm1 \
      libxss1 \
      libnss3 \
      libatk-bridge2.0-0 \
      libcairo2 \
      libdrm2 \
      libxcomposite1 \
      libxdamage1 \
      libpango-1.0-0 \
      libpangocairo-1.0-0 \
      libasound2 \
      libatk1.0-0 \
      libatspi2.0-0 \
      libgtk-3-0 && \
    wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list && \
    apt-get update && \
    apt-get install -y google-chrome-stable && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node dependencies
RUN npm install --production

# Copy application code
COPY . .

# Set environment variable for Chrome executable
ENV CHROME_PATH=/usr/bin/google-chrome-stable

# Expose port
EXPOSE 3000

# Start the service
CMD ["node", "index.js"]