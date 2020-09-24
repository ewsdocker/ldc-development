#!/bin/bash

# ===========================================================================
#
#    ldc-development:dwine-0.1.0-b4
#
# ===========================================================================
cd ~/Development/ewsldc/ldc-development

echo "   ********************************************"
echo "   ****"
echo "   **** removing dwine container"
echo "   ****"
echo "   ********************************************"
echo
docker stop ldc-development-dwine-0.1.0-b4 > /dev/null 2>&1
docker rm ldc-development-dwine-0.1.0-b4 > /dev/null 2>&1

echo "   ********************************************"
echo "   ****"
echo "   **** removing dwine image"
echo "   ****"
echo "   ********************************************"
echo
docker rmi ewsdocker/ldc-development:dwine-0.1.0-b4 > /dev/null 2>&1

# ===========================================================================
#
#    ldc-development:dwine-0.1.0-b4
#
# ===========================================================================

echo "   ***************************************************"
echo "   ****"
echo "   **** building ewsdocker/ldc-development:dwine-0.1.0-b4 image "
echo "   ****"
echo "   ***************************************************"
echo

docker build \
  --build-arg RUN_APP="" \
  \
  --build-arg BUILD_NAME="ldc-development" \
  --build-arg BUILD_VERSION="dwine" \
  --build-arg BUILD_VERS_EXT="-0.1.0" \
  --build-arg BUILD_EXT_MOD="-b4" \
  \
  --build-arg FROM_REPO="ewsdocker" \
  --build-arg FROM_PARENT="ldc-core" \
  --build-arg FROM_VERS="dgui" \
  --build-arg FROM_EXT="-0.1.0" \
  --build-arg FROM_EXT_MOD="-b4" \
  \
  --file Dockerfile.dwine \
  -t ewsdocker/ldc-development:dwine-0.1.0-b4  .
[[ $? -eq 0 ]] ||
 {
 	echo "build ewsdocker/ldc-development:dwine-0.1.0-b4 failed."
 	exit 1
 }

echo "   ***********************************************"
echo "   ****"
echo "   **** installing ldc-development-dwine-0.1.0-b4 container"
echo "   ****"
echo "   ***********************************************"
echo

. run/dwine.sh

