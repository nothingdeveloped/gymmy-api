
# Deploy to production
# Usage : ./deploy.sh <SSH_USER> <SSH_HOST> <SSH_KEY>


SSH_USER = $0 || "ops"
SSH_HOST = $1 || "237.84.2.178"
SSH_PATH = "gimmy"
SSH_KEY =  $2 || "gimmy.pem"

SSH_USER_HOST = "${SSH_USER}@${SSH_HOST}"

# remove previous build
echo "Removing previous build......."
ssh -i ${SSH_KEY} ${SSH_USER_HOST} "rm -rf ${SSH_PATH}"
# copy new build
echo "Deploying new build........"
scp -i ${SSH_KEY} -r build/* ${SSH_USER_HOST}:${SSH_PATH}/build
scp -i ${SSH_KEY} -r public/* ${SSH_USER_HOST}:${SSH_PATH}/public
scp -i ${SSH_KEY} package.json ${SSH_USER_HOST}:${SSH_PATH}
scp -i ${SSH_KEY} package-lock.json ${SSH_USER_HOST}:${SSH_PATH}
scp -i ${SSH_KEY} server.js ${SSH_USER_HOST}:${SSH_PATH}

# Install node modules
echo "Installing node modules........"
ssh -i ${SSH_KEY} ${SSH_USER_HOST} "cd ${SSH_PATH} && npm ci"


# restart
echo "Restarting server........"
ssh -i ${SSH_KEY} ${SSH_USER_HOST} "cd ${SSH_PATH} && npm run prod"

echo "Done.........."


