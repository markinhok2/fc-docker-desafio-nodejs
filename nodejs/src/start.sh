#!/bin/bash

npm install

wait-for mysql:3306 -t 40 -- echo "MySQL está online"

node index.js