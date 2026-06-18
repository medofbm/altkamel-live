FROM node:18-alpine

WORKDIR /app

# Copy the built output from Nuxt
COPY .output/ ./.output/

# Expose port 3000
EXPOSE 3000

# Run the Nitro server
CMD ["node", ".output/server/index.mjs"]
