#!/bin/bash

cd ~/Development/ewslms/ldc-dev

echo "   ********************************************"
echo "   ****"
echo "   **** removing dsccache container"
echo "   ****"
echo "   ********************************************"
echo
docker stop ldc-dev-dsccache-0.1.0 > /dev/null 2>&1
docker rm ldc-dev-dsccache-0.1.0 > /dev/null 2>&1

echo "   ********************************************"
echo "   ****"
echo "   **** removing dsccache image"
echo "   ****"
echo "   ********************************************"
echo
docker rmi ewsdocker/ldc-dev:dsccache-0.1.0 > /dev/null 2>&1

# ===========================================================================
#
#    ldc-dev:dsccache-0.1.0
#
# ===========================================================================

echo "   ***************************************************"
echo "   ****"
echo "   **** building ewsdocker/ldc-dev:dsccache-0.1.0 image "
echo "   ****"
echo "   ***************************************************"
echo

docker build \
  --build-arg RUN_APP="lmsadmin-sc" \
  --build-arg APT="0" \
  \
  --build-arg SCCACHE_REPO="/repo" \
  --build-arg SCCACHE_NAME="sccache" \
  \
  --build-arg RUST_HOST=http://alpine-nginx-pkgcache \
  \
  --build-arg BUILD_NAME="ldc-dev" \
  --build-arg BUILD_VERSION="dsccache" \
  --build-arg BUILD_VERS_EXT="-0.1.0" \
  --build-arg BUILD_EXT_MOD="" \
  \
  --build-arg FROM_REPO="ewsdocker" \
  --build-arg FROM_PARENT="ldc-lang" \
  --build-arg FROM_VERS="djs" \
  --build-arg FROM_EXT="-0.1.0" \
  --build-arg FROM_EXT_MOD="-njs11" \
  \
  --build-arg LIB_HOST=http://alpine-nginx-pkgcache \
  --network=pkgnet \
  \
  --file Dockerfile.dsccache \
  -t ewsdocker/ldc-dev:dsccache-0.1.0  .
[[ $? -eq 0 ]] ||
 {
 	echo "build ewsdocker/ldc-dev:dsccache-0.1.0 failed."
 	exit 1
 }

echo "   ***********************************************"
echo "   ****"
echo "   **** installing ldc-dev-dsccache-0.1.0 container"
echo "   ****"
echo "   ***********************************************"
echo

docker run \
  -it \
  -e LRUN_APP="/bin/bash" \
  \
  --network=pkgnet \
  \
  -e LMS_BASE="${HOME}/.local" \
  -e LMS_HOME="${HOME}" \
  -e LMS_CONF="${HOME}/.config" \
  \
  -v ${HOME}/bin:/userbin \
  -v ${HOME}/.local:/usrlocal \
  -v ${HOME}/.config/docker:/conf \
  -v ${HOME}/.config/docker/ldc-dev-dsccache-0.1.0:/root \
  -v ${HOME}/.config/docker/ldc-dev-dsccache-0.1.0/workspace:/workspace \
  \
  -v ${HOME}/source:/repo \
  \
  --name=ldc-dev-dsccache-0.1.0 \
ewsdocker/ldc-dev:dsccache-0.1.0
[[ $? -eq 0 ]] ||
 {
 	echo "build container ldc-dev-dsccache-0.1.0 failed."
 	exit 1
 }

echo "   ********************************************"
echo "   ****"
echo "   **** ldc-dev:dsccache successfully installed."
echo "   ****"
echo "   ********************************************"
echo

exit 0

