#!/bin/bash
echo "=== Debugging HTTPS/SSL Status ==="

# 1. Check if Nginx (Host) is running and listening on 443
echo "[*] Checking Host Nginx ports..."
netstat -tulpn | grep nginx

# 2. Check Certbot Certificates
echo "[*] Checking SSL Certificates..."
sudo certbot certificates

# 3. Check Nginx Error Logs (Last 20 lines)
echo "[*] Host Nginx Error Logs:"
tail -n 20 /var/log/nginx/error.log

# 4. Check if Docker container is up
echo "[*] Docker Container Status:"
docker ps

# 5. Check if we can curl localhost:3000 (Container)
echo "[*] Curl Local Container (Port 3000):"
curl -I http://localhost:3000
