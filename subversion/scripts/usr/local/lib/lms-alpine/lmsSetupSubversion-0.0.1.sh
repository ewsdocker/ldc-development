#!/bin/bash
# =========================================================================
# =========================================================================
#
#	lmsSetupSubversion
#	  Setup subversion configuration and folders
#
# =========================================================================
#
# @author Jay Wheeler.
# @version 0.0.1
# @copyright © 2018. EarthWalk Software.
# @license Licensed under the GNU General Public License, GPL-3.0-or-later.
# @package ewsdocker/alpine-subversion
# @subpackage lmsSetupSubversion
#
# =========================================================================
#
#	Copyright © 2018. EarthWalk Software
#	Licensed under the GNU General Public License, GPL-3.0-or-later.
#
#   This file is part of ewsdocker/alpine-subversion.
#
#   ewsdocker/alpine-subversion is free software: you can redistribute 
#   it and/or modify it under the terms of the GNU General Public License 
#   as published by the Free Software Foundation, either version 3 of the 
#   License, or (at your option) any later version.
#
#   ewsdocker/alpine-subversion is distributed in the hope that it will 
#   be useful, but WITHOUT ANY WARRANTY; without even the implied warranty 
#   of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#   GNU General Public License for more details.
#
#   You should have received a copy of the GNU General Public License
#   along with ewsdocker/alpine-subversion.  If not, see 
#   <http://www.gnu.org/licenses/>.
#
# =========================================================================
# =========================================================================

# =========================================================================
#
#	lmsSetupSubversion
#
#	    Setup the global values and configurations for apache
#
#	parameters:
#		svnRepo = name of the SVN repository
#		svnHtml = location of the subversion browser page
#		svnUser = subversion user name
#       svnPass = subversion password
#    Result:
#        0 = no error
#        non-zero = error number
#
# =========================================================================
function lmsSetupSubversion()
{
	local lmssvn_repo="${1}"
	local lmssvn_html="${2}"
	local lmssvn_user="${3}"
	local lmssvn_pass="${4}"

    [[ -n "$lmssvn_repo" ]] &&
     {
        [[ -d "/svn/$lmssvn_repo" ]] || 
         {
   	        svnadmin create /svn/$lmssvn_repo
   	        [[ $? -eq 0 ]] || return 1

   	        chgrp -R apache /svn/$lmssvn_repo
   	        chmod -R 775 /svn/$lmssvn_repo
         }
     }

    [[ -d "/svn/template" ]] || mkdir -p /svn/template/{trunk,tags,branches}

    [[ -n "$lmssvn_user" && -n "$lmssvn_pass" ]] && 
     {
 	    htpasswd -bc /etc/apache2/conf.d/davsvn.htpasswd $lmssvn_user $lmssvn_pass
        [[ $? -eq 0 ]] || return 2
     }

    [[ -z "$lmssvn_html" ]] ||
     {
        rm -f /var/www/localhost/htdocs/index.html
        cp /svn/$lmssvn_html/index.html /var/www/localhost/htdocs/index.html
     }
     
     return 0
}

