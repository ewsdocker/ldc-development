#!/bin/bash

cd ~/Development/ewsldc/ldc-development

echo "   ********************************************"
echo "   ****"
echo "   **** stopping dbrave container"
echo "   ****"
echo "   ********************************************"
echo
docker stop ldc-development-dbrave-0.1.0-b4
docker rm ldc-development-dbrave-0.1.0-b4

echo "   ********************************************"
echo "   ****"
echo "   **** removing dbrave image"
echo "   ****"
echo "   ********************************************"
echo
docker rmi ewsdocker/ldc-development:dbrave-0.1.0-b4

# ===========================================================================
#
#    ldc-development:dbrave-0.1.0-b4
#
# ===========================================================================

echo "   ***************************************************"
echo "   ****"
echo "   **** building ewsdocker/ldc-development:dbrave-0.1.0-b4 image "
echo "   ****"
echo "   ***************************************************"
echo
docker build \
  --build-arg RUN_APP="/bin/bash" \
  \
  --build-arg LIB_HOST=http://alpine-nginx-pkgcache \
  --network=pkgnet \
  \
  --file Dockerfile \
  -t ewsdocker/ldc-development:dbrave-0.1.0-b4  .
[[ $? -eq 0 ]] ||
 {
 	echo "build ewsdocker/ldc-development:dbrave-0.1.0-b4 failed."
 	exit 1
 }

. run/dbrave.sh
