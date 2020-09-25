# ldc-dev
Under development - not ready for use.

____  
## Development Notes  


    # ===========================================================================
    # ===========================================================================

### ldc-dev:dgpp6 

    # ===========================================================================
    #
    #    ldc-dev:dgpp6-0.1.0
    #  
    # ===========================================================================

    cd ~/Development/ewslms/ldc-dev
    docker build \
      --build-arg BUILD_VERSION="dgpp6" \
      --build-arg BUILD_EXT_MOD="" \
      \
      --build-arg RUN_APP="eclipse" \
      \
      --build-arg LIB_HOST=http://alpine-nginx-pkgcache \
      --network=pkgnet \
      \
      --file Dockerfile.dgpp6 \
      -t ewsdocker/ldc-dev:dgpp6-0.1.0 .

    docker run \
      -it \
      -e LMSOPT_QUIET=0 \
      -e LRUN_APP="eclipse" \
      \
      -e LMS_BASE="${HOME}/.local" \
      -e LMS_HOME="${HOME}" \
      -e LMS_CONF="${HOME}/.config" \
      \
      -v ${HOME}/bin:/userbin \
      -v ${HOME}/.local:/usrlocal \
      -v ${HOME}/.config/docker:/conf \
      -v ${HOME}/.config/docker/ldc-dev-dgpp6-0.1.0/root \
      -v ${HOME}/.config/docker/ldc-dev-dgpp6-0.1.0/workspace:/workspace \
      \
      -e DISPLAY=unix${DISPLAY} \
      -v ${HOME}/.Xauthority:/root/.Xauthority \
      -v /tmp/.X11-unix:/tmp/.X11-unix \
      -v /dev/shm:/dev/shm \
      --device /dev/snd \
      \
      -v ${HOME}/Development:/Development \
      -v ${HOME}/Source:/Source \
      \
      --name=ldc-dev-dgpp6-0.1.0 \
    ewsdocker/ldc-dev:dgpp6-0.1.0

    docker stop ldc-dev-dgpp6-0.1.0

    docker rm ldc-dev-dgpp6-0.1.0

    docker rmi ewsdocker/ldc-dev:dgpp6-0.1.0

    # ===========================================================================
    # ===========================================================================

### ldc-core:dtestpad 

    # ===========================================================================
    #
    #    ldc-core:dtestpad-0.1.0 
    #
    # ===========================================================================

    cd ~/Development/ewslms/ldc-dev
    docker build \
      --build-arg FROM_PARENT="ldc-eclipse" \
      --build-arg FROM_VERS="dcdt" \
      \
      --build-arg LIB_HOST=http://alpine-nginx-pkgcache \
      --network=pkgnet \
      \
      --file Dockerfile.dtestpad \
      -t ewsdocker/ldc-dev:dtestpad-0.1.0 .

    docker run \
      -it \
      --rm \
      -e LRUN_APP="mousepad" \
      -e LMSOPT_QUIET=0\
      \
      -e LMS_BASE="${HOME}/.local" \
      -e LMS_HOME="${HOME}" \
      -e LMS_CONF="${HOME}/.config" \
      \
      -v ${HOME}/bin:/userbin \
      -v ${HOME}/.local:/usrlocal \
      -v ${HOME}/.config/docker:/conf \
      -v ${HOME}/.config/docker/ldc-dev-dtestpad-0.1.0:${HOME} \
      -v ${HOME}/.config/docker/ldc-dev-dtestpad-0.1.0/workspace:/workspace \
      \
      -e DISPLAY=unix${DISPLAY} \
      -v ${HOME}/.Xauthority:${HOME}/.Xauthority \
      -v /tmp/.X11-unix:/tmp/.X11-unix \
      -v /dev/shm:/dev/shm \
      --device /dev/snd \
      \
      -v ${HOME}/Downloads:/Downloads \
      -v ${HOME}/Documents:/Documents \
      \
      --name=ldc-dev-dtestpad-0.1.0 \
    ewsdocker/ldc-dev:dtestpad-0.1.0

	docker start ldc-dev-dtestpad-0.1.0

	docker rm ldc-dev-dtestpad-0.1.0

	rm -Rf ${HOME}/.config/docker/ldc-dev-dtestpad-0.1.0

    # ===========================================================================
    # ===========================================================================

