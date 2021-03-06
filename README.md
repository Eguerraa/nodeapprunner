# Node App Runner
## Docker Image with NPM to run some nodeJS applications

![Docker Build](https://img.shields.io/docker/cloud/build/eguerraaa/nodeapprunner.svg)
![Docker Automated](https://img.shields.io/docker/cloud/automated/eguerraaa/nodeapprunner.svg)
![Docker Pulls](https://img.shields.io/docker/pulls/eguerraaa/nodeapprunner.svg)


 * NPM

Prerequisites
-----

I assume you have installed Docker and it is running.

See the [Docker website](http://www.docker.io/gettingstarted/#h_installation) for installation instructions.

Build
-----

Steps to build a Docker image:

1. Clone this repo

        git clone https://github.com/Eguerraa/nodeapprunner

2. Build the image

        docker build -t="my-app" docker-sample

    This might take a bit.

3. In my repo there is a API to communicate with mongoDB databases, edit the app.js file and update the mongoDB address

4. Run the image's default command, which should start everything up. The `-p` option forwards the container's port 3000 to port 3000 on the host.

        docker run -p="3000:3000" my-app


You can also login to the image and have a look around:

    docker run -i -t my-app /bin/bash


## Workdir
    /usr/src/app

## Services

Service     | Port | Usage
------------|------|------
Node Rest API      | 3000 | Curl http://localhost:3000 to verify if the service is actually running

Example:

    StatusCode        : 200
    StatusDescription : OK
    Content           : <!DOCTYPE html>
    <html>
    <head>
      <title>Express</title>
      <link rel='stylesheet' href='/stylesheets/style.css' />
    </head>
    <body>
      <h1>Express</h1>
      <p>Welcome to Express</p>