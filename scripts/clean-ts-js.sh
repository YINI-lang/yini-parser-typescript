#!/usr/bin/env bash
#
# clean-ts-js.sh
#
# Recursively find all `.js` files. For each one, if there's
# a sibling `.ts` file (same dirname + basename), delete the `.js`.
#
# Usage:
#   ./clean-ts-js.sh [START_DIR]
#
# If no START_DIR is given, it defaults to the current directory (".").
#
# Example:
#   ./clean-ts-js.sh src
#   → deletes all *.js files under ./src that have a matching *.ts sibling.
#

set -euo pipefail

# 1) Where to start searching? Default: current directory.
START_DIR="${1:-.}"

# 2) Ensure START_DIR exists
if [[ ! -d "$START_DIR" ]]; then
  echo "Error: '$START_DIR' is not a directory."
  exit 1
fi

# 3) Use 'find' to locate all .js files under START_DIR
#    For each .js found, check if the corresponding .ts exists. If yes, delete the .js.
#
#    find ... -print0  → prints each path followed by a NUL, so we can handle spaces
#    while IFS= read -r -d '' jsfile  → read each NUL-terminated path into $jsfile
#
#    Then we compute the .ts sibling by changing the extension.
#
find "$START_DIR" -type f -name '*.js' -print0 |
while IFS= read -r -d '' jsfile; do
  # Compute the “same path but with .ts extension”:
  tsfile="${jsfile%.js}.ts"

  # If that .ts file exists, remove the .js
  if [[ -f "$tsfile" ]]; then
    rm "$jsfile"
    echo "Deleted: $jsfile  (because $tsfile exists)"
  fi
done

echo "All *.js cleaned! - All .js files with a sibling .ts have been deleted."
