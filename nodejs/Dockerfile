FROM node:latest

WORKDIR /usr/scr/app

RUN apt-get -q update

RUN  apt install -y wget netcat-traditional && \
    wget -q -O /usr/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for && \
    chmod +x /usr/bin/wait-for

COPY src .

RUN npm install