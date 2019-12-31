FROM spritsail/alpine-cmake

WORKDIR /home

 # Global env
RUN apk update \
    apk upgrade \
    apk add git tmux build-base curl bash

# Cmake
#RUN \
#    wget https://cmake.org/files/v3.10/cmake-3.10.0.tar.gz &&\
#    tar xzvf cmake-3.10.0.tar.gz &&\
#    rm cmake-3.10.0.tar.gz &&\
#    cd cmake-3.10.0 &&\
#    ./bootstrap &&\
#    make &&\
#    make install

# Dpkg
RUN apk add dpkg pkgconfig

RUN apk add --update --no-cache --repository http://dl-3.alpinelinux.org/alpine/edge/community --repository http://dl-3.alpinelinux.org/alpine/edge/main


RUN apk add --update alpine-sdk

RUN apk add glib libxml2 \
    libxslt fftw \
    gettext gtk+2.0 \
    python lcms \
    imagemagick-dev openexr \
    libwebp orc tiff poppler-glib librsvg libgsf

RUN apk add --virtual vips-dependencies build-base \
    zlib-dev libxml2-dev glib-dev gobject-introspection-dev \
    libjpeg-turbo-dev libexif-dev lcms2-dev fftw-dev giflib-dev libpng-dev \
    libwebp-dev orc-dev tiff-dev poppler-dev librsvg-dev libgsf-dev openexr-dev \
    py-gobject3-dev flex bison

# Vips
RUN \
    mkdir vips &&\
    pwd &&\
    ls -a &&\
    cd vips &&\
    wget -c https://github.com/jcupitt/libvips/releases/download/v8.5.9/vips-8.5.9.tar.gz &&\
    tar xzvf vips-8.5.9.tar.gz &&\
    cd /home/vips/vips-8.5.9 &&\
    dpkg --configure -a &&\
    ./configure &&\
    make &&\
    make install

ENV PATH "${PATH}:/usr/local/lib/"

# VIPS
#RUN apk add vips-dev

# FFMEG
RUN apk add g++ ffmpeg ffmpeg-dev ffmpeg-libs


# Tifig
RUN \
    cd /home/ &&\
    git clone --recursive https://github.com/monostream/tifig.git &&\
    mkdir tifig/build && cd tifig/build &&\
    cmake .. &&\
    make

RUN cp /home/tifig/build/tifig /usr/local/bin/tifig

EXPOSE 80

CMD ["python", "main.py"]





