### ewsdocker/alpine-nginx-dev:3.10.0  
A **NGINX HHTP** Web server image based on [ewsdocker/alpine-nginx](https://github.com/ewsdocker/alpine-nginx).  

A simple, small footprint HTML development tool. **alpine-nginx-dev** provides a simple NGINX HTTP server which can be anchored at any location to serve the HTML content found there.  It's main purpose is to serve a GitHub web document as it is being developed.

____  
**Visit the [ewsdocker/alpine-nginx-dev](https://github.com/ewsdocker/alpine-nginx-dev/wiki) Wiki for complete documentation.**  
____  

**Installing ewsdocker/alpine-nginx-dev**  

The following script will download the selected **ewsdocker/alpine-nginx-dev** image, create a container, setup and populate the directory structures, and create the execution script(s).  

The _default_ values will install all directories and contents in the **docker host** user's home directory.  

**ewsdocker/alpine-nginx-dev:3.10.0**
  
    docker run --rm \
               -v ${HOME}/bin:/userbin \
               -v ${HOME}/.local:/usrlocal \
               -e LMS_BASE="${HOME}/.local" \
               -v ${HOME}/.config/docker:/conf \
               -v ${HOME}/.config/docker/alpine-nginx-dev-3.10.0:/root \
               --name=alpine-nginx-dev \
           ewsdocker/alpine-nginx-dev:3.10.0 lms-setup-alpine  

____  

**Running the installed scripts**

After running the above command script, and using the settings indicated, the docker host directories, mapped as shown in the above tables, will be configured as follows:

 - the executable scripts have been copied to **~/bin**;  
 - the associated **alpine-nginx-dev-"version"** execution script (shown below) will be found in **~/.local/bin**, and _should_ be customized with proper local volume names.  

The installation documentation for [ewsdocker/alpine-nginx]() shows 2 different examples to install the server.  The connection of **ewsdocker/alpine-nginx-dev** to the server depends upon the method of installation, as detailed in the 2 following sections.  

____  

The following _docker run_ command will create and start _alpine-nginx-dev_ service container:

    docker run -d \
           --restart unless-stopped \
           -v /home/jay/Development/ewsldc/ldc-framework/docs:/usr/share/nginx/html \
           --name=alpine-nginx-dev \
       ewsdocker/alpine-nginx-dev:3.10.0  
  
____  

**Building the server**


    docker build \  
           --file Dockerfile \  
           -t ewsdocker/alpine-nginx-dev:3.10.0 .  

____  

The **ewsdocker/alpine-nginx-dev** docker image is based on the latest [ewsdocker/alpine-nginx](https://github.com/ewsdocker/alpine-nginx/wiki) docker image.  

- A pre-built **ewsdocker/alpine-nginx-dev Docker** image is available on [Docker Hub](https://hub.docker.com) at [ewsdocker/alpine-nginx-dev](https://hub.docker.com/r/ewsdocker/alpine-nginx-dev/);

- The source for **ewsdocker/alpine-nginx-dev** is available on [GitHub](https://github.com/) at [ewsdocker/alpine-nginx-dev](https://github.com/ewsdocker/alpine-nginx-dev).  

____  

**Copyright © 2018. EarthWalk Software.**  
**Licensed under the GNU General Public License, GPL-3.0-or-later.**  

This file is part of **ewsdocker/alpine-nginx-dev**.  

**ewsdocker/alpine-nginx-dev** is free software: you can redistribute 
it and/or modify it under the terms of the GNU General Public License 
as published by the Free Software Foundation, either version 3 of the 
License, or (at your option) any later version.  

**ewsdocker/alpine-nginx-dev** is distributed in the hope that it will 
be useful, but WITHOUT ANY WARRANTY; without even the implied warranty 
of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.  

You should have received a copy of the GNU General Public License
along with **ewsdocker/alpine-nginx-dev**.  If not, see 
<http://www.gnu.org/licenses/>.  

____  

**NGINX**  
**Copyright (C) 2011-2016 Nginx, Inc.**  
**All rights reserved.**  

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:  

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.  

1. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.  

THIS SOFTWARE IS PROVIDED BY THE AUTHOR AND CONTRIBUTORS ``AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE AUTHOR OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.  

