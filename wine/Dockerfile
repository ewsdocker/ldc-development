# ========================================================================================
# ========================================================================================
#
#    Dockerfile
#      Dockerfile for ldc-dev:dwine.
#
# ========================================================================================
#
# @author Jay Wheeler.
# @version 0.1.0
# @copyright © 2019. EarthWalk Software.
# @license Licensed under the GNU General Public License, GPL-3.0-or-later.
# @package ldc-dev
# @subpackage Dockerfile.dwine
#
# ========================================================================================
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
# ========================================================================================
# ========================================================================================

ARG FROM_REPO="ewsdocker" 
ARG FROM_PARENT="ldc-core" 
ARG FROM_VERS="dgui" 
ARG FROM_EXT="-0.1.0" 
ARG FROM_EXT_MOD=""

FROM ${FROM_REPO}/${FROM_PARENT}:${FROM_VERS}${FROM_EXT}${FROM_EXT_MOD}

MAINTAINER Jay Wheeler <EarthWalkSoftware@gmail.com>

ENV DEBIAN_FRONTEND noninteractive

# ========================================================================================
# ========================================================================================

ARG FROM_REPO
ARG FROM_PARENT
ARG FROM_VERS
ARG FROM_EXT
ARG FROM_EXT_MOD

# ========================================================================================

ARG RUN_APP

# ========================================================================================

ARG LIB_NAME
ARG LIB_VERSION
ARG LIB_HOST
ARG LIB_INSTALL

# ========================================================================================

ARG BUILD_REGISTRY
ARG BUILD_REPO

ARG BUILD_NAME 
ARG BUILD_VERSION
ARG BUILD_VERS_EXT
ARG BUILD_EXT_MOD

# ========================================================================================

ARG BUILD_CATEGORIES
ARG BUILD_TEMPLATE
ARG BUILD_DAEMON

# ========================================================================================

ARG OPT_DEBUG
ARG OPT_QUIET
ARG OPT_TIMEOUT

# ========================================================================================
# ========================================================================================
#
# https://github.com/ewsdocker/ldc-utilities/releases/download/ldc-utilities-0.1.5/ldc-library-0.1.5.tar.gz
#
# ========================================================================================
# ========================================================================================

ENV \
    LRUN_APP=${RUN_APP:-""} \
    \
    LMS_DAEMON=${BUILD_DAEMON:-"0"} \
    LMS_TEMPLATE=${BUILD_TEMPLATE:-"gui"} \
    \
    LMSOPT_TIMEOUT=${OPT_TIMEOUT:-"30"} \
    LMSOPT_QUIET=${OPT_QUIET:-"0"} \
    LMSOPT_DEBUG=${OPT_DEBUG:-"0"} \
    \
    LMS_BASE="/usr/local" \
    LMS_HOME= \
    LMS_CONF= \
    \
    LMS_CATEGORIES=${BUILD_CATEGORIES:-"Development"} \
    LMS_DESKTOP=${BUILD_DESKTOP:-"Wine"} \
    LMS_ICON=${BUILD_ICON:-"default.png"} \
    \
    LMS_FROM="${FROM_PARENT}:${FROM_VERS}${FROM_EXT}${FROM_EXT_MOD}" \
    LMS_PARENT="${FROM_PARENT}:${FROM_VERS}${FROM_EXT}${FROM_EXT_MOD}" \
    \
    LMS_REGISTRY=${BUILD_REGISTRY} \
    LMS_REPO=${BUILD_REPO:-"ewsdocker"} \
 	\
    LMS_NAME=${BUILD_NAME:-"ldc-dev"} \
    LMS_VERSION=${BUILD_VERSION:-"dwine"} \
    LMS_VERS_X=${BUILD_VERS_EXT:-"-0.1.0"} \
    \
    LMS_VERS_MOD=${BUILD_EXT_MOD:-""} 

