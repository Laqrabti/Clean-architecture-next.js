# set -euo pipefail 
# ifs=$'\n\t'

# name=${1:-"world"}
# echo "hello, $name"

# first_name=${1:-"Guest"}
# last_name=${2:-"User"}
# third_name=${3:-"I don't know"}

# echo "Hello, $first_name $last_name $third_name"


# if [ -z "$1" ]; then 
#     name="world"
# else
#     name="$1"
# fi 

# echo "hello; $name"

# if [ ! -f "config.txt" ]; then 
#     echo "Creating config file..."
#     touch config.txt
# fi 


# if [ -z "$1" ]; then 
#     folder="~/documents"
# else 
#     folder="$1"
# fi

# echo "Using folder: $folder"


# if [ -z "$1" ] && [ -z "$2" ]; then 
#     echo "both arguments are empty"
# fi

# if [ -n "$1" ] || [ -n "$2" ]; then 
#     echo "at least one argument is not empty"
# fi


# if [ ! -f "/Users/laqrabtihassan/projects/next.js-cleanArchitecture/scripts/config.txt" ]; then 
#     echo "creating config in scripts"
#     touch "/Users/laqrabtihassan/projects/next.js-cleanArchitecture/scripts/config.txt"
# fi

# if [ ! -f "config.txt" ]; then
#     touch "config.txt"
# fi


# touch "file with space.txt"
# touch "another file.txt"
# touch "normal_file.txt"

# echo "===CUSTOM IFS (only newlines and tabs) ==="
# IFS=$"\n\t"

# count=1
# for file in *; do 
#     echo "File $count: $file"
#     ((count++))
# done

#!/bin/bash

