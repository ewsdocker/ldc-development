#!/bin/bash

cd ~/Development/ewslms/ldc-dev

echo "   ********************************************"
echo "   ****"
echo "   **** stopping dbrave container"
echo "   ****"
echo "   ********************************************"
echo
docker rm ldc-dev-dbrave-0.1.0

echo "   ********************************************"
echo "   ****"
echo "   **** removing dbrave image"
echo "   ****"
echo "   ********************************************"
echo
docker rmi ewsdocker/ldc-dev:dbrave-0.1.0

# ===========================================================================
#
#    ldc-dev:dbrave-0.1.0
#
# ===========================================================================

echo "   ***************************************************"
echo "   ****"
echo "   **** building ewsdocker/ldc-dev:dbrave-0.1.0 image "
echo "   ****"
echo "   ***************************************************"
echo
docker build \
  --build-arg RUN_APP="/bin/bash" \
  \
  --build-arg LIB_HOST=http://alpine-nginx-pkgcache \
  --network=pkgnet \
  \
  --file Dockerfile.dbrave \
  -t ewsdocker/ldc-dev:dbrave-0.1.0  .
[[ $? -eq 0 ]] ||
 {
 	echo "build ewsdocker/ldc-dev:dbrave-0.1.0 failed."
 	exit 1
 }

echo "   ***********************************************"
echo "   ****"
echo "   **** installing ldc-dev-dbrave-0.1.0 container"
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
  -v ${HOME}/.config/docker/ldc-dev-dbrave-0.1.0:/root \
  -v ${HOME}/.config/docker/ldc-dev-dbrave-0.1.0/workspace:/workspace \
  \
  --name=ldc-dev-dbrave-0.1.0 \
ewsdocker/ldc-dev:dbrave-0.1.0
[[ $? -eq 0 ]] ||
 {
 	echo "build container ldc-dev-dbrave-0.1.0 failed."
 	exit 1
 }

echo "   ********************************************"
echo "   ****"
echo "   **** stopping ldc-dev-dbrave-0.1.0 daemon"
echo "   ****"
echo "   ********************************************"
echo

docker stop ldc-dev-dbrave-0.1.0
[[ $? -eq 0 ]] ||
 {
 	echo "stop ldc-dev-dbrave-0.1.0 failed."
 }

echo "   ********************************************"
echo "   ****"
echo "   **** ldc-dev:dbrave successfully installed."
echo "   ****"
echo "   ********************************************"
echo

exit 0

