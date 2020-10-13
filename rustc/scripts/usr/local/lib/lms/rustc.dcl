#!/bin/bash
# =========================================================================
# =========================================================================
#
#	rustc.dcl - global declarations for rustc.lib, 
#		a library to assist in installing and managing rustc bash scripts.
#
# =========================================================================
#
#	NOTE - this module must load after rustc.lib
#
#	Load Sequence
#		rustc.dcl
#		rustc.lib
#       rustc.hlp
#		
# =========================================================================
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

declare    rcRecurse=0

# =========================================================================

declare    rcArchive=${LMS_BLD_PKG}
declare    rcTarball=${rcArchive}.tar.gz

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
declare -A rcVerbs=( [build]="rustclib_Build" 
                     [command]="rustclib_Command"
                     [compile]="rustclib_Compile"
                     [error]="rustclib_Error"
                     [help]="rustclib_Help"
                     [install]="rustclib_Install"
                     [new]="rustclib_New"
                     [path]="rustclib_Path"
                     [show]="rustclib_Show"
					 [setup]="rustclib_Setup"
					)

declare    rcVList="${!rcVerbs[@]}"
declare -a rcVNames=( ${rcVList} )

declare    rcAdverb=""

# =========================================================================

declare -A rustVerbs=( [build]="rc_Build" 
                       [command]="rc_Command"
                       [compile]="rc_Compile"
                       [error]="rc_Error"
                       [help]="rustclib_Help"
                       [install]="rc_Install"
                       [new]="rc_New"
                       [path]="rc_Path"
                       [show]="rc_Show"
					   [setup]="rc_Setup"
					  )

declare    rustVList="${!rustVerbs[@]}"
declare -a rustVNames=( ${rustVList} )

declare    rustAdverb=""

# =========================================================================

declare    rcLibHelp=""
declare -i rcLibInit=0

# =========================================================================

declare -A rcEMsgs=( [none]="No error."
                     [archive]="Archived file is invalid."
                     [build]="Build error."
                     [cargo]="Missing Cargo archive."
                     [cargop]="Cargo file processing error."
                     [command]="Unknown command."
                     [exec]="Execution returned negative result."
                     [file]="Directory/File missing."
                     [key]="Parameter key is out of range."
                     [host]="Host not found."
                     [new]="New request failed."
                     [package]="Package error."
                     [param]="Missing parameter."
                     [parse]="Unable to parse input."
                     [path]="Unable to update PATH variable."
                     [verb]="Command function returned error."
                     [error]="Error code caused an error."
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
