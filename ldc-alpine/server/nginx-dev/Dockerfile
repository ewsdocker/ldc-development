# ========================================================================================
# ========================================================================================
#
#    Dockerfile
#      Dockerfile for alpine-nginx-dev container.
#
# ========================================================================================
#
# @author Jay Wheeler.
# @version 3.10.0
# @copyright © 2018, 2020. EarthWalk Software.
# @license Licensed under the GNU General Public License, GPL-3.0-or-later.
# @package alpine-nginx-dev
# @subpackage Dockerfile
#
# ========================================================================================
#
#	Copyright © 2018, 2020. EarthWalk Software
#	Licensed under the GNU General Public License, GPL-3.0-or-later.
#
#   This file is part of ewsdocker/alpine-nginx-dev.
#
#   ewsdocker/alpine-nginx-dev is free software: you can redistribute 
#   it and/or modify it under the terms of the GNU General Public License 
#   as published by the Free Software Foundation, either version 3 of the 
#   License, or (at your option) any later version.
#
#   ewsdocker/alpine-nginx-dev is distributed in the hope that it will 
#   be useful, but WITHOUT ANY WARRANTY; without even the implied warranty 
#   of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#   GNU General Public License for more details.
#
#   You should have received a copy of the GNU General Public License
#   along with ewsdocker/alpine-nginx-dev.  If not, see 
#   <http://www.gnu.org/licenses/>.
#
# ========================================================================================
# ========================================================================================
FROM ewsdocker/alpine-nginx:3.10.0

ENV LMS_BASE="/usr/local"

# =========================================================================

ENV LMSBUILD_VERSION="3.10.0"
ENV LMSBUILD_NAME="alpine-nginx-dev" 
ENV LMSBUILD_REPO=ewsdocker
ENV LMSBUILD_REGISTRY=""

ENV LMSBUILD_DOCKER="${LMSBUILD_REPO}/${LMSBUILD_NAME}:${LMSBUILD_VERSION}" 

ENV LMSBUILD_PACKAGE="ewsdocker/alpine-nginx:3.10.0"
ENV LMSBUILD_BASE="ewsdocker/alpine-base:3.10.0"

# =========================================================================

RUN apk update \
 && apk upgrade \
 && rm -rf /var/cache/apk/* \
 && printf "${LMSBUILD_DOCKER} (${LMSBUILD_PACKAGE}), %s @ %s\n" `date '+%Y-%m-%d'` `date '+%H:%M:%S'` >> /etc/ewsdocker-builds.txt 

# =========================================================================

COPY scripts/. /

# =========================================================================

RUN chmod -R +x /usr/local/bin

# =========================================================================

VOLUME /conf
VOLUME /usrlocal

ENV HOME /root
WORKDIR /root

# =========================================================================

CMD ["nginx", "-g", "daemon off;"]