ENV LMS_VERS_EXT="${LMS_VERS_X}${LMS_VERS_MOD}" \
    LMS_PACKAGE="${LMS_PARENT}, ${LMS_DESKTOP} ${EC_RELEASE}-${EC_VERS}"

ENV LMS_RUN_NAME="${LMS_NAME}-${LMS_VERSION}${LMS_VERS_EXT}" \
    LMS_DOCKER_NAME="${LMS_NAME}:${LMS_VERSION}${LMS_VERS_EXT}"

ENV LMS_DOCKER="${LMS_REPO}/${LMS_DOCKER_NAME}"

# ========================================================================================
#
# https://github.com/ewsdocker/ldc-utilities/releases/download/ldc-utilities-0.1.5/ldc-library-0.1.5.tar.gz
#
# ========================================================================================

ENV LMSLIB_INST=${LIB_INSTALL:-"0"} \
    LMSLIB_VERS=${LIB_VERSION:-"0.1.5"} 

ENV LMSLIB_HOST=${LIB_HOST:-"https://github.com/ewsdocker/ldc-utilities/releases/download/ldc-library-${LMSLIB_VERS}"} \
    LMSLIB_NAME=${LIB_NAME:-"ldc-library"}

ENV LMSLIB_PKG=${LMSLIB_NAME}-${LMSLIB_VERS}.tar.gz 

ENV LMSLIB_URL=${LMSLIB_HOST}/${LMSLIB_PKG}

# ========================================================================================

ENV PATH=$PATH:/opt/wine-stable/bin

# ========================================================================================
# ========================================================================================
#
#   install required scripts
#
# ========================================================================================
# ========================================================================================

COPY scripts/. /

# =========================================================================

