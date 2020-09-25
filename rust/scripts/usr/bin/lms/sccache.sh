#!/bin/bash
# =========================================================================
# =========================================================================
#
#	sscache.sh
#		Compile the sscache with rustc and package in tarball.
#
# =========================================================================
#
# @author Jay Wheeler.
# @version 0.1.0
# @copyright © 2019-2020. EarthWalk Software.
# @license Licensed under the GNU General Public License, GPL-3.0-or-later.
# @package ewsdocker/ldc-development
# @subpackage sscache.sh
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

. /usr/local/lib/lms/lmsUtilities.lib
. /usr/local/lib/lms/lmsconCli.lib
. /usr/local/lib/lms/lmsDisplay.lib
. /usr/local/lib/lms/lmsArchiveUtilities.lib

# =========================================================================

declare    gResult=0
declare    sccacheExclude=""

declare    sccacheArchive=${SC_ARCHIVE}
declare    scRepo=${SC_REPO}

declare    rustPkg=${RUSTC_PKG}
declare    rustUrl=${RUSTC_URL}

declare    adminFunction=""
declare    buildOpts=""
declare    compileOpts=""
declare    functionList=""
declare    tarOpts=""

declare -i gKey=0
declare    gParam=""
declare    gValue=""
declare    gMsg=""

# =========================================================================

lmscli_optQuiet=${LMSOPT_QUIET}
lmscli_optDebug=${LMSOPT_DEBUG}
lmscli_optRemove=${LMSOPT_REMOVE}

# =========================================================================
# =========================================================================
#
#	Support functions and utilities
#
# =========================================================================
# =========================================================================

# =========================================================================
#
#    setPath
#
#	Entry:
#		none
#
#	Exit:
#		0 = no error
#		non-zero = error code
#
# =========================================================================
function setPath()
{
	# ####################################################################
	#
	# TODO
	#	Need to check if path contains path to .cargo prior to doing this
	#
	# ####################################################################

	echo "export PATH=\"${HOME}\"/.cargo/bin:${PATH}" >> ${HOME}/.bashrc
	source ${HOME}/.bashrc
	
	return 0
}

# =========================================================================
#
#    show
#
#	Entry:
#		title = (optional) title string
#	Exit:
#		0 = no error
#		non-zero = error code
#
# =========================================================================
function show()
{
	lmsDisplay ${1:-""}

	ls -la /repo/${SC_NAME}*.*
	ls -la /repo/${RUSTC_NAME}*.*

	lmsDisplay

	return 0
}

# =========================================================================
# =========================================================================
#
#	Rust compiler commands
#
# =========================================================================
# =========================================================================

# =========================================================================
#
#    new - remove rust compiler and cargo package manager
#
#	Entry:
#		none
#	Exit:
#		0 = no error
#		non-zero = error code
#
# =========================================================================
function new()
{
	lmsDisplay
	lmsDisplayTs "  New System - removing current installation."
	lmsDisplay

	[[ -e "${HOME}/.rust"   ]] && rm -Rf "${HOME}/.rustup"  1 > /dev/null 2>&1
	[[ -e "${HOME}/.cargo"  ]] && rm -Rf "${HOME}/.cargo"   1 > /dev/null 2>&1
	[[ -e "${HOME}/.bashrc" ]] && rm -Rf "${HOME}/.bashrc"  1 > /dev/null 2>&1

	return 0
}

# =========================================================================
#
#    make - download and install rust compiler
#
#	Entry:
#		rust_url = URL of the script server
#		rust_pkg = the script package to download
#
#	Exit:
#		0 = no error
#		non-zero = error code
# --no-modify-path
#
# =========================================================================
function make()
{
	local lopt=${1:-" -v "}

	wget ${rustUrl}
	[[ $? -eq 0 ]] || return 2

	chmod +x ./${rustPkg}

	./${rustPkg} -y "${lopt}"
	[[ $? -eq 0 ]] || return 3
	
	return 0
}

