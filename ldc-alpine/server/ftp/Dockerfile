# ========================================================================================
# ========================================================================================
#
#    Dockerfile
#      Dockerfile for alpine-ftp-server container.
#
# ========================================================================================
#
# @author Jay Wheeler.
# @version 3.10.0
# @copyright © 2020. EarthWalk Software.
# @license Licensed under the GNU General Public License, GPL-3.0-or-later.
# @package alpine-ftp-server
# @subpackage Dockerfile
#
# ========================================================================================
#
#	Copyright © 2020. EarthWalk Software
#	Licensed under the GNU General Public License, GPL-3.0-or-later.
#
#   This file is part of ewsdocker/alpine-ftp-server.
#
#   ewsdocker/alpine-ftp-server is free software: you can redistribute 
#   it and/or modify it under the terms of the GNU General Public License 
#   as published by the Free Software Foundation, either version 3 of the 
#   License, or (at your option) any later version.
#
#   ewsdocker/alpine-ftp-server is distributed in the hope that it will 
#   be useful, but WITHOUT ANY WARRANTY; without even the implied warranty 
#   of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#   GNU General Public License for more details.
#
#   You should have received a copy of the GNU General Public License
#   along with ewsdocker/alpine-ftp-server.  If not, see 
#   <http://www.gnu.org/licenses/>.
#
# ========================================================================================
#	
# cloned from https://github.com/delfer/docker-alpine-ftp-server.git
#
# ========================================================================================
# ========================================================================================

ARG FROM_REPO="ewsdocker"
ARG FROM_NAME="alpine-base"
ARG FROM_VERSION="3.10.0"

FROM "${FROM_REPO}/${FROM_NAME}:${FROM_VERSION}"

ARG FROM_VERSION
ARG FROM_NAME 
ARG FROM_REPO
ARG FROM_REGISTRY

ARG BUILD_VERSION
ARG BUILD_NAME 
ARG BUILD_REPO
ARG BUILD_REGISTRY

# =========================================================================
# =========================================================================

ENV LMSBUILD_VERSION=${BUILD_VERSION:-"3.10.0"} \
    LMSBUILD_NAME=${BUILD_NAME:-"alpine-ftp-server"} \ 
    LMSBUILD_REPO=${BUILD_REPO:-"ewsdocker"} \
    LMSBUILD_REGISTRY=${BUILD_REGISTRY:-""}

ENV LMSBUILD_DOCKER="${LMSBUILD_REPO}/${LMSBUILD_NAME}:${LMSBUILD_VERSION}" \
    LMSBUILD_PACKAGE="${FROM_REPO}/${FROM_NAME}:${FROM_VERSION}" 

# =========================================================================

COPY scripts/. /

# =========================================================================

RUN apk update \
 && apk upgrade \
 && apk add vsftpd \
 && rm -rf /var/cache/apk/* \
 && chmod -R 775 /bin \
 && printf "${LMSBUILD_DOCKER} (${LMSBUILD_PACKAGE}), %s @ %s\n" `date '+%Y-%m-%d'` `date '+%H:%M:%S'` >> /etc/ewsdocker-builds.txt

# =========================================================================

EXPOSE 21 21000-21010
VOLUME /ftp/ftp

# =========================================================================

ENTRYPOINT ["/usr/bin/start_vsftpd.sh"]
