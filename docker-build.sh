#!/bin/bash

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo "Error: jq is not installed. Please install jq and try again."
    exit 1
fi

# Read values from package.json
image=$(jq -r '.dockerImage' package.json)
version=$(jq -r '.version' package.json)
source=$(jq -r '.repository.url' package.json | sed -E 's|git\+||; s|\.git$||')

# Build and push the Docker image
docker buildx build . --push \
    -t "${image}:${version}" -t "${image}:latest" \
    --label "org.opencontainers.image.source=${source}" \
    --label "org.opencontainers.image.version=${version}"

# Output the Docker image information
echo "Docker image: ${image}:${version}"