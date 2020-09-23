#!/bin/bash

cd ~/Development/ewslms/ldc-dev

echo "   ********************************************"
echo "   ****"
echo "   **** removing dbashvars container"
echo "   ****"
echo "   ********************************************"
echo
docker stop ldc-dev-dbashvars-0.1.0 > /dev/null 2>&1
docker rm ldc-dev-dbashvars-0.1.0 > /dev/null 2>&1

echo "   ********************************************"
echo "   ****"
echo "   **** removing dbashvars image"
echo "   ****"
echo "   ********************************************"
echo
docker rmi ewsdocker/ldc-dev:dbashvars-0.1.0 > /dev/null 2>&1

# ===========================================================================
#
#    ldc-dev:dbashvars-0.1.0
#
# ===========================================================================

echo "   ***************************************************"
echo "   ****"
echo "   **** building ewsdocker/ldc-dev:dbashvars-0.1.0 image "
echo "   ****"
echo "   ***************************************************"
echo

docker build \
  --build-arg RUN_APP="bashVarsTests" \
  \
  --build-arg BUILD_NAME="ldc-dev" \
  --build-arg BUILD_VERSION="dbashvars" \
  --build-arg BUILD_VERS_EXT="-0.1.0" \
  --build-arg BUILD_EXT_MOD="" \
  \
  --build-arg FROM_REPO="ewsdocker" \
  --build-arg FROM_PARENT="ldc-dev" \
  --build-arg FROM_VERS="drustc" \
  --build-arg FROM_EXT="-0.1.0" \
  --build-arg FROM_EXT_MOD="" \
  \
  --file Dockerfile.dbashvars \
  -t ewsdocker/ldc-dev:dbashvars-0.1.0  .
[[ $? -eq 0 ]] ||
 {
 	echo "build ewsdocker/ldc-dev:dbashvars-0.1.0 failed."
 	exit 1
 }

echo "   ***********************************************"
echo "   ****"
echo "   **** installing ldc-dev-dbashvars-0.1.0 container"
echo "   ****"
echo "   ***********************************************"
echo

docker run \
  -it \
  -e LRUN_APP="/bin/bash" \
  \
  -e LMS_BASE="${HOME}/.local" \
  -e LMS_HOME="${HOME}" \
  -e LMS_CONF="${HOME}/.config" \
  \
  -v ${HOME}/bin:/userbin \
  -v ${HOME}/.local:/usrlocal \
  -v ${HOME}/.config/docker:/conf \
  -v ${HOME}/.config/docker/ldc-dev-dbashvars-0.1.0:/root \
  -v ${HOME}/.config/docker/ldc-dev-dbashvars-0.1.0/workspace:/workspace \
  \
  -v ${HOME}/source:/repo \
  \
  --name=ldc-dev-dbashvars-0.1.0 \
ewsdocker/ldc-dev:dbashvars-0.1.0
[[ $? -eq 0 ]] ||
 {
 	echo "build container ldc-dev-dbashvars-0.1.0 failed."
 	exit 1
 }

echo "   ********************************************"
echo "   ****"
echo "   **** ldc-dev:dbashvars successfully installed."
echo "   ****"
echo "   ********************************************"
echo

exit 0

