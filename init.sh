#!/bin/bash

set -e
set -u
SCRIPT_PATH="$( cd "$(dirname "$0")" ; pwd -P )"

cd ${SCRIPT_PATH}
set +e
git remote remove upstream
git remote add upstream https://github.com/TeamYouthChina/frontend.git
set -e
./sync.sh
set +e
rm -f ./.git/hooks/pre-commit
set -e
ln -s ./git-hooks.pre-commit.sh ./.git/hooks/pre-commit
yarn install
