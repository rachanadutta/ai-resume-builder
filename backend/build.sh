#!/usr/bin/env bash

# Update package lists
apt-get update

# Install Chromium and required libraries for Puppeteer
apt-get install -y chromium-browser ca-certificates fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libcups2 libdbus-1-3 libdrm2 libgbm1 libgtk-3-0 libnspr4 libnss3 libx11-xcb1 libxcomposite1 libxdamage1 libxrandr2 xdg-utils wget

# Set environment variable for Puppeteer
export PUPPETEER_EXECUTABLE_PATH="/usr/bin/chromium-browser"

# Install npm dependencies
npm install
