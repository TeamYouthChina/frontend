#!/bin/bash

# NOTE:
# 
# 1. The script should be executed on the root directory of the repo.
# 2. Before using the script, execute one of the following command:
#    - `yarn add --dev eslint`
#    - `npm install --save-dev eslint`
# 3. If the repo is created by `create-react-app`, ignore #2.

set -e
set -u
SCRIPT_PATH=`cd "$(dirname "$0")"; pwd -P`

cd "${SCRIPT_PATH}"
./node_modules/eslint/bin/eslint.js "$@"
