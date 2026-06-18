Deployment steps
#on device
docker build --platform linux/amd64 -t altkamel-frontend .
docker save altkamel-frontend > altkamel-frontend.tar
scp altkamel-frontend.tar user@altkamel.ly:/iptv-streaming-engine/

#on server
sudo docker load < altkamel-frontend.tar
sudo docker compose up -d --force-recreate frontend