# =========================================================================
#
#    build ( or install ) compiler
#
#	Entry:
#		opts = (optional) string containing build options
#	Exit:
#		0 = no error
#		non-zero = error code
#
# =========================================================================
function build()
{
	local opts=${1:-""}

	lmsDisplay
	lmsDisplayTs "  Building (or Installing) the compiler"
	lmsDisplay

	wget "${RUSTC_URL}"
	[[ $? -eq 0 ]] || return 1

	tar -xvf "${RUSTC_PKG}"
	[[ $? -eq 0 ]] || return 2

	rm "${RUSTC_PKG}"

	setPath

	lmsDisplay
	lmsDisplayTs "Compiler built/installed."
	lmsDisplay

	return 0
}

# =========================================================================
#
#    compile
#
#	Entry:
#		opts = (optional) string containing compile options
#
#	Exit:
#		0 = no error
#		non-zero = error code
#
# =========================================================================
function compile()
{
	local opts=${1:-""}

	lmsDisplay
	lmsDisplayTs "  Compiling sccache"
	[[ -n ${opts} ]] && lmsDisplayTs "    compile options: ${opts}"
	lmsDisplay

	echo "export PATH=${HOME}/.cargo/bin:${PATH}" >> ${HOME}/.bashrc
	echo "sccache=/sccache" >> ${HOME}/.bashrc
	source ${HOME}/.bashrc

	local rslt=0
	[[ -z ${opts} ]] && cargo install --force sccache || cargo install " ${opts} " sccache
	rslt=$?

	[[ ${rslt} -eq 0 ]] && 
	 {
	 	ln -s ~/.cargo/bin/sccache /usr/local/bin/sccache
	 	
	 	lmsDisplay
		lmsDisplayTs "compile completed."
		lmsDisplay
	 }

	return ${rslt}
}

# =========================================================================
#
#    archive
#
#	Entry:
#		none
#	Exit:
#		0 = no error
#		non-zero = error code
#
# =========================================================================
function archive()
{
	lmsDisplay
	lmsDisplayTs "  Archiving results to ${SC_PKG}"
	lmsDisplay

	[[ -e "${SC_TARBALL}" ]] && rm "${SC_TARBALL}"
	[[ -e "${SC_TARBALL}.gz" ]] && rm "${SC_TARBALL}.gz"

    # =====================================================================
    #
    #  lmsArchive <name of archive> <directory to archive> <path to repository> <final update> <options>
    #
    # =====================================================================

	lmsArchive "${SC_PKG}" "." "${SC_REPO}" "1" "${tarOpts}"
	[[ $? -eq 0 ]] || return 1

	show

	lmsDisplay
	lmsDisplayTs "Archiving completed."

	show

	return 0
}

# =========================================================================
# =========================================================================
#
#	Rust compiler command selector
#
# =========================================================================
# =========================================================================

# =========================================================================
#
#    selectCommand - select (execute) the requested function, if valid
#
#	parameters:
#		none
#
#    Result:
#        0 = no error
#        non-zero = error number
#
# =========================================================================
function selectCommand()
{
	gResult=0

	lmsCliParse
	[[ $? -eq 0 ]] || return 1

	[[ ${#cliKey[*]} -eq 0 ]] && 
	 {
 		cliKey[${#cliKey[*]}]="run"
 		cliParam["run"]=""
	 }

	for gKey in "${!cliKey[@]}"
	do

		gParam=${cliKey[$gKey]}
		gValue=${cliParam[$gParam]}

		case ${gParam} in 

			"archive")
				archive "${gValue} "
				gResult=$?

				;;

    		"build")
				build "${gValue} "
				gResult=$?

				;;

			"compile")
				compile "${gValue} "
				gResult=$?

				;;

			"new")
				new "${gValue} "
				gResult=$?

				;;

			"rebuild")
				new
				[[ $? -eq 0 ]] && build
				[[ $? -eq 0 ]] && compile
				[[ $? -eq 0 ]] && archive
				gResult=$?

				;;

			"show")
				show "${gValue} "
				gResult=$?

				;;

			*)
 				lmsDisplay
				lmsDisplayTs "Unknown parameter = \"${gParam}\" "
				lmsDisplay
				gResult=127

				return ${gResult}

				;;

		esac

	done

	return ${gResult}
}

# =========================================================================
# =========================================================================
#
#	Application Starts Here
#
# =========================================================================
# =========================================================================

selectCommand
exit $?
