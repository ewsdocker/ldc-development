# =========================================================================
# =========================================================================
#
#	Dockerfile.dbrave
#	  Dockerfile for ldc-dev:dbrave.
#
# =========================================================================
#
# @author Jay Wheeler.
# @version 0.1.0
# @copyright © 2018, 2019. EarthWalk Software.
# @license Licensed under the GNU General Public License, GPL-3.0-or-later.
# @package ewsdocker/ldc-dev
# @subpackage Dockerfile.dbrave
#
# =========================================================================
#
#	Copyright © 2018, 2019. EarthWalk Software
#	Licensed under the GNU General Public License, GPL-3.0-or-later.
#
#   This file is part of ewsdocker/ldc-dev.
#
#   ewsdocker/ldc-dev is free software: you can redistribute 
#   it and/or modify it under the terms of the GNU General Public License 
#   as published by the Free Software Foundation, either version 3 of the 
#   License, or (at your option) any later version.
#
#   ewsdocker/ldc-dev is distributed in the hope that it will 
#   be useful, but WITHOUT ANY WARRANTY; without even the implied warranty 
#   of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#   GNU General Public License for more details.
#
#   You should have received a copy of the GNU General Public License
#   along with ewsdocker/ldc-dev.  If not, see 
#   <http://www.gnu.org/licenses/>.
#
# =========================================================================
# =========================================================================

ARG FROM_REPO="ewsdocker"
ARG FROM_PARENT="ldc-lang"
ARG FROM_VERS="djs"
ARG FROM_EXT="-0.1.0"
ARG FROM_EXT_MOD="-njs11"

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

ARG RUN_APP

# =========================================================================

ARG LIB_NAME
ARG LIB_LIBRARY
ARG LIB_HOST
ARG LIB_INSTALL

# =========================================================================

ARG BUILD_REGISTRY
ARG BUILD_REPO

ARG BUILD_NAME 
ARG BUILD_VERSION
ARG BUILD_VERS_EXT
ARG BUILD_EXT_MOD

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
# =========================================================================

ENV \
    LRUN_APP=${RUN_APP:-"npm start Release"} \
    \
    LMS_DAEMON=${BUILD_DAEMON:-"0"} \
    LMS_TEMPLATE=${BUILD_TEMPLATE:-"gui"} \
    \
    LMSOPT_TIMEOUT=${OPT_TIMEOUT:-"30"} \
    LMSOPT_QUIET=${OPT_QUIET:-"0"} \
    \
    LMS_BASE="/usr/local" \
    LMS_HOME= \
    LMS_CONF= \
    \
    LMS_CATEGORIES=${BUILD_CATEGORIES:-"Network"} \
    LMS_DESKTOP=${BUILD_DESKTOP:-"Brave-dev"} \
    LMS_ICON=${BUILD_ICON:-"default.png"} \
    \
    LMS_FROM="${FROM_PARENT}:${FROM_VERS}${FROM_EXT}${FROM_EXT_MOD}" \
    LMS_PARENT="${FROM_PARENT}:${FROM_VERS}${FROM_EXT}${FROM_EXT_MOD}" \
    \
    LMS_REGISTRY=${BUILD_REGISTRY} \
    LMS_REPO=${BUILD_REPO:-"ewsdocker"} \
    \
    LMS_NAME=${BUILD_NAME:-"ldc-dev"} \
    LMS_VERSION=${BUILD_VERSION:-"dbrave"} \
    LMS_VERS_X=${BUILD_VERS_EXT:-"-0.1.0"} \
    LMS_VERS_MOD=${BUILD_EXT_MOD} 

ENV LMS_VERS_EXT="${LMS_VERS_X}${LMS_VERS_MOD}" \
    LMS_PACKAGE="${LMS_PARENT}" 

ENV LMS_RUN_NAME="${LMS_NAME}-${LMS_VERSION}${LMS_VERS_EXT}" \
    LMS_DOCKER_NAME="${LMS_NAME}:${LMS_VERSION}${LMS_VERS_EXT}"

ENV LMS_DOCKER="${LMS_REPO}/${LMS_DOCKER_NAME}"

# =========================================================================

ENV LMSLIB_INST=${LIB_INSTALL:-"0"} \
    LMSLIB_VERS=${LIB_VERSION:-"0.1.4"} 

ENV LMSLIB_HOST=${LIB_HOST:-"https://github.com/ewsdocker/ldc-utilities/releases/download/ldc-library-${LMSLIB_VERS}"} \
    LMSLIB_NAME=${LIB_NAME:-"ldc-library"}

ENV LMSLIB_PKG=${LMSLIB_NAME}-${LMSLIB_VERS}.tar.gz 

ENV LMSLIB_URL=${LMSLIB_HOST}/${LMSLIB_PKG}

# =========================================================================
# =========================================================================

COPY scripts/. /

# =========================================================================
# =========================================================================

RUN echo "" \
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
 # ========================================================================
 #
 #   download and install ldc-library, if required
 #
 # ========================================================================
 \
 && if test "${LMSLIB_INST}" = "1"; then cd / ; wget "${LMSLIB_URL}"; tar -xvf "${LMSLIB_PKG}"; rm "${LMSLIB_PKG}"; fi \
 \
 # =========================================================================
 #
 #    Update/Upgrade
 #
 # =========================================================================
 && apt-get -y update \ 
 && apt-get -y upgrade \
 \
 && apt-get -y install \
        libgnome-keyring-dev \
        libssl-dev \
        npm \
        pkg-config \
        python-setuptools \
 \
 && wget https://sh.rustup.rs/rustup-init.sh \
 && chmod +x ./rustup-init.sh \
 && ./rustup-init.sh -y \
 && . $HOME/.cargo/env \
 \
 && env | sort \
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
 && chmod +x /usr/bin/lms/*.* \
 && chmod +x /etc/lms/*.sh \
 && chmod +x /my_init \
 && chmod +x /my_service \
 \
 && apt-get clean all \
 \
 # =========================================================================
 #
 #   register software 
 #
 # =========================================================================
 \
 && printf "${LMS_DOCKER} (${LMS_PACKAGE}), %s @ %s\n" `date '+%Y-%m-%d'` `date '+%H:%M:%S'` >> /etc/ewsdocker-builds.txt 

# =========================================================================
# =========================================================================

ENTRYPOINT [ "/etc/lms/entrypoint.sh" ]
