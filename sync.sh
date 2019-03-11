#!/bin/bash

set -e
set -u
SCRIPT_PATH="$( cd "$(dirname "$0")" ; pwd -P )"

cd ${SCRIPT_PATH}
git checkout master
git pull upstream master:master
git push origin master:master
git remote update --prune
