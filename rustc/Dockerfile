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
ARG FROM_PARENT="ldc-stack"
ARG FROM_VERS="dcc-x11"
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

#ARG RHOST
#ARG RNAME
#ARG RVERSION
#ARG RVERS_EXT
#ARG RPLATFORM

# =========================================================================

ARG RUST_REPO
ARG RUST_VERS
ARG RUST_HOST
ARG RUST_NAME 
ARG RUST_PKG

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
#
#	Plugin arguments
#
# =========================================================================
# =========================================================================

ARG PLUGINS
ARG PLUGINS_ONLY

# ========================================================================================

ARG CC_VER
ARG CC_TYPE

# ========================================================================================

ARG FORTRAN_VER

# =========================================================================

ARG GTK_VER
ARG GTK_COMMON

# =========================================================================

ARG JDK_RELEASE 
ARG JDK_VERS 
ARG JDK_HOST
ARG JDK_TYPE

ARG JDK_BUILD

# =========================================================================

ARG NODEJS_BASH
ARG NODEJS_HOST
ARG NODEJS_VER

# =========================================================================

ARG NPM_INSTALL

# =========================================================================

ARG PHP_PLUGIN
ARG PHP_PLUGIN_COMP

# =========================================================================
# =========================================================================
#
#	Plugin Environment declarations
#
# =========================================================================
# =========================================================================

ENV PLUGIN_LIST=${PLUGINS:-""} \
    PLUGIN_ONLY=${PLUGINS_ONLY:-"0"}

# =========================================================================
#
# https://sh.rustup.rs/rustup-init.sh
#
# =========================================================================

ENV RUP_REPO=${RUST_REPO:-"/repo"} \
    RUP_VERS=${RUST_VERS:-"0.1.0"} \
    RUP_HOST=${RUST_HOST:-"https://sh.rustup.rs"} \
    RUP_NAME=${RUST_NAME:-"rustup"} 


    # =====================================================================
    #
    # https://sh.rustup.rs/rustup-init.rs
    #
    # =====================================================================

ENV RUP_PKG="${RUP_NAME}-init.sh"
ENV RUP_URL="${RUP_HOST}/${RUP_PKG}"

# =========================================================================
# =========================================================================
#
#  RUST Downloads:
#
#    https://static.rust-lang.org/dist/rust-1.46.0-x86_64-unknown-linux-gnu.tar.gz
#
# =========================================================================
# =========================================================================

#ENV RUSTC_HOST=${RHOST:-"https://static.rust-lang.org/dist"} \
#    RUSTC_NAME=${RNAME:-"rust"} \
#    RUSTC_VERSION=${RVERSION:-"1.46"} \
#    RUSTC_VERS_EXT=${RVERS_EXT:-"0"} \
#    RUSTC_PLATFORM=${RPLATFORM:-"x86_64-unknown-linux-gnu.tar.gz"}

#ENV RUSTC_PACKAGE="${RUSTC_NAME}-${RUSTC_VERSION}.${RUSTC_VERS_EXT}-${RUSTC_PLATFORM}"

#ENV RUSTC_URL="${RUSTC_HOST}/${RUSTC_PACKAGE}"
#ENV RUSTC_KEY_URL="${RUSTC_URL}.asc"

# =========================================================================

ENV OJDK_RELEASE=${JDK_RELEASE:-"jdk11"} \
    OJDK_VERS=${JDK_VERS:-"13.0.1"} \
    OJDK_TYPE=${JDK_TYPE:-""}

ENV OJDK_PKG="openjdk-${OJDK_VERS}_linux-x64_bin.tar.gz" 

ENV OJDK_HOST=${JDK_HOST:-"https://download.java.net/java/GA/jdk11/9/GPL/"}
ENV OJDK_URL="${OJDK_HOST}/${OJDK_PKG}" \
    \
    LMS_JDK=${JDK_BUILD:-"jdk11"} 
 
# =========================================================================

ENV FOR_VER=${FORTRAN_VER:-"FORTRAN8"} 

# ========================================================================================

ENV GTKVER=${GTK_VER:-"GTK3"}

# =========================================================================

ENV CCVER=${CC_VER:-"8"} \ 
    CCTYPE=${CC_TYPE:-"CC"}

# =========================================================================

ENV NJS_BASH=${NODEJS_BASH:-""}

ENV NJS_VER=${NODEJS_VER:-"14"} \
    NJS_HOST=${NODEJS_HOST:-"https://deb.nodesource.com"} \
    NJS_DIR="NodeJS" 

ENV NJS_NAME="setup_${NJS_VER}.x" 
ENV NJS_URL=${NJS_HOST}/${NJS_NAME}  

# =========================================================================

ENV NPM_LIST=${NPM_INSTALL:-""}

# =========================================================================
# =========================================================================
#
#	To add ShellWax after install bash-lanauage-server,
#		- start eclipse
#		- select Help/Install New Software from menu,
# 		- select Add button and fill in the form:
#			Name:     ShellWax
#           Location: https://download.eclipse.org/shellwax/snapshots/
#		- pull-down the Uncatagorized selection and enable ShellWax
#		- Follow install instructions.
#
# =========================================================================
# =========================================================================

ENV PHP_VER=${PHP_PLUGIN:-""}
ENV PHP_COMPOSER=${PHP_PLUGIN_COMP:-""}

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
COPY dockerSetup/. /dockerSetup/

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