### ldc-dev:dpython-dev 

    # ===========================================================================
    #
    #    ldc-dev:dpython-0.1.0-dev
    #  
    # ===========================================================================

    cd ~/Development/ewslms/ldc-dev
    docker build \
      --build-arg PY3_HOST=http://alpine-nginx-pkgcache \
      --build-arg LIB_HOST=http://alpine-nginx-pkgcache \
      --network=pkgnet \
      \
      --file Dockerfile.dpython \
      -t ewsdocker/ldc-dev:dpython-0.1.0-dev .

    docker run \
      -d \
      --rm \
      -e LMSOPT_QUIET="0" \
      \
      -e LMS_BASE="${HOME}/.local" \
      -e LMS_HOME="${HOME}" \
      -e LMS_CONF="${HOME}/.config" \
      \
      -v ${HOME}/bin:/userbin \
      -v ${HOME}/.local:/usrlocal \
      -v ${HOME}/.config/docker:/conf \
      -v ${HOME}/.config/docker/ldc-dev-dpython-0.1.0-dev:/root \
      -v ${HOME}/.config/docker/ldc-dev-dpython-0.1.0-dev/workspace:/workspace \
      \
      -e DISPLAY=unix${DISPLAY} \
      -v ${HOME}/.Xauthority:/root/.Xauthority \
      -v /tmp/.X11-unix:/tmp/.X11-unix \
      -v /dev/shm:/dev/shm \
      --device /dev/snd \
      \
      -v ${HOME}/Downloads:/Downloads \
      \
      --name=ldc-dev-dpython-0.1.0-dev \
    ewsdocker/ldc-dev:dpython-0.1.0-dev

    docker exec -it ldc-dev-dpython-0.1.0-dev /bin/bash

    docker stop ldc-dev-dpython-0.1.0-dev

    docker rmi ewsdocker/ldc-dev:dpython-0.1.0-dev

    # ===========================================================================
    # ===========================================================================

### ldc-lang:dgtk2-dev 

    # ===========================================================================
    #
    #    ldc-lang:dgtk-0.1.0-gtk2-dev
    #  
    # ===========================================================================

    cd ~/Development/ewslms/ldc-lang
    docker build \
      --build-arg BUILD_EXT_MOD="-gtk2-dev" \
      \
      --build-arg BUILD_GTK2="1" \
      --build-arg BUILD_GTK2_DEV="1" \
      --build-arg BUILD_GTK3="0" \
      --build-arg BUILD_GTK3_DEV="0" \
      \
      --build-arg LIB_HOST=http://alpine-nginx-pkgcache \
      --network=pkgnet \
      \
      --file Dockerfile.dgtk \
      -t ewsdocker/ldc-lang:dgtk-0.1.0-gtk2-dev .

    docker run \
      -d \
      --rm \
      \
      -e LMS_BASE="${HOME}/.local" \
      -e LMS_HOME="${HOME}" \
      -e LMS_CONF="${HOME}/.config" \
      \
      -v ${HOME}/bin:/userbin \
      -v ${HOME}/.local:/usrlocal \
      -v ${HOME}/.config/docker:/conf \
      -v ${HOME}/.config/docker/ldc-lang-dgtk-0.1.0-gtk2-dev:/root \
      -v ${HOME}/.config/docker/ldc-lang-dgtk-0.1.0-gtk2-dev/workspace:/workspace \
      \
      -e DISPLAY=unix${DISPLAY} \
      -v ${HOME}/.Xauthority:/root/.Xauthority \
      -v /tmp/.X11-unix:/tmp/.X11-unix \
      -v /dev/shm:/dev/shm \
      --device /dev/snd \
      \
      -v ${HOME}/Downloads:/Downloads \
      \
      --name=ldc-lang-dgtk-0.1.0-gtk2-dev \
    ewsdocker/ldc-lang:dgtk-0.1.0-gtk2-dev

    docker exec -it ldc-lang-dgtk-0.1.0-gtk2-dev /bin/bash

    docker stop ldc-lang-dgtk-0.1.0-gtk2-dev

    # ===========================================================================
    # ===========================================================================

### ldc-lang:dgtk3-dev 

    # ===========================================================================
    #
    #    ldc-lang:dgtk-0.1.0-gtk3-dev
    #  
    # ===========================================================================

    cd ~/Development/ewslms/ldc-lang
    docker build \
      --build-arg BUILD_EXT_MOD="-gtk3-dev" \
      \
      --build-arg BUILD_GTK2="0" \
      --build-arg BUILD_GTK2_DEV="0" \
      --build-arg BUILD_GTK3="1" \
      --build-arg BUILD_GTK3_DEV="1" \
      \
      --build-arg LIB_HOST=http://alpine-nginx-pkgcache \
      --network=pkgnet \
      \
      --file Dockerfile.dgtk \
      -t ewsdocker/ldc-lang:dgtk-0.1.0-gtk3-dev .

    docker run \
      -d \
      --rm \
      \
      -e LMS_BASE="${HOME}/.local" \
      -e LMS_HOME="${HOME}" \
      -e LMS_CONF="${HOME}/.config" \
      \
      -v ${HOME}/bin:/userbin \
      -v ${HOME}/.local:/usrlocal \
      -v ${HOME}/.config/docker:/conf \
      -v ${HOME}/.config/docker/ldc-lang-dgtk-0.1.0-gtk3-dev:/root \
      -v ${HOME}/.config/docker/ldc-lang-dgtk-0.1.0-gtk3-dev/workspace:/workspace \
      \
      -e DISPLAY=unix${DISPLAY} \
      -v ${HOME}/.Xauthority:/root/.Xauthority \
      -v /tmp/.X11-unix:/tmp/.X11-unix \
      -v /dev/shm:/dev/shm \
      --device /dev/snd \
      \
      -v ${HOME}/Downloads:/Downloads \
      \
      --name=ldc-lang-dgtk-0.1.0-gtk3-dev \
    ewsdocker/ldc-lang:dgtk-0.1.0-gtk3-dev

    docker exec -it ldc-lang-dgtk-0.1.0-gtk3-dev /bin/bash

    docker stop ldc-lang-dgtk-0.1.0-gtk3-dev

    # ===========================================================================
    # ===========================================================================

