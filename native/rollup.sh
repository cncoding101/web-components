#!/bin/bash

# Prompt user to enter a path
read -r -p "Enter the component folder name: " folderName

# Prompt user to enter another input
read -r -p "Enter the component bundle name: " name

relativePath="src/components/$folderName/index.ts"

echo "Entered path: $relativePath"

# Check if the entered path exists
if [ -f "$relativePath" ]; then
  echo "Path exists. Building with Rollup..."

  export WCS_PATH="$relativePath"
  export WCS_NAME="$name"

  npm run build-rollup
else
  echo "Error: Entered path is invalid, verify if the component name matches the folder name."
  exit 1
fi
