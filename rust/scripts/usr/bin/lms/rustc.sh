#!/bin/bash
# =========================================================================
# =========================================================================
#
#	rustc.sh
#		Build the rust compiler binary and package in tarball.
#
# =========================================================================
#
# @author Jay Wheeler.
# @version 0.1.0
# @copyright © 2019-2020. EarthWalk Software.
# @license Licensed under the GNU General Public License, GPL-3.0-or-later.
# @package ewsdocker/ldc-development
# @subpackage rustc.sh
#
# =========================================================================
#
#	Copyright © 2019-2020. EarthWalk Software
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

. /usr/local/lib/lms/lmsArchiveUtilities.lib
. /usr/local/lib/lms/lmsconCli.lib
. /usr/local/lib/lms/lmsDisplay.lib
. /usr/local/lib/lms/lmsPath.lib
. /usr/local/lib/lms/lmsUtilities.lib

. /usr/local/lib/lms/rustc.dcl
. /usr/local/lib/lms/rustc.lib

# =========================================================================
# =========================================================================
#
#	rustc.lib Functions
#
#        VERB      FUNCTION
#       =======  =============
#       archive  rclib_Archive
#       build    rclib_Build
#       compile  rclib_Compile
#       error    rclib_Error
#		install  rclib_Install
#       new      rclib_New
#       path     rclib_Path
#       setup    rclib_Setup
#
# =========================================================================
# =========================================================================

# =========================================================================
# =========================================================================

# =========================================================================
#
#    rc_ErrorReset - reset error to none
#
#	Entry:
#		none
#	Exit:
#		0 = no error
#		non-zero = error code
#
# =========================================================================
function rc_ErrorReset()
{
	rclib_ErrorReset
	return $?
}

# =========================================================================
#
#    rc_New - remove currently installed rust compiler from the container
#
#	Entry:
#		none
#	Exit:
#		0 = no error
#		non-zero = error code
#
# =========================================================================
function rc_New()
{
	lmsDisplay
	lmsDisplayTs "  New System - removing current installation."
	lmsDisplay

	rclib_New
	return 0
}

# =========================================================================
#
#    rc_Show - Show selected repo folder contents
#
#	Entry:
#		title = (optional) title string, defaults to blank line
#		foot = (optional) footer string, defaults to blank line
#	Exit:
#		0 = no error
#		non-zero = error code
#
# =========================================================================
function rc_Show()
{
	lmsDisplay ${1:-""}

	ls -la /${rcRepo}/${rcPkg}*.*
	ls -la /${rcRepo}/${rcCPkg}*.*

	lmsDisplay ${2:-""}

	return 0
}

# =========================================================================
#
#    rc_Archive - create an archive of the installed rust compiler
#
#	Entry:
#		pkg = rust package name (defaults to $rcPkg)
#		src = source of the archive (folder path)
#		opts = (optional) tar options
#
#	Exit:
#		0 = no error
#		non-zero = error code
#
# =========================================================================
function rc_Archive()
{
	local l_pkg=${1:-"$rcPkg"}
	local l_src=${2:-""}
	local l_opts=${3:-""}
	
	[[ -z ${l_pkg} || -z ${l_src} ]] && return 1

	local l_tarball="${l_pkg}.tar"
	local l_tgz="${l_tarball}.gz"

	lmsDisplay
	lmsDisplayTs "  Archiving ${l_tgz}"
	lmsDisplay

	[[ -e "${l_tarball}" ]] && rm "${l_tarball}"
	[[ -e "${l_tgz}" ]] && rm "${l_tgz}"

	lmsArchive "${l_pkg}" "${l_src}" "${rcRepo}" "1" "${l_opts}"
	[[ $? -eq 0 ]] || return 1

	lmsDisplay
	rc_Show

	return 0
}