### ldc-lang:dgtk-dev 

    # ===========================================================================
    #
    #    ldc-lang:dgtk-0.1.0-gtk-dev
    #  
    # ===========================================================================

    cd ~/Development/ewslms/ldc-lang
    docker build \
      --build-arg BUILD_EXT_MOD="-gtk-dev" \
      \
      --build-arg BUILD_GTK2="1" \
      --build-arg BUILD_GTK2_DEV="1" \
      --build-arg BUILD_GTK3="1" \
      --build-arg BUILD_GTK3_DEV="1" \
      \
      --build-arg LIB_HOST=http://alpine-nginx-pkgcache \
      --network=pkgnet \
      \
      --file Dockerfile.dgtk \
      -t ewsdocker/ldc-lang:dgtk-0.1.0-gtk-dev .

    docker run \
      -d \
      --rm \
      \
      -e LMS_BASE="${HOME}/.local" \
      -e LMS_HOME="${HOME}" \
      -e LMS_CONF="${HOME}/.config" \
      \
      -v ${HOME}/bin:/userbin \
      -v ${HOME}/.local:/usrlocal \
      -v ${HOME}/.config/docker:/conf \
      -v ${HOME}/.config/docker/ldc-lang-dgtk-0.1.0-gtk-dev:/root \
      -v ${HOME}/.config/docker/ldc-lang-dgtk-0.1.0-gtk-dev/workspace:/workspace \
      \
      -e DISPLAY=unix${DISPLAY} \
      -v ${HOME}/.Xauthority:/root/.Xauthority \
      -v /tmp/.X11-unix:/tmp/.X11-unix \
      -v /dev/shm:/dev/shm \
      --device /dev/snd \
      \
      -v ${HOME}/Downloads:/Downloads \
      \
      --name=ldc-lang-dgtk-0.1.0-gtk-dev \
    ewsdocker/ldc-lang:dgtk-0.1.0-gtk-dev

    docker exec -it ldc-lang-dgtk-0.1.0-gtk-dev /bin/bash

    docker stop ldc-lang-dgtk-0.1.0-gtk-dev

    # ===========================================================================
    # ===========================================================================

### ldc-lang:dqt4-dev 

    # ===========================================================================
    #
    #    ldc-lang:dqt-0.1.0-qt4-dev
    #  
    # ===========================================================================

    cd ~/Development/ewslms/ldc-lang
    docker build \
      --build-arg BUILD_EXT_MOD="-qt4-dev" \
      --build-arg BUILD_QT4="qt4" \
      --build-arg BUILD_QT4_DEV="1" \
      \
      --build-arg LIB_HOST=http://alpine-nginx-pkgcache \
      --network=pkgnet \
      \
      --file Dockerfile.dqt \
      -t ewsdocker/ldc-lang:dqt-0.1.0-qt4-dev .

    docker run \
      -d \
      --rm \
      -e LMSOPT_QUIET="0"\
      \
      -e LMS_BASE="${HOME}/.local" \
      -e LMS_HOME="${HOME}" \
      -e LMS_CONF="${HOME}/.config" \
      \
      -v ${HOME}/bin:/userbin \
      -v ${HOME}/.local:/usrlocal \
      -v ${HOME}/.config/docker:/conf \
      -v ${HOME}/.config/docker/ldc-lang-dqt-0.1.0-qt4-dev:/root \
      -v ${HOME}/.config/docker/ldc-lang-dqt-0.1.0-qt4-dev/workspace:/workspace \
      \
      -e DISPLAY=unix${DISPLAY} \
      -v ${HOME}/.Xauthority:/root/.Xauthority \
      -v /tmp/.X11-unix:/tmp/.X11-unix \
      -v /dev/shm:/dev/shm \
      --device /dev/snd \
      \
      -v ${HOME}/Downloads:/Downloads \
      \
      --name=ldc-lang-dqt-0.1.0-qt4-dev \
    ewsdocker/ldc-lang:dqt-0.1.0-qt4-dev

    docker exec -it ldc-lang-dqt-0.1.0-qt4-dev /bin/bash

    docker stop ldc-lang-dqt-0.1.0-qt4-dev

