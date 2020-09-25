#!/bin/bash
# ===========================================================================
#
#    ldc-development:dbashvars-0.1.0
#
# ===========================================================================

echo "   ********************************************"
echo "   ****"
echo "   **** removing dbashvars container"
echo "   ****"
echo "   ********************************************"
echo
docker stop ldc-development-dbashvars-0.1.0-b4 > /dev/null 2>&1
docker rm ldc-development-dbashvars-0.1.0-b4 > /dev/null 2>&1

echo "   ***********************************************"
echo "   ****"
echo "   **** installing ldc-development-dbashvars-0.1.0-b4# container"
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
  -v ${HOME}/.config/docker/ldc-development-dbashvars-0.1.0-b4:/root \
  -v ${HOME}/.config/docker/ldc-development-dbashvars-0.1.0-b4/workspace:/workspace \
  \
  -v ${HOME}/source:/repo \
  \
  --name=ldc-development-dbashvars-0.1.0-b4 \
ewsdocker/ldc-development:dbashvars-0.1.0-b4
[[ $? -eq 0 ]] ||
 {
 	echo "build container ldc-development-dbashvars-0.1.0-b4 failed."
 	exit 1
 }

echo "   ********************************************"
echo "   ****"
echo "   **** ldc-development:dbashvars successfully installed."
echo "   ****"
echo "   ********************************************"
echo

exit 0

