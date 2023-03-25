#!/bin/bash

echo "Running the bash script.."

sudo yum update -y

sudo yum upgrade -y

sudo amazon-linux-extras install epel -y

sudo wget https://rpmfind.net/linux/epel/7/x86_64/Packages/l/libuv-1.44.2-1.el7.x86_64.rpm

sudo rpm -i libuv-1.44.2-1.el7.x86_64.rpm

sudo yum install nodejs -y

sudo yum install npm -y

node -v

npm -v

sudo yum install yum install git -y

git clone https://github.com/nagavenkateshgavini/eventrise.git

cd eventrise

npm install

cd ..

pwd

unzip event-rise-apis.zip -d event-rise-apis

rm event-rise-apis.zip

cd event-rise-apis/

npm install

cd ..

sudo chmod 755 event-rise-apis

sudo chmod 755 eventrise

ls -al