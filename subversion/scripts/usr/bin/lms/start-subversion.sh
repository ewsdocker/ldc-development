#!/bin/bash
# =========================================================================
# =========================================================================
#
#	start-subversion.sh
#	  Start subversion
#
# =========================================================================
#
# @author Jay Wheeler.
# @version 0.0.1
# @copyright © 2018. EarthWalk Software.
# @license Licensed under the GNU General Public License, GPL-3.0-or-later.
# @package ewsdocker/alpine-subversion
# @subpackage start-subversion
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

[[ -z "$SVN_REPO" ]] ||
{
    [[ -d "/svn/$SVN_REPO" ]] ||
     {
     	svnadmin create /svn/$SVN_REPO
     	[[ $? -eq 0 ]] || exit 1
     	
     	chgrp -R apache /svn/$SVN_REPO
     	chmod -R 775 /svn/$SVN_REPO
     }
}

[[ -d "/svn/template" ]] || mkdir -p /svn/template/{trunk,tags,branches}

[[ -n "$SVN_USER"   &&  -n "$SVN_PASS" ]] && htpasswd -bc /etc/apache2/conf.d/davsvn.htpasswd $SVN_USER $SVN_PASS

[[ -z "$SVN_HTML" ]] ||
{
    rm -f /var/www/localhost/htdocs/index.html
    cp /svn/$SVN_HTML/index.html /var/www/localhost/htdocs/index.html
}

httpd -D FOREGROUND

exit 0
