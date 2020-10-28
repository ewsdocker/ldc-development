# =========================================================================
# =========================================================================
#
#	Dockerfile
#	  Dockerfile for alpine-pull-gallery in an Alpine Linux container.
#
# =========================================================================
#
# @author Jay Wheeler.
# @version 3.8.0
# @copyright © 2018. EarthWalk Software.
# @license Licensed under the GNU General Public License, GPL-3.0-or-later.
# @package ewsdocker/alpine-pull-gallery
# @subpackage Dockerfile
#
# =========================================================================
#
#	Copyright © 2017, 2018. EarthWalk Software
#	Licensed under the GNU General Public License, GPL-3.0-or-later.
#
#   This file is part of ewsdocker/alpine-pull-gallery.
#
#   ewsdocker/alpine-pull-gallery is free software: you can redistribute 
#   it and/or modify it under the terms of the GNU General Public License 
#   as published by the Free Software Foundation, either version 3 of the 
#   License, or (at your option) any later version.
#
#   ewsdocker/alpine-pull-gallery is distributed in the hope that it will 
#   be useful, but WITHOUT ANY WARRANTY; without even the implied warranty 
#   of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#   GNU General Public License for more details.
#
#   You should have received a copy of the GNU General Public License
#   along with ewsdocker/alpine-pull-gallery.  If not, see 
#   <http://www.gnu.org/licenses/>.
#
# =========================================================================
# =========================================================================

FROM ewsdocker/alpine-base:3.8.1

MAINTAINER Jay Wheeler

# =========================================================================

ENV LMS_BASE="/usr/local"

# =========================================================================

ENV RIPME_VER 1.7.72

ENV LMSBUILD_VERSION="3.8.0"
ENV LMSBUILD_NAME="alpine-pull-gallery" 
ENV LMSBUILD_REPO=ewsdocker
ENV LMSBUILD_REGISTRY=""

ENV LMSBUILD_DOCKER="${LMSBUILD_REPO}/${LMSBUILD_NAME}:${LMSBUILD_VERSION}" 
ENV LMSBUILD_PACKAGE="alpine-base:3.8.1"

# =========================================================================

RUN set -xe \
 && apk apk update \
 && apk upgrade \
 && apk add ca-certificates \
            openjdk8-jre \
            wget \
 && mkdir /app \
 && wget "https://github.com/RipMeApp/ripme/releases/download/$RIPME_VER/ripme.jar" -P /app \
 && printf "${LMSBUILD_DOCKER} (${LMSBUILD_PACKAGE}), %s @ %s\n" `date '+%Y-%m-%d'` `date '+%H:%M:%S'` >> /etc/ewsdocker-builds.txt 

# =========================================================================

COPY scripts/. /

# =========================================================================

RUN chmod -R +x /usr/local/bin

# =========================================================================

VOLUME /data
WORKDIR /data

# =========================================================================

ENTRYPOINT ["java", "-jar", "/app/ripme.jar"]
