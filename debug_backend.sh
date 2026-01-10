#!/bin/bash
echo "Testing connectivity to backend 46.62.217.239:8080..."

# 1. Connection Test
nc -zv 46.62.217.239 8080
if [ $? -eq 0 ]; then
    echo "Connection Successful"
else
    echo "Connection Failed! The server cannot reach the backend IP."
    echo "Please checking outgoing firewall rules or backend server status."
fi

# 2. Curl Test with verbose output to see where it hangs
echo "Detailed Request Test:"
curl -v --connect-timeout 5 http://46.62.217.239:8080
