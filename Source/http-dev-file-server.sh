#created by BJ Rutledge 
#!/bin/bash

# Start a simple http server so we can 
# mimic api calls in dev. 

# Default values
directory=$(pwd)
port=8080

# Parse optional flags
while getopts d:p: flag
do
    case "${flag}" in
        d) directory=${OPTARG};;
        p) port=${OPTARG};;
    esac
done

# Echo the message
echo "Starting HTTP server at: $directory on port: $port"

# Change to the specified directory and start the HTTP server
(cd "$directory" && http-server -p $port --cors)
