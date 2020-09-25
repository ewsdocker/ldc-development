#!/bin/bash

# ===========================================================================
#
#    ldc-development:dsccache-0.1.0-b4
#
# ===========================================================================
cd ~/Development/ewsldc
echo "   **** removing dsccache container"
echo "   ****"
echo "   ********************************************"
echo
docker stop ldc-development-dsccache-0.1.0-b4 > /dev/null 2>&1
docker rm ldc-development-dsccache-0.1.0-b4 > /dev/null 2>&1

echo "   ********************************************"
echo "   ****"
echo "   **** removing dsccache image"
echo "   ****"
echo "   ********************************************"
echo
docker rmi ewsdocker/ldc-development:dsccache-0.1.0-b4 > /dev/null 2>&1

echo "   ***************************************************"
echo "   ****"
echo "   **** building ewsdocker/ldc-development:dsccache-0.1.0-b4 image "
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
  --build-arg BUILD_NAME="ldc-development" \
  --build-arg BUILD_VERSION="dsccache" \
  --build-arg BUILD_VERS_EXT="-0.1.0" \
  --build-arg BUILD_EXT_MOD="-b4" \
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
  -t ewsdocker/ldc-development:dsccache-0.1.0-b4  .
[[ $? -eq 0 ]] ||
 {
 	echo "build ewsdocker/ldc-development:dsccache-0.1.0-b4 failed."
 	exit 1
 }

echo "   ***********************************************"
echo "   ****"
echo "   **** installing ldc-development-dsccache-0.1.0-b4 container"
echo "   ****"
echo "   ***********************************************"
echo

. run/dsccache.sh
