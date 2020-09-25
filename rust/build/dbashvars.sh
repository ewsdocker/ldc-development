#!/bin/bash

# ===========================================================================
#
#    ldc-development:dbashvars-0.1.0
#
# ===========================================================================
cd ~/Development/ewsldc/ldc-development

echo "   ********************************************"
echo "   ****"
echo "   **** removing dbashvars container"
echo "   ****"
echo "   ********************************************"
echo
docker stop ldc-development-dbashvars-0.1.0-b4 > /dev/null 2>&1
docker rm ldc-development-dbashvars-0.1.0-b4 > /dev/null 2>&1

echo "   ********************************************"
echo "   ****"
echo "   **** removing dbashvars image"
echo "   ****"
echo "   ********************************************"
echo
docker rmi ewsdocker/ldc-development:dbashvars-0.1.0-b4 > /dev/null 2>&1

echo "   ***************************************************"
echo "   ****"
echo "   **** building ewsdocker/ldc-development:dbashvars-0.1.0-b4 image "
echo "   ****"
echo "   ***************************************************"
echo

docker build \
  --build-arg RUN_APP="bashVarsTests" \
  \
  --build-arg DNAME="" \
  \
  --build-arg BUILD_DAEMON="1" \
  --build-arg BUILD_TEMPLATE="run" \
  \
  --build-arg BUILD_NAME="ldc-development" \
  --build-arg BUILD_VERSION="dbashvars" \
  --build-arg BUILD_VERS_EXT="-0.1.0" \
  --build-arg BUILD_EXT_MOD="-b4" \
  \
  --build-arg FROM_REPO="ewsdocker" \
  --build-arg FROM_PARENT="ldc-development" \
  --build-arg FROM_VERS="drustc" \
  --build-arg FROM_EXT="-0.1.0" \
  --build-arg FROM_EXT_MOD="-b4" \
  \
  --network=pkgnet \
  \
  --file Dockerfile \
-t ewsdocker/ldc-development:dbashvars-0.1.0-b4 .
[[ $? -eq 0 ]] ||
 {
 	echo "build ewsdocker/ldc-development:dbashvars-0.1.0-b4 failed."
 	exit 1
 }

echo "   ***********************************************"
echo "   ****"
echo "   **** installing ldc-development-dbashvars-0.1.0-b4 container"
echo "   ****"
echo "   ***********************************************"
echo

. run/dbashvars.sh
