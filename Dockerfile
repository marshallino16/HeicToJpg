FROM marshallino16/alpine_tifig

# Install python
RUN apk add python3

# Get env argument
ARG env
RUN echo "ENV :  $env"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY requirements.txt /usr/src/app/
RUN pip install --no-cache-dir -r requirements.txt

COPY . /usr/src/app

ENV PORT=80
EXPOSE 80

CMD ["python3", "main.py"]





