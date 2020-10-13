#!/bin/bash

# ===========================================================================
#
#    ldc-development:rustc-0.1.0
#
# ===========================================================================
cd ~/Development/ewsldc/ldc-development/rustc

echo "   ********************************************"
echo "   ****"
echo "   **** removing rustc container"
echo "   ****"
echo "   ********************************************"
echo
docker stop ldc-development-rustc-0.1.0-b4 > /dev/null 2>&1
docker rm ldc-development-rustc-0.1.0-b4 > /dev/null 2>&1

echo "   ********************************************"
echo "   ****"
echo "   **** removing rustc image"
echo "   ****"
echo "   ********************************************"
echo
docker rmi ewsdocker/ldc-development:rustc-0.1.0-b4 > /dev/null 2>&1

echo "   ***************************************************"
echo "   ****"
echo "   **** building ewsdocker/ldc-development:rustc-0.1.0-b4 image "
echo "   ****"
echo "   ***************************************************"
echo

docker build \
  --build-arg RUN_APP="bash" \
  \
  --build-arg DNAME="RUST" \
  \
  --build-arg PLUGINS="" \
  --build-arg PLUGINS_ONLY="0"\
  \
  --build-arg CC_VER="8" \
  --build-arg CC_TYPE="WAYLAND" \
  \
  --build-arg FORTRAN_VER="FORTRAN8" \
  \
  --build-arg GTK_VER="GTK3" \
  \
  --build-arg JDK_TYPE="jdk13" \
  --build-arg JDK_VERS="13.0.1" \
  --build-arg JDK_RELEASE="jdk13" \
  --build-arg JDK_HOST="http://alpine-nginx-pkgcache" \
  \
  --build-arg PHP_PLUGIN="5.6" \
  --build-arg PHP_PLUGIN_COMP="1" \
  \
  --build-arg NODEJS_HOST="http://alpine-nginx-pkgcache" \
  --build-arg NODEJS_VER="14" \
  \
  --build-arg NPM_INSTALL="bash-language-server" \
  \
  --build-arg BUILD_DAEMON="0" \
  --build-arg BUILD_TEMPLATE="run" \
  \
  --build-arg BUILD_NAME="ldc-development" \
  --build-arg BUILD_VERSION="rustc" \
  --build-arg BUILD_VERS_EXT="-0.1.0" \
  --build-arg BUILD_EXT_MOD="-b4" \
  \
  --build-arg FROM_REPO="ewsdocker" \
  --build-arg FROM_PARENT="ldc-stack" \
  --build-arg FROM_VERS="dgtk3" \
  --build-arg FROM_EXT="-0.1.0" \
  --build-arg FROM_EXT_MOD="-b4" \
  \
  --network=pkgnet \
  \
  --file Dockerfile \
-t ewsdocker/ldc-development:rustc-0.1.0-b4 .
[[ $? -eq 0 ]] ||
 {
 	echo "build ewsdocker/ldc-development:rustc-0.1.0-b4 failed."
 	exit 1
 }

echo "   ***********************************************"
echo "   ****"
echo "   **** installing ldc-development-rustc-0.1.0-b4 container"
echo "   ****"
echo "   ***********************************************"
echo

. run/rustc.sh
