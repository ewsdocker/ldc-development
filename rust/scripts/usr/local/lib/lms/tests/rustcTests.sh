#!/bin/bash

declare    rustcTests_Version="0.1.0"
declare    rustcTests_Name="rustcTests.sh"

# =========================================================================
# =========================================================================
#
#	rustcTests.sh
#		Run tests to qualify rustc.lib functions.
#
# =========================================================================
#
# @author Jay Wheeler.
# @version 0.1.0
# @copyright © 2019. EarthWalk Software.
# @license Licensed under the GNU General Public License, GPL-3.0-or-later.
# @package ewsdocker/ldc-dev
# @subpackage rustcTests
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
. /usr/local/lib/lms/lmsconCli.lib
. /usr/local/lib/lms/lmsDisplay.lib
. /usr/local/lib/lms/lmsPath.lib
. /usr/local/lib/lms/lmsUtilities.lib

. /usr/local/lib/lms/rustc.lib

# =========================================================================

declare rcTests=0
declare rcResult=0

# =========================================================================
# =========================================================================
#
#	Support functions
#
# =========================================================================
# =========================================================================

# =========================================================================
#
#	expectedResults
#		(apologies for the RRPN format)
#
#	  Entry:
#		resultExpected = expected result
#		resultReceived = received result
#		resultEquality = 0 = equal | 1 = not equal
#	  Exit:
#		0 = true result
#		1 = false result
#
# =========================================================================
function expectedResults()
{
	local lExpected="${1}"
	local lReceived="${2}"
	local lEquality=${3:-"0"}

	lmsDisplayTs "    *****************************"
	lmsDisplayTs "    START expectedResults"
	lmsDisplayTs "    *****************************"

 	lmsDisplayTs "    Testing expected results: "
 	lmsDisplayTs "       Expected: \"${lExpected}\" "
 	lmsDisplayTs "       Received: \"${lReceived}\" "
 	lmsDisplayTs "       Equality: \"${lEquality}\" "

	local exResult=0

	[[ -z ${lExpected} || -z ${lReceived} ]] && 
	 {
	 	lmsDisplayTs "    *** Missing required parameter ***"
	 	exResult=1
	 }

	[[ "${lEquality}" != "0" && "${lEquality}" != "1" ]] && 
	 {
	 	lmsDisplayTs "    *** Equality (${lEquality}) is not numeric, or is out of range ***"
	 	exResult=2
	 }

	[[ ${exResult} -eq 0 ]] &&
	 {

		if [[ "${lEquality}" == "0" ]]
		then
			[[ "${lExpected}" == "${lReceived}" ]] || exResult=1
		else
			[[ "${lExpected}" != "${lReceived}" ]] || exResult=1
		fi
	 }
	
	lmsDisplayTs "       Result  : ${exResult}"
	lmsDisplayTs "    *****************************"
	lmsDisplayTs "    END expectedResults"
	lmsDisplayTs "    *****************************"
	lmsDisplayTs

	return ${exResult}
}

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
#		Testing structure: rustcVerbs
#
#		Error codes: 	 10 = expectedResult failed
#						 11 = rustcErrors has no matching rustcErrorMsg key
#
# =========================================================================
function test_st_Verbs()
{
	lmsDisplayTs "*********************************"
	lmsDisplayTs "START test_st_Verbs"
	lmsDisplayTs "*********************************"

	local    lVerb=""
	local -a lVerbs=( $rustcVerbs )
	local    lVerbList="${lVerbs[@]}"

	lmsDisplayTs "rustcVerbs list: ${rustcVerbs}"

	rcResult=0

	expectedResults "${rustcVerbs}" "${lVerbList}" "0"
	rcResult=$?

 	expectedResults ${#lVerbs[*]} ${#lVerbs[*]} "0"
	rcResult=$?

	local    svKey=0
	local    svKeyV=""

	for lVerb in ${rustcVerbs}
	do
		lmsDisplayTs "  lVerb: $lVerb"
		lmsDisplayTs "  svKey: $svKey"

		svKeyV=${lVerbs[$svKey]}
		expectedResults "${lVerb}" "${svKeyV}" "0"
		rcResult=$?

		[[ ${rcResult} -eq 0 ]] || break && lmsDisplayTs "  ${svKeyV} = \"${lVerb}\""
		
		lmsDisplayTs "  *******************************"
		lmsDisplayTs

		let svKey=${svKey}+1
	done

	[[ ${rcResult} -eq 0 ]] || rcResult+=24

	lmsDisplayTs "*********************************"
	lmsDisplayTs "END test_st_Verbs"
	lmsDisplayTs "*********************************"

	lmsDisplay

	return ${rcResult}
}

# =========================================================================
#
#	test_st_ErrorMsg
#
#		Testing structure: rustcErrorMsg
#
#		Error codes: 	 20 = expectedResult failed
#						 21 = rustcErrors has no matching rustcErrorMsg key
#
# =========================================================================
function test_st_ErrorMsgs()
{
	lmsDisplayTs "*********************************"
	lmsDisplayTs "START test_st_ErrorMsgs"
	lmsDisplayTs "*********************************"

	local lError=""
	local lErrorList="${rustcErrors[@]}"
	local lErrorMsgs="${!rustcErrorMsgs[@]}"

	lmsDisplayTs "rustcErrors list: \"${lErrorList}\""
	lmsDisplayTs "rustcErrorMsgs key list: \"${lErrorMsgs}\""

	expectedResults "${lErrorMsgs}" "${lErrorList}" "0"
	rcResult=$?
	
	[[ ${rustcResult} -eq 0 ]] &&
	 {
		for lError in ${lErrorList}
		do
			[[ "${!rustcErrorMsgs[@]}" =~ "${lError}" ]] || 
			 {
		 		lmsDisplayTs "Could not find \"${lError}\" in the rustcErrorMsgs key list."
		 		[[ -z ${rustcErrorMsgs[$lError]} ]] && lmsDisplayTs "\"${lError}\" not found as a key in rustcErrorMsgs."
				rcResult=2
			 }

			[[ ${rcResult} -eq 0 ]] || break
			lmsDisplayTs "${lError} = \"${rustcErrorMsgs[$lError]}\""
		done
	 }

	[[ ${rcResult} -eq 0 ]] || rcResult+=19

	lmsDisplayTs "*********************************"
	lmsDisplayTs "END test_st_ErrorMsgs"
	lmsDisplayTs "*********************************"

	lmsDisplay
	
	return ${rcResult}
}

# =========================================================================
#
#	test_st_Error
#
#		Testing structure: rustcError
#
#		Error codes: 	 10 = expectedResult failed
#						 11 = rustcErrors has no matching rustcErrorMsg key
#
# =========================================================================
function test_st_Error()
{
	lmsDisplayTs "*********************************"
	lmsDisplayTs "START test_st_Error"
	lmsDisplayTs "*********************************"

	local eList="${rustcErrors[@]}"
	local lError=""

	lmsDisplayTs "rustcErrors list: \"${eList}\""

	rcResult=0
	expectedResults ${#rustcErrorMsgs[*]} ${#rustcErrors[*]} "0"
	rcResult=$?
	
	[[ ${rcResult} -eq 0 ]] &&
	 {
		for lError in ${eList}
		do
			rcResult=0
			[[ " ${!rustcErrorMsgs[@]} " =~ "${lError}" ]] || 
			 {
		 		lmsDisplayTs "Could not find \"${lError}\" in the rustcErrorMsgs key list."
		 		[[ -z ${rustcErrorMsgs[$lError]} ]] && lmsDisplayTs "\"${lError}\" not found as a key in rustcErrorMsgs."
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
#	test_rc_Error
#
#		Testing structure: rustcError
#
#		Error codes: 	 10 = expectedResult failed
#						 11 = rustcErrors has no matching rustcErrorMsg key
#						 12 = rc_Error failed
#
# =========================================================================
function test_rc_Error()
{
	lmsDisplayTs "*********************************"
	lmsDisplayTs "START test_rc_Error"
	lmsDisplayTs "*********************************"

	local eList="${rustcErrors[@]}"

	rcResult=0
	for lError in ${eList}
	do
		rc_Error "$lError"
		rcResult=$?
		[[ ${rcResult} -eq 0 ]] || break

		expectedResults ${lError} ${rustcError} "0"
		rcResult=$?
		[[ ${rcResult} -eq 0 ]] || break

	 	lmsDisplayTs "  ${lError} = \"${rustcErrorMsg}\""
		lmsDisplay
	done

	[[ ${rcResult} -eq 0 ]] || rcResult+=9

	lmsDisplayTs "*********************************"
	lmsDisplayTs "END test_rc_Error"
	lmsDisplayTs "*********************************"

	lmsDisplay

	return ${rcResult}
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
lmsDisplayTs "      ${rustcTests_Name}"
lmsDisplayTs "          Version: ${rustcTests_Version}"
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
	[[ ${rcResult} -eq 0 ]] && test_rc_Error
	[[ ${rcResult} -eq 0 ]] || break

    # =====================================================================

	test_st_Verbs
	[[ ${rcResult} -eq 0 ]] || break

    # =====================================================================

	break
done

# =========================================================================

exit ${rcResult}
