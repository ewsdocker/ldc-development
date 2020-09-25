# =========================================================================
# =========================================================================
#
#	Dockerfile
#	  Dockerfile for ldc-development.
#
# =========================================================================
#
# @author Jay Wheeler.
# @version 0.1.0
# @copyright © 2020. EarthWalk Software.
# @license Licensed under the GNU General Public License, GPL-3.0-or-later.
# @package ewsdocker/ldc-development
# @subpackage Dockerfile
#
# =========================================================================
#
#	Copyright © 2020. EarthWalk Software
#	Licensed under the GNU General Public License, GPL-3.0-or-later.
#
#   This file is part of ewsdocker/ldc-development.
#
#   ewsdocker/ldc-development is free software: you can redistribute 
#   it and/or modify it under the terms of the GNU General Public License 
#   as published by the Free Software Foundation, either version 3 of the 
#   License, or (at your option) any later version.
#
#   ewsdocker/ldc-development is distributed in the hope that it will 
#   be useful, but WITHOUT ANY WARRANTY; without even the implied warranty 
#   of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#   GNU General Public License for more details.
#
#   You should have received a copy of the GNU General Public License
#   along with ewsdocker/ldc-development.  If not, see 
#   <http://www.gnu.org/licenses/>.
#
# =========================================================================
# =========================================================================

ARG FROM_REPO="ewsdocker"
ARG FROM_PARENT="ldc-development"
ARG FROM_VERS="drustc"
ARG FROM_EXT="-0.1.0"
ARG FROM_EXT_MOD="-d4"

FROM ${FROM_REPO}/${FROM_PARENT}:${FROM_VERS}${FROM_EXT}${FROM_EXT_MOD}

# =========================================================================

MAINTAINER Jay Wheeler <EarthWalkSoftware@gmail.com>
ENV DEBIAN_FRONTEND=noninteractive

# =========================================================================
# =========================================================================

ARG FROM_PARENT
ARG FROM_REPO
ARG FROM_VERS
ARG FROM_EXT
ARG FROM_EXT_MOD

# =========================================================================

ARG DNAME

# =========================================================================

ARG RUN_APP

# =========================================================================
#
#  RUST
#
# =========================================================================

ARG RHOST
ARG RNAME
ARG RVERSION
ARG RVERS_EXT
ARG RPLATFORM

# =========================================================================

ARG BUILD_REGISTRY
ARG BUILD_REPO

ARG BUILD_NAME 
ARG BUILD_VERSION
ARG BUILD_VERS_EXT
ARG BUILD_EXT_MOD

ARG BUILD_PKG
ARG BUILD_BASE

# =========================================================================

ARG BUILD_TEMPLATE
ARG BUILD_DAEMON

# =========================================================================

ARG BUILD_CATEGORIES
ARG BUILD_DESKTOP
ARG BUILD_ICON

# =========================================================================

ARG OPT_TIMEOUT
ARG OPT_QUIET
ARG OPT_DEBUG

# =========================================================================
#
#	Plugin arguments
#
# =========================================================================

ARG PLUGINS
ARG PLUGINS_ONLY

# =========================================================================
#
#	Plugin Environment declarations
#
# =========================================================================

ENV PLUGIN_LIST=${PLUGINS:-""} \
    PLUGIN_ONLY=${PLUGINS_ONLY:-"0"}

# =========================================================================
#
#  RUST Downloads:
#
#    https://static.rust-lang.org/dist/rust-1.46.0-x86_64-unknown-linux-gnu.tar.gz
#
# =========================================================================

ENV RUST_HOST=${RHOST:-"https://static.rust-lang.org/dist"} \
    RUST_NAME=${RNAME:-"rust"} \
    RUST_VERSION=${RVERSION:-"1.46"} \
    RUST_VERS_EXT=${RVERS_EXT:-"0"} \
    RUST_PLATFORM=${RPLATFORM:-"x86_64-unknown-linux-gnu.tar.gz"}

ENV RUST_URL=${RUST_HOST}/${RUST_NAME}-${RUST_VERSION}.${RUST_VERS_EXT}-${RUST_PLATFORM}"
ENV RUST_KEY_URL="${RUST_URL}.asc"

# =========================================================================
# =========================================================================

ENV DSTACK=${DNAME:-""}

# =========================================================================

