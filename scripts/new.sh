# count=1
# for file in *; do
#     echo "File $count: $file"
#     ((count++))
# done


# # ls *sh | while read -r file; do
# #     echo "processing: $file"
# # done

# # Without -r (interprets backslashes)
# echo "file with\\backslash.txt" | while read file; do
#     echo "Without -r: $file"
# done
# # Output: Without -r: file withbackslash.txt ← backslash removed!

# # With -r (preserves backslashes)
# echo "file with\\backslash.txt" | while read -r file; do
#     echo "With -r: $file"
# done
# # Output: With -r: file with\backslash.txt ← backslash preserved!



#!/bin/bash

# # Create actual test files with backslashes in names
# touch "file with\\backslash.txt"
# touch "normal_file.txt"

# echo "=== Testing backslash handling ==="

# # Without -r
# ls *backslash* | while read file; do
#     echo "Without -r: $file"
# done

# # With -r  
# ls *backslash* | while read -r file; do
#     echo "With -r: $file"
# done

# # Cleanup
# rm -f *backslash*.txt normal_file.txt

# CONFIG_DIR="/Users/laqrabtihassan/projects/next.js-cleanArchitecture/scripts"

# CONFIG_FILE="$CONFIG_DIR/config.txt"

# if [ ! -f $CONFIG_FILE ]; then 
#     echo "Creating config file"
#     touch $CONFIG_FILE
# fi

if [ ! -f "scripts/main.go" ]; then
    touch "scripts/main.go"
fi