#!/bin/bash
# *****************************************************************************
# *****************************************************************************
#
#   testLdcHelp.sh
#		Test Help file validity and library functionality.
#
# *****************************************************************************
#
# @author Jay Wheeler.
# @version 0.2.0
# @copyright © 2016-2021. EarthWalk Software.
# @license Licensed under the GNU General Public License, GPL-3.0-or-later.
# @package ewsdocker/ldc-framework
# @subpackage library
#
# *****************************************************************************
#
#	Copyright © 2016-2021. EarthWalk Software
#	Licensed under the GNU General Public License, GPL-3.0-or-later.
#
#   This file is part of ewsdocker/ldc-framework.
#
#   ewsdocker/ldc-framework is free software: you can redistribute 
#   it and/or modify it under the terms of the GNU General Public License 
#   as published by the Free Software Foundation, either version 3 of the 
#   License, or (at your option) any later version.
#
#   ewsdocker/ldc-framework is distributed in the hope that it will 
#   be useful, but WITHOUT ANY WARRANTY; without even the implied warranty 
#   of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#   GNU General Public License for more details.
#
#   You should have received a copy of the GNU General Public License
#   along with ewsdocker/ldc-framework.  If not, see 
#   <http://www.gnu.org/licenses/>.
#
# *****************************************************************************
#
#	Version 0.0.1 - 06-09-2016.
#			0.0.2 - 01.09-2017.
#
#			0.1.0 - 01-29-2017.
#			0.1.1 - 02-23-2017.
#			0.1.2 - 09-06-2018.
#
#			0.2.0 - 01-27-2021.
#
# *****************************************************************************
# *****************************************************************************

declare    ldcapp_name="testLdcHelp"
declare    ldclib_bashRelease="0.1.3"

# *****************************************************************************

source ../applib/installDirs.sh

source $ldcbase_dirAppLib/stdLibs.sh

source $ldcbase_dirAppLib/cliOptions.sh
source $ldcbase_dirAppLib/commonVars.sh

# *****************************************************************************

ldcscr_Version="0.2.0"				# script version

ldcapp_help="$ldcbase_dirEtc/helpTest.xml"	# path to the help file
#ldcvar_help="$ldcbase_dirEtc/ldcInstallHelp.xml"	# path to the help file

# *****************************************************************************
# *****************************************************************************
#
#		External Functions
#
# *****************************************************************************
# *****************************************************************************

source $ldcbase_dirTestLib/testDump.sh

# *****************************************************************************
# *****************************************************************************
#
#		Test Functions
#
# *****************************************************************************
# *****************************************************************************

function testLdcHelpInit()
{
	ldcConioDisplay ""
	ldcConioDisplay "ldcHelpInit '${1}'"
	ldcConioDisplay ""
	
	ldcHelpInit "${1}"
	[[ $? -eq 0 ]] ||
	{
        xError=$?
		ldcConioDisplay "ldcHelp initialize failed: error = $xError, result = $ldchlp_error"
		testDumpExit "ldchlp_"
	}
	
	return 0
}

function testLdcHelpToStrV()
{
	ldcConioDisplay ""
	ldcConioDisplay "ldcHelpToStrV"

	ldctst_buffer=""
	ldcHelpToStrV ldctst_buffer
	[[ $? -eq 0 ]] ||
	{
		ldcConioDisplay "ldcHelpToStrV failed: $?, result = $ldchlp_error"
		testDumpExit "ldchlp_"
	}

	ldcConioDisplay "'${ldctst_buffer}'"
	return 0
}

function testLdcHelpToStr()
{
	ldcConioDisplay ""
	ldcConioDisplay "ldcHelpToStr"

	ldctst_buffer=$( ldcHelpToStr ldctst_buffer )
	[[ $? -eq 0 ]] ||
	{
		ldcConioDisplay "ldcHelpToStr failed: $?, result = $ldchlp_error"
		testDumpExit "ldchlp_"
	}

	ldcConioDisplay "'${ldctst_buffer}'"
	return 0
}

# *****************************************************************************
# *****************************************************************************
#
#		Start main program below here
#
# *****************************************************************************
# *****************************************************************************

ldcScriptFileName $0

source $ldcbase_dirAppLib/openLog.sh
source $ldcbase_dirAppLib/startInit.sh

# *****************************************************************************
# *****************************************************************************
#
#		Run the tests starting here
#
# *****************************************************************************
# *****************************************************************************

echo "STARTING"
exit 1

ldccli_optDebug=0

testLdcHelpInit "${ldcvar_help}"

testLdcHelpToStr

ldcConioDisplay "================================="

testLdcHelpToStrV

# *****************************************************************************

source $ldcbase_dirAppLib/scriptEnd.sh

# *****************************************************************************
