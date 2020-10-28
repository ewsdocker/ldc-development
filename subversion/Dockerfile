# ========================================================================================
# ========================================================================================
#
#    Dockerfile
#      Dockerfile for alpine-subversion container.
#
# ========================================================================================
#
# @author Jay Wheeler.
# @version 3.8.1
# @copyright © 2018. EarthWalk Software.
# @license Licensed under the GNU General Public License, GPL-3.0-or-later.
# @package alpine-subversion
# @subpackage Dockerfile
#
# ========================================================================================
#
#	Copyright © 2018. EarthWalk Software
#	Licensed under the GNU General Public License, GPL-3.0-or-later.
#
#   This file is part of ewsdocker/alpine-subversion.
#
#   ewsdocker/alpine-subversion is free software: you can redistribute 
#   it and/or modify it under the terms of the GNU General Public License 
#   as published by the Free Software Foundation, either version 3 of the 
#   License, or (at your option) any later version.
#
#   ewsdocker/alpine-subversion is distributed in the hope that it will 
#   be useful, but WITHOUT ANY WARRANTY; without even the implied warranty 
#   of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#   GNU General Public License for more details.
#
#   You should have received a copy of the GNU General Public License
#   along with ewsdocker/alpine-subversion.  If not, see 
#   <http://www.gnu.org/licenses/>.
#
# ========================================================================================
# ========================================================================================
#
# ========================================================================================
FROM ewsdocker/alpine-base:3.8.1

# =========================================================================

ENV LMS_BASE="/usr/local"

# =========================================================================

ENV LMSBUILD_VERSION="3.8.1"
ENV LMSBUILD_NAME="alpine-subversion" 
ENV LMSBUILD_REPO=ewsdocker
ENV LMSBUILD_REGISTRY=""

ENV LMSBUILD_DOCKER="${LMSBUILD_REPO}/${LMSBUILD_NAME}:${LMSBUILD_VERSION}" 
ENV LMSBUILD_PACKAGE="ewsdocker/alpine-base:3.8.1 (AlpineLinux + Subversion + Apache 2 + WebDav)"

# =========================================================================

ENV SVN_REPO=
ENV SVN_NAME=
ENV SVN_PASS=
ENV SVN_HTML=

# =========================================================================

RUN apk update \
 && apk upgrade \
 && apk add apache2 \
            apache2-utils \
            apache2-webdav \
            mod_dav_svn \
            subversion \
 && mkdir -p /run/apache2 \
 && rm -rf /var/cache/apk/* \
 && printf "${LMSBUILD_DOCKER} (${LMSBUILD_PACKAGE}), %s @ %s\n" `date '+%Y-%m-%d'` `date '+%H:%M:%S'` >> /etc/ewsdocker-builds.txt 

# =========================================================================

COPY scripts/. /

# =========================================================================

RUN chmod -R 775 /usr/local/bin \
 && chmod +x /usr/bin/lms/start-subversion.sh \
 && ln -s /usr/bin/lms/start-subversion.sh /usr/bin/runsvn 

# =========================================================================

EXPOSE 80

VOLUME /svn
ENV SVN_ROOT=/svn

ENV HOME /root
WORKDIR /root

# =========================================================================

CMD ["runsvn"]
