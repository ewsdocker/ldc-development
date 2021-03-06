# =========================================================================
# =========================================================================
#
#	Dockerfile.dsccache
#	  Dockerfile for ldc-dev:dsccache.
#
# =========================================================================
#
# @author Jay Wheeler.
# @version 0.1.0
# @copyright © 2019. EarthWalk Software.
# @license Licensed under the GNU General Public License, GPL-3.0-or-later.
# @package ewsdocker/ldc-dev
# @subpackage Dockerfile.dsccache
#
# =========================================================================
#
#	Copyright © 2019. EarthWalk Software
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
ARG FROM_PARENT="ldc-core"
ARG FROM_VERS="dcore"
ARG FROM_EXT="-0.1.0"
ARG FROM_EXT_MOD=""

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

ARG SCCACHE_HOST

ARG SCCACHE_REPO
ARG SCCACHE_VERS
ARG SCCACHE_NAME 

# =========================================================================

ARG RUST_RELEASE
ARG RUST_VERS
ARG RUST_HOST
ARG RUST_NAME 

# =========================================================================

ARG APT
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
# =========================================================================

ENV SC_REPO=${SCCACHE_REPO:-"/repo"} \
    SC_VERS=${SCCACHE_VERS:-"0.2.8"} \
    SC_NAME=${SCCACHE_NAME:-"sccache"} 

ENV SC_PKG=${SC_NAME}_v${SC_VERS}

ENV SC_ARCHIVE=${SC_REPO}/${SC_PKG}
ENV SC_TARBALL=${SC_ARCHIVE}.tar

# =========================================================================

ENV \
    LRUN_APP=${RUN_APP:-"installSccache"} \
    LMSAPT_INST=${APT:-"0"} \
    \
    LMS_DAEMON=${BUILD_DAEMON:-"0"} \
    LMS_TEMPLATE=${BUILD_TEMPLATE:-"run"} \
    \
    LMSOPT_TIMEOUT=${OPT_TIMEOUT:-"30"} \
    LMSOPT_QUIET=${OPT_QUIET:-"0"} \
    LMSOPT_DEBUG=${OPT_DEBUG:-"0"} \
    \
    LMS_BASE=${BUILD_BASE:-"/usr/local"} \
    \
    LMS_HOME= \
    LMS_CONF= \
    \
    LMS_CATEGORIES=${BUILD_CATEGORIES:-"Development"} \
    LMS_DESKTOP=${BUILD_DESKTOP:-"sccache_v0.2.8"} \
    LMS_ICON=${BUILD_ICON:-"default.png"} \
    \
    LMS_FROM="${FROM_PARENT}:${FROM_VERS}${FROM_EXT}${FROM_EXT_MOD}" \
    LMS_PARENT="${FROM_PARENT}:${FROM_VERS}${FROM_EXT}${FROM_EXT_MOD}" \
    \
    LMS_REGISTRY=${BUILD_REGISTRY} \
    LMS_REPO=${BUILD_REPO:-"ewsdocker"} \
    \
    LMS_NAME=${BUILD_NAME:-"ldc-dev"} \
    LMS_VERSION=${BUILD_VERSION:-"dsccache"} \
    LMS_VERS_X=${BUILD_VERS_EXT:-"-0.1.0"} \
    LMS_VERS_MOD=${BUILD_EXT_MOD} \
    \
    LMS_BLD_PKG=${BUILD_PKG:-"${SC_PKG}"} 

ENV LMS_VERS_EXT="${LMS_VERS_X}${LMS_VERS_MOD}" \
    LMS_PACKAGE="${LMS_PARENT}, ${LMS_BLD_PKG}" 

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
#
# https://github.com/ewsdocker/ldc-dev/releases/download/0.1.0/rustc_v.1.35.0.tar.gz
#
# =========================================================================

ENV RUSTC_RELEASE=${RUST_RELEASE:-"0.1.0"} \
    RUSTC_VERS=${RUST_VERS:-"1.35.0"} \
    RUSTC_HOST=${RUST_HOST:-"https://github.com/ewsdocker/ldc-dev/releases/download/${RUSTC_RELEASE}"} \
    RUSTC_NAME=${RUST_NAME:-"rustc"} 

ENV RUSTC_PKG="${RUSTC_NAME}_v.${RUSTC_VERS}.tar.gz"

ENV RUSTC_URL="${RUSTC_HOST}/${RUSTC_PKG}"

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
 && if test "${LMSLIB_INST}" = "1"; then echo ""; echo "   **** Installing ${LMSLIB_PKG} ****"; echo ""; fi \
 && if test "${LMSLIB_INST}" = "1"; then cd / ; wget "${LMSLIB_URL}"; tar -xvf "${LMSLIB_PKG}"; rm "${LMSLIB_PKG}"; cd /root; fi \
 \
 # =========================================================================
 #
 #    Update/Upgrade
 #
 # =========================================================================
 \
 && echo ""; echo "   **** Setting up APT system ****"; echo "" \
 && apt-get -y update \
 && apt-get -y upgrade \
 \
 # =========================================================================
 #
 #    Install APT dependencies
 #
 # =========================================================================
 \
 && echo ""; echo "   **** Installing Dependencies ****"; echo "" \
 && apt-get -y install \
            libssl-dev \
            man  \
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
 && chmod +x /usr/bin/lms/*.sh \
 && ln -s /usr/bin/lms/sccache.sh /usr/bin/lmsadmin-sc \
 \
 # =========================================================================
 #
 #   clean-up apt
 #
 # =========================================================================
 \
 && if test "${LMSAPT_INST}" = "1"; then apt-get clean all; fi \
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
