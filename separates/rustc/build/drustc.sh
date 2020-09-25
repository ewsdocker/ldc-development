#!/bin/bash

cd ~/Development/ewsldc/ldc-development

echo "   ********************************************"
echo "   ****"
echo "   **** removing drustc container"
echo "   ****"
echo "   ********************************************"
echo
docker stop ldc-development-drustc-0.1.0-b4 > /dev/null 2>&1
docker rm ldc-development-drustc-0.1.0-b4 > /dev/null 2>&1

echo "   ********************************************"
echo "   ****"
echo "   **** removing drustc image"
echo "   ****"
echo "   ********************************************"
echo
docker rmi ewsdocker/ldc-development:drustc-0.1.0-b4 > /dev/null 2>&1

# ===========================================================================
#
#    ldc-development:drustc-0.1.0-b4
#
# ===========================================================================

echo "   ***************************************************"
echo "   ****"
echo "   **** building ewsdocker/ldc-development:drustc-0.1.0-b4 image "
echo "   ****"
echo "   ***************************************************"
echo

docker build \
  --build-arg RUN_APP="lmsadmin-ru" \
  --build-arg APT="0" \
  \
  --build-arg SCCACHE_REPO="/repo" \
  --build-arg SCCACHE_NAME="rustc" \
  \
  --build-arg RUST_HOST=http://alpine-nginx-pkgcache \
  \
  --build-arg BUILD_NAME="ldc-development" \
  --build-arg BUILD_VERSION="drustc" \
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
  --file Dockerfile.drustc \
  -t ewsdocker/ldc-development:drustc-0.1.0-b4  .
[[ $? -eq 0 ]] ||
 {
 	echo "build ewsdocker/ldc-development:drustc-0.1.0-b4 failed."
 	exit 1
 }

echo "   ***********************************************"
echo "   ****"
echo "   **** created ldc-development-drustc-0.1.0-b4"
echo "   ****"
echo "   ***********************************************"
echo

. run/drustc.sh
