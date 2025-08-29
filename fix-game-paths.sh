#!/bin/bash

# Fix paths in all game files after Odin/Emscripten build
PLAY_DIR="static/play"

echo "Fixing game paths in all games..."

# Loop through all subdirectories in static/play/
for game_dir in "$PLAY_DIR"/*/; do
    if [ -d "$game_dir" ]; then
        game_name=$(basename "$game_dir")
        echo "Processing game: $game_name"
        
        # Fix index.html if it exists
        if [ -f "$game_dir/index.html" ]; then
            # Reset any previous fixes first
            sed -i.bak "s|fetch(\"/play/[^/]*/index\.wasm\")|fetch(\"index.wasm\")|g" "$game_dir/index.html"
            # Apply new fix
            sed -i.bak "s/fetch(\"index\.wasm\")/fetch(\"\/play\/$game_name\/index.wasm\")/g" "$game_dir/index.html"
        fi
        
        # Fix index.js if it exists  
        if [ -f "$game_dir/index.js" ]; then
            # Reset any previous fixes first
            sed -i.bak "s|var REMOTE_PACKAGE_BASE = '/play/[^/]*/index\.data';|var REMOTE_PACKAGE_BASE = 'index.data';|g" "$game_dir/index.js"
            # Apply new fix
            sed -i.bak "s/var REMOTE_PACKAGE_BASE = 'index\.data';/var REMOTE_PACKAGE_BASE = '\/play\/$game_name\/index.data';/g" "$game_dir/index.js"
        fi
        
        # Remove backup files
        rm -f "$game_dir"/*.bak
    fi
done

echo "All game paths fixed!"