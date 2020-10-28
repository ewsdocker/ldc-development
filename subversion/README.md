# ewsdocker/alpine-subversion  
## AlpineLinux + Subversion + Apache 2 + WebDav  
Subversion via an Apache2 server running apache2-webdav in a very small AlpineLinux docker-container.  

____  
## Under construction - not ready for testing!  
____  
### Docker Image  
A pre-made docker image of **ewsdocker/alpine-subversion** is available from [ewsdocker/alpine-subversion](https://hub.docker.com/r/ewsdocker/alpine-subversion/) at [Docker Hub](https://hub.docker.com).  
______  
#### Installing ewsdocker/alpine-subversion  

The following scripts will download the selected **ewsdocker/alpine-subversion** image, create a container, setup and populate the directory structures, and create the execution script(s).  

The <i>default</i> values will install all directories and contents in the <b>docker host</b> user's home directory.  
____  
**ewsdocker/alpine-subversion:latest**
  
    docker run --rm \
               -v ${HOME}/bin:/userbin \
               -v ${HOME}/.local:/usrlocal \
               -e LMS_BASE="${HOME}/.local" \
               -e LMSBUILD_VERSION=latest \
               -v ${HOME}/.config/docker:/conf \
               -v ${HOME}/.config/docker/alpine-subversion-latest:/root \
               --name=alpine-subversion-latest \
           ewsdocker/alpine-subversion:latest lms-setup-alpine  

____  

**ewsdocker/alpine-subversion:3.8.1**
  
        docker run --rm \
               -v ${HOME}/bin:/userbin \
               -v ${HOME}/.local:/usrlocal \
               -e LMS_BASE="${HOME}/.local" \
               -v ${HOME}/.config/docker:/conf \
               -v ${HOME}/.config/docker/alpine-subversion-3.8.1:/root \
               --name=alpine-subversion-3.8.1 \
           ewsdocker/alpine-subversion:3.8.1 lms-setup-alpine  
____  

#### Running the installed scripts  

After running the above command script, and using the settings indicated, the docker host directories, mapped as shown in the above tables, will be configured as follows:

 - the executable scripts have been copied to **~/bin**;  
 - the application desktop file(s) have been copied to **~/.local/share/applications**, and are availablie in any _task bar_ menu;  
 - the associated **alpine-subversion-"version"** executable script (shown below) will be found in **~/.local/bin**, and _should_ be customized with proper local volume names.  

Execute the following _docker run_ command to create and start a client container:  
____  
**ewsdocker/alpine-subversion:latest**
  
The following _docker run_ command creates and starts a client container. It is automatically installed by the _lms-setup-alpine_ script, above:

    docker run -d \
               --restart unless-stopped \
               --hostname="alpine-subversion" \
               --dns-search="internet.lan" \
               -p 90:80 \
               -v /etc/localtime:/etc/localtime:ro \
               -v ${HOME}/.config/docker/alpine-subversion-latest/workspace:/workspace \
               -e SVN_REPO=project \
               -e SVN_NAME=jay \
               -e SVN_PASS=MurPhy22 \
               --name=alpine-subversion \
           ewsdocker/alpine-subversion 

To create and run the container, enter the following command on the console command-line:

    ~/.local/bin/alpine-subversion-latest  

____  
**ewsdocker/alpine-subversion:3.8.1**
  
    docker run -d \
               --restart unless-stopped \
               -v /etc/localtime:/etc/localtime:ro \
               -v ${HOME}/.config/docker/alpine-subversion-3.8.1/workspace:/workspace \
               -e SVN_NAME=jay \
               -e SVN_PASS=MurPhy22 \
               -e SVN-REPO=project \
               -p 90:80 \
               --name=alpine-subversion-3.8.1 \
           ewsdocker/alpine-subversion:3.8.1 


To create and run the container, the following should work from the command-line:

    ~/.local/bin/alpine-subversion-3.8.1  

____  
**Visit the [ewsdocker/alpine-subversion Wiki](https://github.com/ewsdocker/alpine-subversion/wiki/QuickStart) for complete documentation of this docker image.**  
____  
#### Exiting the Interactive Shell  

The interactive shell may be exited by entering **exit** at the _bash_ prompt, or running the following command from the docker host running the container  

    docker stop alpine-subversion-3.8.1   

or  

    docker stop alpine-subversion-latest  

The following messages will be output:  

    exit
    Shut down

____  
### License
**Copyright © 2018. EarthWalk Software.**  
**Licensed under the GNU General Public License, GPL-3.0-or-later.**  

This file is part of **ewsdocker/alpine-subversion**.  

**ewsdocker/alpine-subversion** is free software: you can redistribute 
it and/or modify it under the terms of the GNU General Public License 
as published by the Free Software Foundation, either version 3 of the 
License, or (at your option) any later version.  

**ewsdocker/alpine-subversion** is distributed in the hope that it will 
be useful, but WITHOUT ANY WARRANTY; without even the implied warranty 
of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.  

You should have received a copy of the GNU General Public License
along with **ewsdocker/alpine-subversion**.  If not, see 
<http://www.gnu.org/licenses/>.  
____  
by Jay Wheeler, EarthWalk Software  
2017-08-16.  
