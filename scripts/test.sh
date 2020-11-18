#!/usr/bin/env bash

if [[ -n "$NODE_ICU_DATA" ]]
then
  TZ=UTC npx jest "$@"
else
  RED='\033[0;31m'
  WHITE='\033[0m'
  echo "${RED}Two steps before testing:"
  echo "  1. Globally install internationalization data with the following command."
  echo "     npm install -g full-icu"
  echo "  2. Set an environmental variable with the full-icu data path."
  echo "  If the path were /usr/lib/node_modules/full-icu then you would run"
  echo "     export NODE_ICU_DATA=/usr/lib/node_modules/full-icu"
  echo "${WHITE}"
  echo "Once set, you should be able to run npm test again.";
  echo ""
fi
