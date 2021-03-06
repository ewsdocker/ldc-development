# *****************************************************************************
# *****************************************************************************
#
#   cliOptions.sh
#
# *****************************************************************************
#
# @author Jay Wheeler.
# @version 0.0.3
# @copyright © 2016, 2017, 2018. EarthWalk Software.
# @license Licensed under the GNU General Public License, GPL-3.0-or-later.
# @package ldc-bash
# @subpackage applications
#
# *****************************************************************************
#
#	Copyright © 2016, 2017, 2018. EarthWalk Software
#	Licensed under the GNU General Public License, GPL-3.0-or-later.
#
#   This file is part of ewsdocker/ldc-bash.
#
#   ewsdocker/ldc-bash is free software: you can redistribute 
#   it and/or modify it under the terms of the GNU General Public License 
#   as published by the Free Software Foundation, either version 3 of the 
#   License, or (at your option) any later version.
#
#   ewsdocker/ldc-bash is distributed in the hope that it will 
#   be useful, but WITHOUT ANY WARRANTY; without even the implied warranty 
#   of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#   GNU General Public License for more details.
#
#   You should have received a copy of the GNU General Public License
#   along with ewsdocker/ldc-bash.  If not, see 
#   <http://www.gnu.org/licenses/>.
#
# *****************************************************************************
#
#			Version 0.0.3 - 08-24-2018.
#
# *****************************************************************************
# *****************************************************************************

ldccli_optDebug=0				# (d) Debug output if not 0
ldccli_optLogDisplay=0

ldccli_optSilent=0    			# (q) Quiet setting: non-zero for absolutely NO output
ldccli_optQuiet=0				# set to 1 to ldccli_optOverride the ldccli_optSilent flag
ldccli_optNoReset=0
ldccli_optOverride=0

ldccli_optQueueErrors=0
ldccli_optPrintDOMEntity=0

ldccli_optBatch=0				# (b) Batch mode - missing parameters fail
