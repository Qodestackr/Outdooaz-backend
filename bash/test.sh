#!/bin/bash
echo "Winchy is a great backend dev!"

GREET="Howdy devs!"

echo $GREET

echo "Name: $1"
echo "Email: $2"
echo "Message: $3"

while true; do
    read -p "Do you want to send a message? (y/n) " yn
    case $yn in
        [Yy]* ) echo "Great Quitting...";;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
done
