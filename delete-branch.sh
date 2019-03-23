#!/bin/bash

SCRIPT_PATH="$( cd "$(dirname "$0")" ; pwd -P )"

# input
if [[ -z $1 ]]; then
	echo Branch not set, required.
	exit 255
fi
BRANCH=$1

cd ${SCRIPT_PATH}
git push origin :${BRANCH}
./sync.sh
git branch -d ${BRANCH}
