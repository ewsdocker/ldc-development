#!/bin/bash
# =========================================================================
# =========================================================================
#
#	rustc.dcl - global declarations for rustc.lib, 
#		a library to assist in installing and managing rustc bash scripts.
#
# =========================================================================
#
# @author Jay Wheeler.
# @version 0.1.0
# @copyright © 2019. EarthWalk Software.
# @license Licensed under the GNU General Public License, GPL-3.0-or-later.
# @package ewsdocker/ldc-dev
# @subpackage rustc.dcl
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

# =========================================================================
# =========================================================================
#
#	global declarations
#
# =========================================================================
# =========================================================================

declare    rcArchive=${LMS_BLD_PKG}
declare    rcTarball=${rustcArchive}.tar.gz

# =========================================================================

declare    rcNoCont=${RUP_CONT}	# set to zero if using in a container

declare    rcHost=${RUP_HOST}

declare    rcRepo=${RUP_REPO}
declare    rcUrl=${RUP_URL}

declare    rcPkg=${RUP_PKG}
declare    rcCPkg=${C_PKG}

# =========================================================================

declare -i rcIndex=0
declare    rcVerb="help"
declare -A rcVerbs=( [build]="rclib_Build" 
                     [command]="rclib_Command"
                     [compile]="rclib_Compile"
                     [error]="rclib_Error"
                     [help]="rclib_Help"
                     [install]="rclib_Install"
                     [new]="rclib_New"
					 [setup]="rclib_Setup"
					)

declare    rcVList="${!rcVerbs[@]}"
declare -a rcVNames=( ${rcVList} )

declare    rcAdverb=""

# =========================================================================

declare    rcLibHelp=""
declare -i rcLibInit=0

# =========================================================================

declare -A rcEMsgs=( [none]="No error."
                     [command]="Unknown command."
                     [parse]="Unable to parse input."
                     [param]="Missing parameter."
                     [key]="Parameter key is out of range."
                     [verb]="Command function returned error."
                     [unknown]="Unknown error code."
                    )

declare    rcEList="${!rcEMsgs[@]}"
declare -a rcErrors=( ${rcEList} )
declare -i rcEIndex=0

declare -i rcResult=0

declare    rcError="none"
declare    rcEMsg=${rcEMsgs["none"]}
declare    rcELoc="rustc:main:1"

# =========================================================================
# =========================================================================
