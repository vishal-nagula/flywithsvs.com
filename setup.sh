#!/bin/bash

# Exit on error
set -e

# Colors for output
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting SVS Home Landing Setup...${NC}"

# Check if running as root
if [ "$EUID" -ne 0 ]; then
  echo "Please run as root (sudo ./setup.sh)"
  exit 1
fi

# 1. Update and Install Dependencies
echo -e "${GREEN}Updating system and installing dependencies (Docker, Nginx, Certbot)...${NC}"
apt-get update
apt-get install -y ca-certificates curl gnupg nginx certbot python3-certbot-nginx git

# Install Docker if not present
if ! command -v docker &> /dev/null; then
    echo "Installing Docker..."
    install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    chmod a+r /etc/apt/keyrings/docker.gpg

    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
      tee /etc/apt/sources.list.d/docker.list > /dev/null
    
    apt-get update
    apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
else
    echo "Docker is already installed."
fi

# 2. Gather Information
echo -e "${GREEN}Configuration${NC}"
read -p "Enter your Domain Name (e.g., example.com): " DOMAIN_NAME
read -p "Enter your Email (for SSL renewal): " EMAIL

if [ -z "$DOMAIN_NAME" ] || [ -z "$EMAIL" ]; then
    echo "Domain and Email are required."
    exit 1
fi

# 3. Configure Nginx Reverse Proxy
echo -e "${GREEN}Configuring Nginx Reverse Proxy for $DOMAIN_NAME...${NC}"

# Backend URL (User provided or default)
BACKEND_URL="http://46.62.217.239:8080"
echo -e "Using Backend URL: $BACKEND_URL"

NGINX_CONF="/etc/nginx/sites-available/$DOMAIN_NAME"

cat > "$NGINX_CONF" <<EOF
server {
    listen 80;
    server_name $DOMAIN_NAME www.$DOMAIN_NAME;

    # Frontend (SPA)
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }

    # Backend API Proxy
    location /api/ {
        proxy_pass $BACKEND_URL;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        
        # Standard proxy headers
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

# Enable site
ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/
# Remove default if it exists to avoid conflicts
rm -f /etc/nginx/sites-enabled/default

# Test Nginx config
nginx -t

# Reload Nginx
systemctl reload nginx

# 4. Deploy Application
echo -e "${GREEN}Deploying Application...${NC}"
chmod +x deploy.sh
./deploy.sh

# 5. Setup SSL with Certbot
echo -e "${GREEN}Obtaining SSL Certificates...${NC}"
set +e # Allow certbot to fail without stopping script
certbot --nginx --non-interactive --agree-tos -m "$EMAIL" -d "$DOMAIN_NAME" -d "www.$DOMAIN_NAME"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}SSL Setup Complete! Your app is live at https://$DOMAIN_NAME${NC}"
else
    echo -e "${GREEN}SSL Setup Failed (likely DNS propagation).${NC}"
    echo -e "Your app is deployed on HTTP (http://$DOMAIN_NAME)."
    echo -e "Once DNS propagates, run this to enable HTTPS:"
    echo -e "  sudo certbot --nginx -d $DOMAIN_NAME -d www.$DOMAIN_NAME"
fi
set -e
