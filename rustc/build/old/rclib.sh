#!/bin/bash

# ===========================================================================
#
#    ldc-developmentelopment:drclib-0.1.0-b4
#
# ===========================================================================
cd ~/Development/ewsldc/ldc-development

echo "   ********************************************"
echo "   ****"
echo "   **** removing drclib container"
echo "   ****"
echo "   ********************************************"
echo
docker stop ldc-development-drclib-0.1.0-b4 > /dev/null 2>&1
docker rm ldc-development-drclib-0.1.0-b4 > /dev/null 2>&1

echo "   ********************************************"
echo "   ****"
echo "   **** removing drclib image"
echo "   ****"
echo "   ********************************************"
echo
docker rmi ewsdocker/ldc-development:drclib-0.1.0-b4 > /dev/null 2>&1

echo "   ***************************************************"
echo "   ****"
echo "   **** building ewsdocker/ldc-development:drclib-0.1.0-b4 image "
echo "   ****"
echo "   ***************************************************"
echo

docker build \
  --build-arg RUN_APP="rclibTests" \
  \
  --build-arg BUILD_NAME="ldc-development" \
  --build-arg BUILD_VERSION="drclib" \
  --build-arg BUILD_VERS_EXT="-0.1.0" \
  --build-arg BUILD_EXT_MOD="-b4" \
  \
  --build-arg FROM_REPO="ewsdocker" \
  --build-arg FROM_PARENT="ldc-framework" \
  --build-arg FROM_VERS="dcore" \
  --build-arg FROM_EXT="-0.1.0" \
  --build-arg FROM_EXT_MOD="-b4" \
  \
  --file Dockerfile.drclib \
  -t ewsdocker/ldc-development:drclib-0.1.0-b4  .
[[ $? -eq 0 ]] ||
 {
 	echo "build ewsdocker/ldc-development:drclib-0.1.0-b4 failed."
 	exit 1
 }

echo "   ***********************************************"
echo "   ****"
echo "   **** created ldc-development-drclib-0.1.0-b4 image"
echo "   ****"
echo "   ***********************************************"
echo

. run/drclib.sh
