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
. /usr/local/lib/lms/lmsBashVars.lib
. /usr/local/lib/lms/lmsConIn.lib
. /usr/local/lib/lms/lmsDeclare.lib
. /usr/local/lib/lms/lmsDisplay.lib
. /usr/local/lib/lms/lmsDmpVar.lib
. /usr/local/lib/lms/lmsPath.lib
. /usr/local/lib/lms/lmsStr.lib
. /usr/local/lib/lms/lmsUtilities.lib

. /usr/local/lib/lms/rustc.dcl
. /usr/local/lib/lms/rustc.hlp
. /usr/local/lib/lms/rustc.lib

# =========================================================================
# =========================================================================
#
#	rustc.lib Functions
#
#        VERB      FUNCTION
#       =======  =============
#       archive  rustclib_Archive
#       build    rustclib_Build
#       compile  rustclib_Compile
#       error    rustclib_Error
#       new      rustclib_New
#       path     rustclib_Path
#		reset    rustclib_ErrorReset
#       setup    rustclib_Setup
#
# =========================================================================
# =========================================================================

# =========================================================================
# =========================================================================

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
	
	while (true)
	do
		[[ -z ${l_pkg} || -z ${l_src} ]] && 
		 {
			rustclib_Error "parse"
			rcResult=1
			break
		 }

		local l_tarball="${l_pkg}.tar"
		local l_tgz="${l_tarball}.gz"

		lmsDisplay
		lmsDisplayTs "  Archiving ${l_tgz}.gz"
		lmsDisplay

		rustclib_Archive "${l_pkg}" "${l_src}" "${l_opts}"
		[[ $rcResult -eq 0 ]] || break

		lmsDisplay
		rc_Show

		break
	done

	return $rcResult
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
	local rc_lurl="${1:-$rcHost}"
	local rc_lpkg="${2:-$rcPkg}"

	while (true)
	do
	    [[ -z "${rc_lurl}" ]] &&
	     {
		    rustclib_Error "param"
			rcResult=1
		    break
	     }

	    rustclib_Build "${rc_lurl}" "${rc_lpkg}"
	
	    break

	done
	
	return $rcResult
}

# =========================================================================
#
#    rc_Command - select (execute) the requested function, if valid
#
#	parameters:
#		lName = cli array key ( points to next input item to process )
#		lValue = value of name
#
#    Result:
#        0 = no error
#        non-zero = error number
#
# =========================================================================
function rc_Command()
{
	local    lName=${1:-"unknown"}
	local    lValue=${2:-""}

	while (true)
	do
		[[ -z "${lName}" ]] &&
	     {
		    rustclib_Error "param"
			rcResult=1
		    break
	     }


		rustclib_Command ${lName} "${lValue}"

		break

	done

	return ${rcResult}
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
	local lKey=""

	rcResult=0

	while [ $rcResult -eq 0 ]
	do
		rustclib_ParseInput
		[[ $rcResult -eq 0 ]] || break

	    for lKey in "${cliKey[@]}"
	    do
		    rc_Command "${lKey}" "${cliParam[$lKey]}"
	        [[ $rcResult -eq 0 ]] || break
	    done

	    break
	done

	return ${rcResult}
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

	rustclib_Compile "${cadverb}" "${copts}"

	[[ $rcResult -eq 0 ]] &&
	 {
	 	lmsDisplay
		lmsDisplayTs "Compile of ${cadverb} " 0 "n"
		[[ ${rcResult} -eq 0 ]] && lmsDisplayTs "was successfull." || "failed, result = ${rslt}."
	 }

	return ${rcResult}
}

# =========================================================================
#
#    rc_Error
#
#      Entry:
#              lError = (optional) error name
#      Exit:
#              0 = no error
#              non-zero = error code
#
# =========================================================================
function rc_Error()
{
    local lError=${1:-"unknown"}

	rustclib_Error "${1}"
	rcResult=1
	
	return $rcResult
}

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
	rustclib_ErrorReset
	rcResult=0

	return $rcResult
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

	rustclib_Install
	[[ $rcResult -eq 0 ]] &&
	 {
		lmsDisplay
		lmsDisplayTs "Existing rust compiler installed."
		lmsDisplay
	 }

	return $rcResult
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

	rustclib_New
	return $rcResult
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
#        1 = no input
#        2 = no keys detected (bad format?)
#
#	Note:
#		lmsConInParse places the name value in the next cliKey array element,
#		  then places the value in the cliParam at the name array element
#
#		For an expression such as
#          run=myprog.sh
#
#		   cliKey[0] = run
#          cliParam[run] = myprog.sh
#
# =========================================================================
function rc_ParseInput()
{
	rustclib_ParseInput
    return $rcResult
}

# =========================================================================
#
#    rc_Path - add an element in $PATH
#
#	Entry:
#		rPath = path entry to add
#
#	Exit:
#		0 = requested path (rPath) was added
#		non-zero = requested path (rPath) was not found
#
# =========================================================================
function rc_Path()
{
	local    rPath=${1:-""}

	while (true)
	do
		[[ -z ${rPath} ]] && 
		 {
			rustclib_Error "param"
			rcResult=1
			break
		 }

		rustclib_Path "${rPath}"

		break
	done

	return $rcResult
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
	rcResult=0

	while (true)
	do
		lmsDisplay ${1:-""}

		rustclib_Show
		[[ $rcResult -eq 0 ]] || break

		lmsDisplay ${2:-""}
		
		break
	done

	return $rcResult
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

[[ "$rcError" == "none" ]] || lmsDisplayTs "${rcEMsg} (${rcELoc}) ($rcResult)"

# =========================================================================

exit ${rcResult}

