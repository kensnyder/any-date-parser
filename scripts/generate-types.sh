#!/usr/bin/env bash

RED='\033[0;31m'
GREEN='\033[0;32m'
WHITE='\033[0m'

# First ensure that full-icu data is available
modulesPath="$(dirname "$(which node)")"/../lib/node_modules
typescriptPath="$modulesPath/typescript"

if [ ! -d "$typescriptPath" ]
then
  echo "${GREEN}Attempting to globally install typescript to allow building index.d.ts...${WHITE}"
  echo "npm install -g typescript"
  npm install -g typescript
fi

echo "building index.d.ts..."
tsc -p declaration.tsconfig.json

echo "DONE";
