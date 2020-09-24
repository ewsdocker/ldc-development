#!/bin/bash

# ===========================================================================
#
#    ldc-development:dwine-0.1.0-b4
#
# ===========================================================================

echo "   ********************************************"
echo "   ****"
echo "   **** removing dwine container"
echo "   ****"
echo "   ********************************************"
echo
docker stop ldc-development-dwine-0.1.0-b4 > /dev/null 2>&1
docker rm ldc-development-dwine-0.1.0-b4 > /dev/null 2>&1

echo "   ***********************************************"
echo "   ****"
echo "   **** installing ldc-development-dwine-0.1.0-b4 container"
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
  -v ${HOME}/.config/docker/ldc-development-dwine-0.1.0:/root \
  -v ${HOME}/.config/docker/ldc-development-dwine-0.1.0/workspace:/workspace \
  \
  -v ${HOME}/source:/repo \
  -v ${HOME}/Downloads:/Downloads \
  \
  -e DISPLAY=unix${DISPLAY} \
  -v ${HOME}/.Xauthority:/root/.Xauthority \
  -v /tmp/.X11-unix:/tmp/.X11-unix \
  -v /dev/shm:/dev/shm \
  --device /dev/snd \
  \
  -it \
  --name=ldc-development-dwine-0.1.0-b4 \
ewsdocker/ldc-development:dwine-0.1.0-b4
[[ $? -eq 0 ]] ||
 {
 	echo "build container ldc-development-dwine-0.1.0-b4 failed."
 	exit 1
 }

echo "   ********************************************"
echo "   ****"
echo "   **** ldc-development:dwine successfully installed."
echo "   ****"
echo "   ********************************************"
echo

exit 0

