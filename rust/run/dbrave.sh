#!/bin/bash

echo "   ********************************************"
echo "   ****"
echo "   **** stopping dbrave container"
echo "   ****"
echo "   ********************************************"
echo
docker stop ldc-development-dbrave-0.1.0-b4
docker rm ldc-development-dbrave-0.1.0-b4

echo "   ***********************************************"
echo "   ****"
echo "   **** installing ldc-development-dbrave-0.1.0-b4 container"
echo "   ****"
echo "   ***********************************************"
echo

docker run \
  -d \
  --rm \
  \
  -e LMS_BASE="${HOME}/.local" \
  -e LMS_HOME="${HOME}" \
  -e LMS_CONF="${HOME}/.config" \
  \
  -v ${HOME}/bin:/userbin \
  -v ${HOME}/.local:/usrlocal \
  -v ${HOME}/.config/docker:/conf \
  -v ${HOME}/.config/docker/ldc-development-dbrave-0.1.0:/root \
  -v ${HOME}/.config/docker/ldc-development-dbrave-0.1.0/workspace:/workspace \
  \
  --name=ldc-development-dbrave-0.1.0-b4 \
ewsdocker/ldc-development:dbrave-0.1.0-b4
[[ $? -eq 0 ]] ||
 {
 	echo "build container ldc-development-dbrave-0.1.0-b4 failed."
 	exit 2
 }

echo "   ********************************************"
echo "   ****"
echo "   **** stopping ldc-development-dbrave-0.1.0-b4 daemon"
echo "   ****"
echo "   ********************************************"
echo

docker stop ldc-development-dbrave-0.1.0-b4
[[ $? -eq 0 ]] ||
 {
 	echo "stop ldc-development-dbrave-0.1.0-b4 failed."
    exit 3
 }

echo "   ********************************************"
echo "   ****"
echo "   **** ldc-development:dbrave successfully installed."
echo "   ****"
echo "   ********************************************"
echo

exit 0

