FROM marshallino16/alpine_tifig

# Install python

RUN apk add --no-cache bash git nginx uwsgi uwsgi-python

RUN apk add --update \
    python \
    python3 \
    python-dev \
    py-pip \
    build-base


# Get env argument
ARG env
RUN echo "ENV :  $env"

RUN ls
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 80

CMD ["python3", "main.py"]





