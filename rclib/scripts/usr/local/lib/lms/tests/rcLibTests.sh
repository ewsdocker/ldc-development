#!/bin/bash

declare    rustcLibTests_Version="0.1.0"
declare    rustcLibTests_Name="rcLibTests.sh"

# =========================================================================
# =========================================================================
#
#	rcLibTests.sh
#		Run tests to qualify rustc.lib functions.
#
# =========================================================================
#
# @author Jay Wheeler.
# @version 0.1.0
# @copyright © 2019. EarthWalk Software.
# @license Licensed under the GNU General Public License, GPL-3.0-or-later.
# @package ewsdocker/ldc-dev
# @subpackage rcLibTests
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

. /usr/local/lib/lms/expectedResults.lib
. /usr/local/lib/lms/lmsArchiveUtilities.lib
. /usr/local/lib/lms/lmsBashVars.lib
. /usr/local/lib/lms/lmsconCli.lib
. /usr/local/lib/lms/lmsDisplay.lib
. /usr/local/lib/lms/lmsPath.lib
. /usr/local/lib/lms/lmsUtilities.lib

. /usr/local/lib/lms/rustc.dcl
. /usr/local/lib/lms/rustc.lib
. /usr/local/lib/lms/rustc.hlp

# =========================================================================

declare rcTests=0
declare rcResult=0

# =========================================================================
# =========================================================================
#
#	Test structures
#
# =========================================================================
# =========================================================================

