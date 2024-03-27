#!/bin/bash
kill -9 $(sudo lsof -i:8080 | grep 'node' |  awk '{print $2}')

