#!/bin/bash

# Stop script on error
set -e

echo "Starting deployment..."

# Pull latest changes
echo "Pulling latest changes..."
git pull

# Rebuild and restart container
echo "Rebuilding and restarting container..."
docker compose up -d --build

# Prune unused images to save space
echo "Cleaning up..."
docker image prune -f

echo "Deployment successful!"