# =========================================================================
#
#	test_st_Verbs
#
#		Testing structure: rcVerbs
#
#		Error codes: 	 0 = no errors
#						 non-zero = error code
#
# =========================================================================
function test_st_Verbs()
{
	lmsDisplayTs "*********************************"
	lmsDisplayTs "START test_st_Verbs"
	lmsDisplayTs "*********************************"

	local    lVerb=""
	local    lVerbList=${rcVNames[@]}
	local -a lVerbs=( ${lVerbList} )

	lmsDisplayTs "rcVerbs list: ${rcVList}"

	rcResult=0

	expectedResults "${rcVList}" "${lVerbList}" "0"
	rcResult=$?

 	expectedResults ${#rcVNames[*]} ${#lVerbs[*]} "0"
	rcResult=$?

	for lVerb in ${rcVList}
	do
		svKeyV=${lVerbs[$svKey]}
		expectedResults "${lVerb}" "${svKeyV}" "0"
		rcResult=$?

		[[ ${rcResult} -eq 0 ]] && lmsDisplayTs "  ${svKeyV} = \"${lVerb}\"" || break
		
		lmsDisplayTs "  *******************************"
		lmsDisplayTs

		let svKey=${svKey}+1
	done

	[[ ${rcResult} -eq 0 ]] || rcResult+=24

	lmsDisplayTs "*********************************"
	lmsDisplayTs "END test_st_Verbs"
	lmsDisplayTs "*********************************"

	lmsDisplay
	lmsDisplay "**************************************************"
	lmsDisplay

	return ${rcResult}
}

# =========================================================================
#
#	test_st_ErrorMsg
#
#		Testing structure: rcEMsg
#
#		Error codes: 	 20 = expectedResult failed
#						 21 = rcErrors has no matching rcEMsg key
#
# =========================================================================
function test_st_ErrorMsgs()
{
	lmsDisplayTs "*********************************"
	lmsDisplayTs "START test_st_ErrorMsgs"
	lmsDisplayTs "*********************************"

	local lError=""
	local lErrorList="${rcErrors[@]}"
	local lErrorMsgs="${!rcEMsgs[@]}"

	lmsDisplayTs "rcErrors list: \"${lErrorList}\""
	lmsDisplayTs "rcEMsgs key list: \"${lErrorMsgs}\""

	expectedResults "${lErrorMsgs}" "${lErrorList}" "0"
	rcResult=$?
	
	[[ ${rustcResult} -eq 0 ]] &&
	 {
		for lError in ${lErrorList}
		do
			[[ "${!rcEMsgs[@]}" =~ "${lError}" ]] || 
			 {
		 		lmsDisplayTs "Could not find \"${lError}\" in the rcEMsgs key list."
		 		[[ -z ${rcEMsgs[$lError]} ]] && lmsDisplayTs "\"${lError}\" not found as a key in rcEMsgs."
				rcResult=2
			 }

			[[ ${rcResult} -eq 0 ]] || break
			lmsDisplayTs "${lError} = \"${rcEMsgs[$lError]}\""
		done
	 }

	[[ ${rcResult} -eq 0 ]] || rcResult+=19

	lmsDisplayTs "*********************************"
	lmsDisplayTs "END test_st_ErrorMsgs"
	lmsDisplayTs "*********************************"

	lmsDisplay
	lmsDisplay "**************************************************"
	lmsDisplay

	return ${rcResult}
}

# =========================================================================
#
#	test_st_Error
#
#		Testing structure: rcError
#
#		Error codes: 	 10 = expectedResult failed
#						 11 = rcErrors has no matching rcEMsg key
#
# =========================================================================
function test_st_Error()
{
	lmsDisplayTs "*********************************"
	lmsDisplayTs "START test_st_Error"
	lmsDisplayTs "*********************************"

	local eList="${rcErrors[@]}"
	local lError=""

	lmsDisplayTs "rcErrors list: \"${eList}\""

	rcResult=0
	expectedResults ${#rcEMsgs[*]} ${#rcErrors[*]} "0"
	rcResult=$?
	
	[[ ${rcResult} -eq 0 ]] &&
	 {
		for lError in ${eList}
		do
			rcResult=0
			[[ " ${!rcEMsgs[@]} " =~ "${lError}" ]] || 
			 {
		 		lmsDisplayTs "Could not find \"${lError}\" in the rcEMsgs key list."
		 		[[ -z ${rcEMsgs[$lError]} ]] && lmsDisplayTs "\"${lError}\" not found as a key in rcEMsgs."
				rcResult=2
			 }

			[[ ${rcResult} -eq 0 ]] && lmsDisplayTs "   ${lError}"
			[[ ${rcResult} -eq 0 ]] || break
		done
	 }

	[[ ${rcResult} -eq 0 ]] || rcResult+=9

	lmsDisplayTs "*********************************"
	lmsDisplayTs "END test_st_Error"
	lmsDisplayTs "*********************************"
	
	lmsDisplay
	lmsDisplay "**************************************************"
	lmsDisplay
	return ${rcResult}
}

# =========================================================================
# =========================================================================
#
#	Test functions
#
# =========================================================================
# =========================================================================

# =========================================================================
#
#	test_rc_ErrorMsg
#
#		Testing structure: rcErrorMsg
#
#		Error codes: 	 10 = expectedResult failed
#						 11 = rcErrors has no matching rcEMsg key
#						 12 = rc_Error failed
#
# =========================================================================
function test_rc_ErrorMsgs()
{
	lmsDisplayTs "*********************************"
	lmsDisplayTs "START test_rc_ErrorMsg"
	lmsDisplayTs "*********************************"

	local eList="${rcErrors[@]}"

	rcResult=0
	for lError in ${eList}
	do
		rclib_Error "$lError"
		rcResult=$?
		[[ ${rcResult} -eq 0 ]] || break

		expectedResults ${lError} ${rcError} "0"
		rcResult=$?
		[[ ${rcResult} -eq 0 ]] || break

	 	lmsDisplayTs "  ${lError} @ ${rcELoc} = \"${rcEMsg}\""
		lmsDisplay
	done

	lmsDisplayTs "*********************************"
	lmsDisplayTs "END test_rc_Error"
	lmsDisplayTs "*********************************"

	lmsDisplay
	lmsDisplay "**************************************************"
	lmsDisplay

	return ${rcResult}
}

# =========================================================================
#
#	test_rc_Error
#
#		Testing structure: rcError
#
#		Error codes: 	 10 = expectedResult failed
#						 11 = rcErrors has no matching rcEMsg key
#						 12 = rc_Error failed
#
# =========================================================================
function test_rc_Error()
{
	lmsDisplayTs "*********************************"
	lmsDisplayTs "START test_rc_Error"
	lmsDisplayTs "*********************************"

	local eList="${rcErrors[@]}"

	rcResult=0
	for lError in ${eList}
	do
		rclib_Error "$lError"
		rcResult=$?
		[[ ${rcResult} -eq 0 ]] || break

		expectedResults ${lError} ${rcError} "0"
		rcResult=$?
		[[ ${rcResult} -eq 0 ]] || break

	 	lmsDisplayTs "  \"${lError}\" (${rcEIndex}) = \"${rcEMsg}\" @ [${rcELoc}]"
		lmsDisplay
	done

	lmsDisplayTs "*********************************"
	lmsDisplayTs "END test_rc_Error"
	lmsDisplayTs "*********************************"

	lmsDisplay
	lmsDisplay "**************************************************"
	lmsDisplay

	return ${rcResult}
}

# =========================================================================
#
#	test_rc_Help
#
#		Testing: rcHelp
#
# =========================================================================
function test_rc_Help()
{
	lmsDisplayTs "*********************************"
	lmsDisplayTs "START test_rc_Help"
	lmsDisplayTs "*********************************"

	rclib_Help

	lmsDisplayTs "*********************************"
	lmsDisplayTs "END test_rc_Help"
	lmsDisplayTs "*********************************"

	lmsDisplay
	lmsDisplay "**************************************************"
	lmsDisplay

	return 0
}

# =========================================================================
# =========================================================================
#
#
#
# =========================================================================
# =========================================================================

rcResult=0
testsRun=0

lmscli_optQuiet=${LMSOPT_QUIET}
lmscli_optDebug=${LMSOPT_DEBUG}
lmscli_optRemove=${LMSOPT_REMOVE}

clear

lmsDisplayTs "*********************************"
lmsDisplayTs "*********************************"
lmsDisplayTs
lmsDisplayTs "      ${rustcLibTests_Name}"
lmsDisplayTs "          Version: ${rustcLibTests_Version}"
lmsDisplayTs
lmsDisplayTs "*********************************"
lmsDisplayTs "*********************************"

lmsDisplay
lmsDisplay

# =========================================================================

while true
do

    # =====================================================================

	test_st_Error
	[[ ${rcResult} -eq 0 ]] && test_st_ErrorMsgs
	[[ ${rcResult} -eq 0 ]] || break

    # =====================================================================

	test_st_Verbs
	[[ ${rcResult} -eq 0 ]] || break

    # =====================================================================

	test_rc_Error
	[[ ${rcResult} -eq 0 ]] || break

    # =====================================================================

	test_rc_Help
	break
done

# =========================================================================

exit ${rcResult}
