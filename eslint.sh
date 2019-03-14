#!/bin/bash

set -u
SCRIPT_PATH="$( cd "$(dirname "$0")" ; pwd -P )"

cd ${SCRIPT_PATH}
./node_modules/eslint/bin/eslint.js "$@"
