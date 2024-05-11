#!/usr/bin/env bash
set -euo pipefail

# This script expects the following variables to exist in the .env file:
# SSH_DEPLOY_USERNAME
# SSH_DEPLOY_HOSTNAME
#
# It is expected that the SSH_USERNAME has passwordless access to the SSH_HOSTNAME
#

# make sure the remote is removed when the script exits
trap "git remote remove server-name" EXIT  

# helper function to check if a variable is set, re-export it if it is and exit if it is not
set_or_exit() {
  if [ -z "${!1}" ]; then
    echo "The environment variable $1 is not set. Exiting."
    exit 1
  fi
  export "${1}"="${!1}"
}
# helper function to run a command on the remote server
run_ssh_command() {
  ssh "${SSH_DEPLOY_USERNAME}@${SSH_DEPLOY_HOSTNAME}" "$1"
}

# ------ Main Script ------

# Pull in the .env file
source ./.env
# Check that the required variables are set
set_or_exit "SSH_DEPLOY_USERNAME"
set_or_exit "SSH_DEPLOY_HOSTNAME"

APP_TARGET_FOLDER="app" # Where the checked out code will live
GIT_TARGET_FOLDER="app.git" # Where the git worktree will live

GIT_DEPLOY_BRANCH="main" # This could be a different branch if you want to test out things

# set up the local remote
git remote add server-name ssh://${SSH_DEPLOY_USERNAME}@${SSH_DEPLOY_HOSTNAME}:/home/mealplanner/${GIT_TARGET_FOLDER}

# setup the remote folder for git if its not done already
run_ssh_command "git init --bare ${GIT_TARGET_FOLDER}"

# push the code to the server
git push --force -v server-name ${GIT_DEPLOY_BRANCH}

# Actually put the code in the right place for use
run_ssh_command "git --work-tree ${APP_TARGET_FOLDER} --git-dir=${GIT_TARGET_FOLDER}/ checkout -f ${GIT_DEPLOY_BRANCH}"

# make sure a DB file always exists.
run_ssh_command "mkdir -p ./database && touch ./database/production.sqlite"
# tear down the old docker containers
run_ssh_command "cd ${APP_TARGET_FOLDER} && docker compose down -v" # The -v flag says to delete the volumes as well
# build and start the next set of containers
run_ssh_command "cd ${APP_TARGET_FOLDER} && docker compose up -d --build"


