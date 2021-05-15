#!/bin/bash

set +e

URL=${1:-"https://localhost"}
docker run --rm --network=host -v "$(pwd)":/sitespeed.io sitespeedio/sitespeed.io --mobile -n 5 --preUrl $URL $URL