RUN \
 # ========================================================================
 #
 #   set multi-architecture to support i386 architecture for Wine
 #
 # ========================================================================
   dpkg --add-architecture i386 \
 \
 && wget https://dl.winehq.org/wine-builds/winehq.key \
 && apt-key add winehq.key \
 && apt-add-repository https://dl.winehq.org/wine-builds/debian/ \
 \
 # ========================================================================
 #
 #   install wine
 #
 # ========================================================================
 \  
 && apt-get -y update \
 && apt-get -y install \
 #
		acl \
		gstreamer1.0-plugins-base \
		krb5-locales \
		libavahi-client3 \
		libavahi-common-data \
		libavahi-common3 \
		libcap2-bin \
		libcapi20-3 \
		libcdparanoia0 \
		libcups2 \
		libexif12 \
		libfile-copy-recursive-perl \
		libgd3 \
		libglu1-mesa \
		libgphoto2-6 \
		libgphoto2-l10n \
		libgphoto2-port12 \
		libgstreamer-plugins-base1.0-0 \
		libgstreamer1.0-0 \
		libieee1284-3 \
		libjbig0 \
		libjpeg62-turbo \
		liblcms2-2 \
		libmpg123-0 \
		libodbc1 \
		libopenal-data \
		libopenal1 \
		libosmesa6 \
		libpam-cap \
		libpcap0.8 \
		libsane \
		libsane-common \
		libsane-extras \
		libsane-extras-common \
		libtiff5 \
		libusb-1.0-0 \
		libv4l-0 \
		libv4lconvert0 \
		libvisual-0.4-0 \
		libvisual-0.4-plugins \
		libxslt1.1 \
		ocl-icd-libopencl1 \
		sane-utils \
		sgml-base \
		tcpd \
		udev \
		update-inetd \
		uuid-runtime \
		wine-stable \
		wine-stable-amd64 \
		winehq-stable \
		xdg-user-dirs \
		xml-core \
 #
		gcc-6-base:i386 \
		gstreamer1.0-plugins-base:i386 \
		i965-va-driver:i386 \ 
		jackd2:i386 \
		libasound2:i386 \ 
		libasound2-plugins:i386 \
		libasyncns0:i386 \ 
		libavahi-client3:i386 \ 
		libavahi-common-data:i386 \ 
		libavahi-common3:i386 \
		libavcodec57:i386 \ 
		libavresample3:i386 \ 
		libavutil55:i386 \ 
		libblkid1:i386 \
		libbsd0:i386 \ 
		libc6:i386 \ 
		libcairo2:i386 \ 
		libcap2:i386 \ 
		libcapi20-3:i386 \ 
		libcdparanoia0:i386 \ 
		libcomerr2:i386 \
		libcrystalhd3:i386 \ 
		libcups2:i386 \ 
		libdb5.3:i386 \ 
		libdbus-1-3:i386 \
		libdrm-amdgpu1:i386 \ 
		libdrm-intel1:i386 \ 
		libdrm-nouveau2:i386 \
		libdrm-radeon1:i386 \ 
		libdrm2:i386 \ 
		libedit2:i386 \ 
		libegl1-mesa:i386 \
		libelf1:i386 \ 
		libexif12:i386 \ 
		libexpat1:i386 \ 
		libffi6:i386 \
		libflac8:i386 \ 
		libfontconfig1:i386 \
		libfreetype6:i386 \ 
		libgbm1:i386 \ 
		libgcc1:i386 \ 
		libgcrypt20:i386 \ 
		libgd3:i386 \ 
		libgl1-mesa-dri:i386 \ 
		libgl1-mesa-glx:i386 \ 
		libglapi-mesa:i386 \
		libglib2.0-0:i386 \ 
		libglu1-mesa:i386 \ 
		libgmp10:i386 \
		libgnutls30:i386 \ 
		libgomp1:i386 \ 
		libgpg-error0:i386 \ 
		libgphoto2-6:i386 \ 
		libgphoto2-port12:i386 \
		libgpm2:i386 \ 
		libgsm1:i386 \ 
		libgssapi-krb5-2:i386 \
		libgstreamer-plugins-base1.0-0:i386 \
		libgstreamer1.0-0:i386 \ 
		libhogweed4:i386 \ 
		libice6:i386 \
		libicu57:i386 \ 
		libidn11:i386 \ 
		libieee1284-3:i386 \
		libjack-jackd2-0:i386 \ 
		libjbig0:i386 \ 
		libjpeg62-turbo:i386 \ 
		libk5crypto3:i386 \ 
		libkeyutils1:i386 \ 
		libkrb5-3:i386 \
		libkrb5support0:i386 \ 
		liblcms2-2:i386 \ 
		libldap-2.4-2:i386 \
		libllvm3.9:i386 \ 
		libltdl7:i386 \ 
		liblz4-1:i386 \ 
		liblzma5:i386 \ 
		libmount1:i386 \
		libmp3lame0:i386 \ 
		libmpg123-0:i386 \ 
		libncurses5:i386 \
		libnettle6:i386 \ 
		libnuma1:i386 \ 
		libodbc1:i386 \ 
		libogg0:i386 \
		libopenal1:i386 \ 
		libopenjp2-7:i386 \ 
		libopus0:i386 \
		liborc-0.4-0:i386 \ 
		libosmesa6:i386 \ 
		libp11-kit0:i386 \ 
		libpcap0.8:i386 \ 
		libpciaccess0:i386 \ 
		libpcre3:i386 \
		libpixman-1-0:i386 \ 
		libpng16-16:i386 \ 
		libpulse0:i386 \ 
		libsamplerate0:i386 \
		libsane:i386 \ 
		libsane-extras:i386 \
		libsasl2-2:i386 \ 
		libsasl2-modules:i386 \
		libsasl2-modules-db:i386 \ 
		libsdl2-2.0-0:i386 \ 
		libselinux1:i386 \
		libsensors4:i386 \ 
		libshine3:i386 \ 
		libsm6:i386 \ 
		libsnappy1v5:i386 \
		libsndfile1:i386 \ 
		libsndio6.1:i386 \ 
		libsoxr0:i386 \ 
		libspeex1:i386 \
		libspeexdsp1:i386 \ 
		libssl1.1:i386 \ 
		libstdc++6:i386 \ 
		libswresample2:i386 \
		libsystemd0:i386 \ 
		libtasn1-6:i386 \ 
		libtheora0:i386 \ 
		libtiff5:i386 \
		libtinfo5:i386 \ 
		libtwolame0:i386 \ 
		libtxc-dxtn-s2tc:i386 \ 
		libudev1:i386 \
		libusb-1.0-0:i386 \ 
		libuuid1:i386 \ 
		libv4l-0:i386 \
		libv4lconvert0:i386 \ 
		libva-drm1:i386 \ 
		libva-x11-1:i386 \
		libva1:i386 \ 
		libvdpau-va-gl1:i386 \ 
		libvdpau1:i386 \ 
		libvisual-0.4-0:i386 \ 
		libvisual-0.4-plugins:i386 \
		libvorbis0a:i386 \ 
		libvorbisenc2:i386 \ 
		libvpx4:i386 \
		libwavpack1:i386 \ 
		libwayland-client0:i386 \ 
		libwayland-cursor0:i386 \
		libwayland-egl1-mesa:i386 \ 
		libwayland-server0:i386 \ 
		libwebp6:i386 \
		libwebpmux2:i386 \ 
		libwrap0:i386 \ 
		libx11-6:i386 \ 
		libx11-xcb1:i386 \
		libx264-148:i386 \ 
		libx265-95:i386 \ 
		libxau6:i386 \ 
		libxcb-dri2-0:i386 \
		libxcb-dri3-0:i386 \ 
		libxcb-glx0:i386 \ 
		libxcb-present0:i386 \ 
		libxcb-render0:i386 \
		libxcb-shm0:i386 \ 
		libxcb-sync1:i386 \ 
		libxcb-xfixes0:i386 \ 
		libxcb1:i386 \
		libxcomposite1:i386 \ 
		libxcursor1:i386 \ 
		libxdamage1:i386 \ 
		libxdmcp6:i386 \
		libxext6:i386 \ 
		libxfixes3:i386 \ 
		libxi6:i386 \ 
		libxinerama1:i386 \
		libxkbcommon0:i386 \ 
		libxml2:i386 \ 
		libxpm4:i386 \ 
		libxrandr2:i386 \
		libxrender1:i386 \ 
		libxshmfence1:i386 \ 
		libxslt1.1:i386 \ 
		libxss1:i386 \
		libxtst6:i386 \ 
		libxvidcore4:i386 \ 
		libxxf86vm1:i386 \ 
		libzvbi0:i386 \
		mesa-va-drivers:i386 \ 
		mesa-vdpau-drivers:i386 \ 
		ocl-icd-libopencl1:i386 \ 
		va-driver-all:i386 \ 
		vdpau-driver-all:i386 \ 
		wine-stable-i386:i386 \ 
		zlib1g:i386 
 #
 RUN \
 # =========================================================================
 #
 #   download and install ldc-library
 #
 # =========================================================================
  if test "${LMSLIB_INST}" = "1"; then cd / ; wget "${LMSLIB_URL}"; tar -xvf "${LMSLIB_PKG}"; rm "${LMSLIB_PKG}"; fi \
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
 && chmod +x /usr/bin/lms/* \
 && chmod +x /etc/lms/*.sh \
 && chmod +x /my_init \
 && chmod +x /my_service \
 \
 # ========================================================================
 #
 #   register the installed software
 #
 # ========================================================================
 \
 && printf "%s (%s), %s @ %s\n" ${LMS_DOCKER} ${LMS_PARENT} `date '+%Y-%m-%d'` `date '+%H:%M:%S'` >> /etc/ewsdocker-builds.txt \
 \
 # =========================================================================
 #
 #   Cleanup APT repository
 #
 # =========================================================================
 \
 apt-get clean all \
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

ENTRYPOINT [ "/etc/lms/entrypoint.sh" ]
#CMD [ "wine" ]
