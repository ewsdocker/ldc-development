#!/bin/bash

# ===================================================================================
# ===================================================================================
#
#	plugins.sh
#       Add plugins Version repository to APT repository, 
#       Install requested plugins from the APT repository.
#
# ===================================================================================
#
# @author Jay Wheeler.
# @version 0.1.0
# @copyright © 2020. EarthWalk Software.
# @license Licensed under the GNU General Public License, GPL-3.0-or-later.
# @package ewsdocker/ldc-development
# @subpackage eclipse/plugins
#
# ==========================================================================
#
#	Copyright © 2020. EarthWalk Software
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
#   along with ewsdocker/ldc-development.  
#
#   If not, see <http://www.gnu.org/licenses/>.
#
# ==========================================================================
# ==========================================================================

declare  plugin=""
declare  ldc_plugins="/usr/local/lib/ldc/plugins"

# ==========================================================================

. ${ldc_plugins}/aptpkg/aptpkg.sh

. ${ldc_plugins}/cc/cclib.sh
  [[ $? -eq 0 ]] || echo "Unable to open cclib.sh"

. ${ldc_plugins}/fortran/gfortran8lib.sh
  [[ $? -eq 0 ]] || echo "Unable to open gfortran8lib.sh"

. ${ldc_plugins}/gtk/gtklib.sh
  [[ $? -eq 0 ]] || echo "Unable to open gtklib.sh"

. ${ldc_plugins}/jdk/jdk13lib.sh
  [[ $? -eq 0 ]] || echo "Unable to open jdk13lib.sh"

. ${ldc_plugins}/njs/njs14lib.sh
  [[ $? -eq 0 ]] || echo "Unable to open njs14lib.sh"

. ${ldc_plugins}/npm/npmlib.sh
  [[ $? -eq 0 ]] || echo "Unable to open npmlib.sh"

. ${ldc_plugins}/php/php5.6lib.sh
  [[ $? -eq 0 ]] || echo "Unable to open php5.6lib.sh"

[[ -z "${NJS_BASH}" ]] ||
 {
    . ${ldc_plugins}/npm/npm_bashserver.sh
 }

[[ -z "${PHP_COMPOSER}" ]] ||
 {
    . ${ldc_plugins}/php/phpComposer.sh
 }

# ==========================================================================
#
#    pluginsHeader
#       Output start of plugin installation message to the console.
#
#    Enter:
#       pluginMsg = string containing string to display (i.e. - output)
#    Exit:
#       0 = no error
#       non-zero = error code
#
# ==========================================================================
function pluginsHeader()
{
	echo
	echo "        *************************************************"
	echo
	echo "               START ${1} Plugin"
	echo
	echo "        *************************************************"
	echo
	echo
}

# ==========================================================================
#
#    pluginsFooter
#       Output an end of plugin installation message to the console.
#
#    Enter:
#       pluginMsg = string containing string to display (i.e. - output)
#    Exit:
#       0 = no error
#       non-zero = error code
#
# ==========================================================================
function pluginsFooter()
{
	echo
	echo
	echo "        *************************************************"
	echo
	echo "               END ${1} Plugin"
	echo
	echo "        *************************************************"
	echo
}

# ==========================================================================
#
#    plugins
#       Install plug-ins in the PLUGIN_LIST.
#
#    Enter:
#       pluginList = (optional) list of plugin names to install
#    Exit:
#       0 = no error
#       non-zero = error code
#
# ==========================================================================
function plugins()
{
	local pluginList=${1:-"$PLUGIN_LIST"}
	local plugin=""

	[[ -z "${pluginList}" ]] && return 1

	for plugin in ${pluginList}
	do

    	case ${plugin} in

        	"cc8")
				pluginsHeader "cc8 = ccInstall"

				ccInstall
				[[ $? -eq 0 ]] ||
				 {
					echo "ccInstall failed: $?"
					return $?
				 }

				pluginsFooter "cc8 = ccInstall"

				;;

			"fortran8")
				pluginsHeader "fortran8 = gfInstall"

				gfInstall
				[[ $? -eq 0 ]] ||
				 {
					echo "gfInstall failed: $?"
					return $?
				 }

				pluginsFooter "fortran8 = gfInstall"

				;;

			"gtk3")
				pluginsHeader "gtk3 = gtkInstall"

				gtkInstall
				[[ $? -eq 0 ]] ||
				 {
					echo "gtkInstall failed: $?"
					return $?
				 }

				pluginsFooter "gtk3 = gtkInstall"

				;;
		
			"jdk13")
				pluginsHeader "jdk13 = jdkInstall.sh"

				jdkInstall ${OJDK_PKG} ${OJDK_URL}
				[[ $? -eq 0 ]] ||
				 {
				    echo "Unable to install JDK 13 ($?)"
				    return 1
				 }

				pluginsFooter "jdk13 = jdkInstall.sh"

				;;
		
			"njs14")
				pluginsHeader "njs14 = installNjs14"

				installNjs14 ${NJS_BASH}
				[[ $? -eq 0 ]] || 
				 {
				    echo "installNjs14 failed ($?)."
				    return $?
				 }

				pluginsFooter "njs14 = installNjs14"

				;;
		
			"npm")
				pluginsHeader "npm = npmInstall"

				npmInstall "${NPM_LIST}"
				[[ $? -eq 0 ]] || 
				 {
				    echo "npmInstall failed ($?)."
				    return $?
				 }

				pluginsFooter "npm = npmInstall"

				;;
		
			"php5.6")
				pluginsHeader "php5.6 = installPhp5.6"

				installPhp5.6
				[[ $? -eq 0 ]] || 
				 {
				    echo "InstallPhp5.6 failed ($?)."
				    return $?
				 }

				pluginsFooter "php5.6 = installPhp5.6"
				;;
		
			*)
				echo "Unknown plugin: $plugin"
				
			    return 99
				;;

    	esac

	done

	return $?
}

# ==========================================================================

plugins "${PLUGIN_LIST}"

exit $?
