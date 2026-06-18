Deployment steps
#on device
# 1. Build the Nuxt app
npm run build

# 2. Package it into a Docker image (AMD64 format for the server)
docker build --platform linux/amd64 -t altkamel-frontend .

# 3. Export the image to a file
docker save altkamel-frontend > altkamel-frontend.tar

# 4. Upload it to the server
scp altkamel-frontend.tar abdullah@172.16.6.102:~/iptv-streaming-engine/


#on server
cd /iptv-streaming-engine
sudo docker load < altkamel-frontend.tar
sudo docker compose up -d --force-recreate frontend
