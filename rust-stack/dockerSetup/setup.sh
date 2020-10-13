# =========================================================================
# =========================================================================
#
#	Dockerfile
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

# =========================================================================

apt-get -y update
apt-get -y upgrade

apt-get -y install
    libgnome-keyring-dev
    libssl-dev
    npm
    pkg-config
    python-setuptools


[[ "${DSTACK}" == "RUSTC" ]] && ln -s /usr/bin/lms/rustc.sh /usr/bin/rustc

[[ ${DSTACK} == "RCLIB" ]] &&
 {
    ln -s /usr/local/lib/lms/tests/rcLibTests.sh  /usr/bin/rcLibTests
    ln -s /usr/local/lib/lms/tests/bashVarsTests.sh /usr/bin/bashVarsTests
    ln -s /usr/local/lib/lms/tests/lmspathTests.sh  /usr/bin/lmspathTests
 }

[[ "${DSTACK}" == "BASHVARS" ]] &&
 {
	ln -s /usr/local/lib/lms/tests/rcLibTests.sh  /usr/bin/rcLibTests
	ln -s /usr/local/lib/lms/tests/bashVarsTests.sh /usr/bin/bashVarsTests
	ln -s /usr/local/lib/lms/tests/lmspathTests.sh /usr/bin/lmspathTests
 }

[[ ${DSTACK} == "SCCACHE" ]] &&
 {
    ln -s /usr/bin/lms/sccache.sh /usr/bin/lmsadmin-sc
 }

rustup
======

ARG FROM_REPO="ewsdocker"
ARG FROM_PARENT="ldc-lang"
ARG FROM_VERS="djs"
ARG FROM_EXT="-0.1.0"
ARG FROM_EXT_MOD="-njs11"

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

# =========================================================================

rclib
=====

  --build-arg FROM_REPO="ewsdocker" \
  --build-arg FROM_PARENT="ldc-framework" \
  --build-arg FROM_VERS="dcore" \
  --build-arg FROM_EXT="-0.1.0" \
  --build-arg FROM_EXT_MOD="-b4" \

ARG FROM_REPO="ewsdocker"
ARG FROM_PARENT="ldc-core"
ARG FROM_VERS="dcore"
ARG FROM_EXT="-0.1.0"
ARG FROM_EXT_MOD=""

 # =========================================================================
 #
 #    Install APT dependencies
 #
 # =========================================================================

 \
 && if test "${DSTACK}" = "rclib"; then ln -s /usr/local/lib/lms/tests/rcLibTests.sh  /usr/bin/rcLibTests; fi \
 && if test "${DSTACK}" = "rclib"; then ln -s /usr/local/lib/lms/tests/bashVarsTests.sh /usr/bin/bashVarsTests; fi \
 && if test "${DSTACK}" = "rclib"; then ln -s /usr/local/lib/lms/tests/lmspathTests.sh  /usr/bin/lmspathTests; fi \
 \

# =========================================================================

rustc
=====

  --build-arg FROM_REPO="ewsdocker" \
  --build-arg FROM_PARENT="ldc-lang" \
  --build-arg FROM_VERS="djs" \
  --build-arg FROM_EXT="-0.1.0" \
  --build-arg FROM_EXT_MOD="-njs11" \
  
ARG FROM_REPO="ewsdocker"
ARG FROM_PARENT="ldc-core"
ARG FROM_VERS="dcore"
ARG FROM_EXT="-0.1.0"
ARG FROM_EXT_MOD=""

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

 && if test "${DSTACK}" = "rustc"; then ln -s /usr/bin/lms/rustc.sh /usr/bin/rustc; fi \


sccache
=======

  --build-arg FROM_REPO="ewsdocker" \
  --build-arg FROM_PARENT="ldc-lang" \
  --build-arg FROM_VERS="djs" \
  --build-arg FROM_EXT="-0.1.0" \
  --build-arg FROM_EXT_MOD="-njs11" \

ARG FROM_REPO="ewsdocker"
ARG FROM_PARENT="ldc-core"
ARG FROM_VERS="dcore"
ARG FROM_EXT="-0.1.0"
ARG FROM_EXT_MOD=""



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

&& if test "${DSTACK}" = "sccache"; then ln -s /usr/bin/lms/sccache.sh /usr/bin/lmsadmin-sc; fi \
 




 