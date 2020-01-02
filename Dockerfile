FROM marshallino16/alpine_tifig

# PYTHON + PIP
RUN apk add --no-cache bash git nginx uwsgi uwsgi-python

RUN apk add --update \
    python \
    python3 \
    python-dev \
    py-pip \
    build-base

# NODEJS + NPM
RUN apk add --update nodejs nodejs-npm

# READ ENV VAR
ARG env
RUN echo "ENV :  $env"

# COPY ALL FILES
COPY . .

RUN ls

RUN cd app/
# INSTALL NODE DEP
RUN npm install

# BUILD
RUN npm run build
RUN cd ..

# INSTALL PYTHON PACKAGES
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 80

# RUN
CMD ["python", "main.py"]





