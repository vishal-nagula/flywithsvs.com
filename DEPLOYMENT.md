# Deployment Guide for SVS Home Landing

This guide outlines the steps to deploy the SVS Home Landing application on an Ubuntu server with SSL (HTTPS) enabled.

## Prerequisites

- An Ubuntu Server (20.04 or 22.04 recommended).
- A domain name pointing to your server's IP address (e.g., `example.com`).
- Root or sudo access to the server.

## Step 1: Clone Repository

Login to your Ubuntu server and clone the repository:

```bash
git clone https://github.com/Start-Visa-Services/svs-home-landing.git
cd svs-home-landing
```

## Step 2: Run Setup Script

The `setup.sh` script will handle everything: installing Docker/Nginx, configuring the reverse proxy, setting up SSL, and deploying the app.

1.  Make the script executable:
    ```bash
    chmod +x setup.sh
    ```

2.  Run the script (must be run with sudo):
    ```bash
    sudo ./setup.sh
    ```

3.  **Follow the prompts:**
    - Enter your **Domain Name** (e.g., `svs-visa.com`).
    - Enter your **Email Address** (for SSL certificate notifications).

## Step 3: Verification

Once the script finishes, open your browser and go to:
`https://your-domain.com`

## Updating the App

To update the application with the latest code:

1.  Navigate to the directory:
    ```bash
    cd svs-home-landing
    ```

2.  Run the deploy script:
    ```bash
    ./deploy.sh
    ```