# =========================================================================
#
#    rc_ParseInput - parse the cli into the cliParam and cliKey arrays
#
#	parameters:
#		none
#
#    Result:
#        0 = no error
#        non-zero = error number
#
# =========================================================================
function rc_ParseInput()
{
	lmsCliParse
	[[ $? -eq 0 ]] || return 1

	[[ ${#cliKey[*]} -eq 0 ]] && 
	 {
 		cliKey[${#cliKey[*]}]="run"
 		cliParam["run"]=""
	 }

	 return 0
}

# =========================================================================
#
#    rc_Build - download and build (install) rust compiler
#
#	Entry:
#		rust_url = URL of the script server
#		rust_pkg = the script package to download
#
#	Exit:
#		0 = no error
#		non-zero = error code
#
# =========================================================================
function rc_Build()
{
	local lurl="${1}"
	local lpkg="${2}"

	[[ -z ${lurl} || -z ${lpkg} ]] && return 1

	rclib_Build
	[[ $? -eq 0 ]] || return $?
	
	return 0
}

# =========================================================================
#
#    rc_Compile - compile the rust program
#
#	Entry:
#		cadverb = string containing name of source to compile
#		copts = (optional) string containing compile options
#
#	Exit:
#		0 = no error
#		non-zero = error code
#
# =========================================================================
function rc_Compile()
{
	local cadverb=${1:-"$rcAdverb"}
	local copts=${2:-""}

	lmsDisplay
	lmsDisplayTs "  Compiling ${cadverb}"
	[[ -n ${copts} ]] && lmsDisplayTs "    compile options: ${copts}"
	lmsDisplay

	rclib_Compile "${cadverb}" "${copts}"
	rslt=$?

 	lmsDisplay
	lmsDisplayTs "Compile of ${cadverb} " 0 "n"
	[[ ${rslt} -eq 0 ]] && lmsDisplayTs "was successfull." || "failed, result = ${rslt}."

	return ${rslt}
}

# =========================================================================
#
#  rc_Install - install compiler
#
#	Entry:
#		none
#	Exit:
#		0 = no error
#		non-zero = error code
#
# =========================================================================
function rc_Install()
{
	lmsDisplay
	lmsDisplayTs "  Installing existing rust compiler"
	lmsDisplay

	rclib_Install
	[[ $? -eq 0 ]] || return 1
	
	lmsDisplay
	lmsDisplayTs "Existing rust compiler installed."
	lmsDisplay

	return 0
}

# =========================================================================
#
#    rc_Command - select (execute) the requested function, if valid
#
#	parameters:
#		lKey = cli array key ( points to next input item to process )
#
#    Result:
#        0 = no error
#        non-zero = error number
#
# =========================================================================
function rc_Command()
{
	local    lKey=${1:-""}

	local    lVerb=""
	local    lAdverb=""

	local    lResult=0

	[[ -z ${lKey} ]] && return 1

	while [ ${lResult} -eq 0 ]
	do
		[[ ${lKey} -lt 0 || ${lKey} -ge ${#cliParam[*]} ]] && lResult=2
		[[ ${lResult} -eq 0 ]] || break

	 	lVerb=${!cliParam[$lKey]}
		lAdverb="${cliParam[$lKey]}"

		rclib_Command ${lVerb} "${lAdverb}"
		[[ ${lResult} -eq 0 ]] || break

	 	${lVerb} "${lAdverb}"
		lResult=$?

		break
	done

	return ${lResult}
}

# =========================================================================
#
#    rc_CommandLoop - parse and execute the input instructions
#
#	parameters:
#		none
#
#    Result:
#        0 = no error
#        non-zero = error number
#
# =========================================================================
function rc_CommandLoop()
{
	local lKey
	local lResult = 0

	rc_ParseInput
	[[ $? -eq 0 ]] || 
	 {
	 	lResult=${rcError_Parse}
	 	return ${lResult}
	 }

	for lKey in "${!cliKey[@]}"
	do
		rc_Command $lKey
		[[ ${lResult} -eq 0 ]] || break
	done

	return ${lResult}
}

# =========================================================================
# =========================================================================
#
#    Program starts here
#
# =========================================================================
# =========================================================================

lmscli_optQuiet=${LMSOPT_QUIET}
lmscli_optDebug=${LMSOPT_DEBUG}
lmscli_optRemove=${LMSOPT_REMOVE}

# =========================================================================

rc_CommandLoop
rustcResult=$?

lmsDisplayTs "${rcEMsg}"

# =========================================================================

exit ${rustcResult}