ENV \
    LMS_DAEMON=${BUILD_DAEMON:-"0"} \
    LMS_TEMPLATE=${BUILD_TEMPLATE:-"run"} \
    LRUN_APP=${RUN_APP:-"bash"} \
    \
    LMSOPT_TIMEOUT=${OPT_TIMEOUT:-"30"} \
    LMSOPT_QUIET=${OPT_QUIET:-"0"} \
    LMSOPT_DEBUG=${OPT_DEBUG:-"0"} \
    \
    LMS_BASE=${BUILD_BASE:-"/usr/local"} \
    LMS_HOME= \
    LMS_CONF= \
    \
    LMS_CATEGORIES=${BUILD_CATEGORIES:-"Development"} \
    LMS_DESKTOP=${BUILD_DESKTOP:-"bash"} \
    LMS_ICON=${BUILD_ICON:-"default.png"} \
    \
    LMS_FROM="${FROM_REPO}/${FROM_PARENT}:${FROM_VERS}${FROM_EXT}${FROM_EXT_MOD}" \
    LMS_PARENT="${FROM_REPO}/${FROM_PARENT}:${FROM_VERS}${FROM_EXT}${FROM_EXT_MOD}" \
    \
    LMS_REGISTRY=${BUILD_REGISTRY:-""} \
    LMS_REPO=${BUILD_REPO:-"ewsdocker"} \
    \
    LMS_NAME=${BUILD_NAME:-"ldc-development"} \
    LMS_VERSION=${BUILD_VERSION:-"rust"} \
    LMS_VERS_X=${BUILD_VERS_EXT:-"-0.1.0"} \
    LMS_VERS_MOD=${BUILD_EXT_MOD:-"-b4"} \
    \
    LMS_BLD_PKG=${BUILD_PKG:-"bash"} 

ENV LMS_VERS_EXT="${LMS_VERS_X}${LMS_VERS_MOD}" \
    LMS_PACKAGE="${LMS_PARENT}, ${LMS_BLD_PKG}" 

ENV LMS_RUN_NAME="${LMS_NAME}-${LMS_VERSION}${LMS_VERS_EXT}" \
    LMS_DOCKER_NAME="${LMS_NAME}:${LMS_VERSION}${LMS_VERS_EXT}"

ENV LMS_DOCKER="${LMS_REPO}/${LMS_DOCKER_NAME}"

# =========================================================================
# =========================================================================

VOLUME /library
VOLUME /source
VOLUME /userbin
VOLUME /workspace

# =========================================================================

COPY scripts/. /
COPY setup/. /dockerSetup/

# =========================================================================

RUN chmod +x /dockerSetup/*.sh \
 \
 && echo "**************************************************" \
 && echo "**************************************************" \
 && echo "" \
 && echo "Building: ${LMS_DESKTOP} - ${LMS_DOCKER}" \
 && echo "From:     ${LMS_PACKAGE}" \
 && echo "" \
 && echo "**************************************************" \
 && echo "**************************************************" \
 && echo "" \
 \
 # =========================================================================
 #
 #    Pre-installing plugins to satisfy dependencies
 #
 # =========================================================================
 \
 && if test "${PLUGIN_LIST}" != ""; then /dockerSetup/plugins.sh; fi \
 \
 # =========================================================================
 #
 #    RUST
 #
 # =========================================================================
 \
 && if test "${PLUGIN_ONLY}" = "0"; then /dockerSetup/rust.sh; fi \
 && rm -Rf /dockerSetup \
 \
 # ========================================================================
 #
 #   setup libraries and applications to run
 #
 # ========================================================================
 \
 && mkdir -p /usr/local/bin \
 && mkdir -p /usr/bin/lms \
 \
 && chmod +x /usr/local/bin/*.* \
 && chmod +x /usr/local/bin/* \
 && chmod +x /usr/local/lib/lms/tests/*.sh \
 && chmod +x /usr/bin/lms/*.sh \
 \
 && chmod +x /etc/lms/*.sh \
 \
 && chmod +x /my_init \
 && chmod +x /my_service \
 \
 && ln -s /usr/local/lib/lms/tests/rcLibTests.sh  /usr/bin/rcLibTests \
 && ln -s /usr/local/lib/lms/tests/bashVarsTests.sh /usr/bin/bashVarsTests \
 && ln -s /usr/local/lib/lms/tests/lmspathTests.sh /usr/bin/lmspathTests \
 \
 # =========================================================================
 #
 #   register software 
 #
 # =========================================================================
 \
 && printf "${LMS_DOCKER} (${LMS_PACKAGE}), %s @ %s\n" `date '+%Y-%m-%d'` `date '+%H:%M:%S'` >> /etc/ewsdocker-builds.txt  \
 \
 # =========================================================================
 #
 #   Exit message on the display
 #
 # =========================================================================
 && echo "" \
 && echo "**************************************************" \
 && echo "**************************************************" \
 && echo "" \
 && echo "Exiting: ${LMS_DESKTOP} - ${LMS_DOCKER}" \
 && echo "From:     ${LMS_PACKAGE}" \
 && echo "" \
 && echo "**************************************************" \
 && echo "**************************************************" \
 && echo "" 
 
# =========================================================================
# =========================================================================

ENTRYPOINT [ "/etc/lms/entrypoint.sh" ]
