#!/bin/bash

# Fix paths in the game files after Odin/Emscripten build
GAME_DIR="static/play/the-last-polygon"

echo "Fixing game paths in $GAME_DIR..."

# Fix index.html - update wasm fetch to use absolute path
sed -i.bak 's/fetch("index\.wasm")/fetch("\/play\/the-last-polygon\/index.wasm")/g' "$GAME_DIR/index.html"

# Fix index.js - update data file path to use absolute path
sed -i.bak "s/var REMOTE_PACKAGE_BASE = 'index\.data';/var REMOTE_PACKAGE_BASE = '\/play\/the-last-polygon\/index.data';/g" "$GAME_DIR/index.js"

# Remove backup files
rm -f "$GAME_DIR/index.html.bak" "$GAME_DIR/index.js.bak"

echo "Game paths fixed!"