#!/usr/bin/env bash
set -euo pipefail

# This script expects the following variables to exist in the .env file:
# SSH_DEPLOY_USERNAME
# SSH_DEPLOY_HOSTNAME
#
# It is expected that the SSH_USERNAME has passwordless access to the SSH_HOSTNAME
#

trap "git remote remove llamaserver" EXIT  

source ./.env
set_or_exit() {
  if [ -z "${!1}" ]; then
    echo "The environment variable $1 is not set. Exiting."
    exit 1
  fi
  export "${1}"="${!1}"
}

run_ssh_command() {
  ssh "${SSH_DEPLOY_USERNAME}@${SSH_DEPLOY_HOSTNAME}" "$1"
}

set_or_exit "SSH_DEPLOY_USERNAME"
set_or_exit "SSH_DEPLOY_HOSTNAME"

APP_TARGET_FOLDER="app" # Where the checked out code will live
GIT_TARGET_FOLDER="app.git" # Where the git worktree will live

GIT_DEPLOY_BRANCH="kd/finish-docker-compose-setup-for-deployment"

# set up the local remote
git remote add llamaserver ssh://${SSH_DEPLOY_USERNAME}@${SSH_DEPLOY_HOSTNAME}:/home/mealplanner/${GIT_TARGET_FOLDER}

# setup the remote folder for git if its not done already
# shellcheck disable=SC2029
run_ssh_command "git init --bare ${GIT_TARGET_FOLDER}"

# push the code to the server
git push --force -v llamaserver ${GIT_DEPLOY_BRANCH}

run_ssh_command "git --work-tree ${APP_TARGET_FOLDER} --git-dir=${GIT_TARGET_FOLDER}/ checkout -f ${GIT_DEPLOY_BRANCH}"

# tear down the old docker containers
run_ssh_command "cd ${TARGER_FOLDER} && docker compose down -v"

run_ssh_command "cd ${TARGER_FOLDER} && docker compose up -d --build"


