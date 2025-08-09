// WebAssembly loader for The Last Polygon
(async () => {
    try {
        const response = await fetch('game.wasm');
        const buffer = await response.arrayBuffer();
        const module = await WebAssembly.compile(buffer);
        const instance = await WebAssembly.instantiate(module, {
            env: {
                // Add required imports here based on what Odin/Raylib needs
                print: (ptr) => console.log("Game output:", ptr),
                // Add more imports as needed
            }
        });
        
        // Call main or initialization function
        if (instance.exports.main) {
            instance.exports.main();
        } else if (instance.exports._start) {
            instance.exports._start();
        }
        
        console.log("Game loaded successfully!");
    } catch (error) {
        console.error("Failed to load game:", error);
        document.getElementById('error-message').style.display = 'block';
    }
})();
