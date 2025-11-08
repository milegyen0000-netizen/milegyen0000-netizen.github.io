import { CONFIG } from './config.js';
import { gameState } from './gameState.js';
import { getZoomLevel, constrainCamera } from './camera.js';

export function setupZoom(canvas, saveGameState) {
    canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Zoom level változtatás (1 = max zoom, 20 = min zoom)
        let newZoomLevel = gameState.camera.zoomLevel || 1;
        
        if (e.deltaY > 0) {
            // Zoom out (kisebb zoom level = nagyobb terület látszik)
            newZoomLevel = Math.min(CONFIG.MAX_ZOOM, newZoomLevel + 1);
        } else {
            // Zoom in (nagyobb zoom level = kisebb terület látszik)
            newZoomLevel = Math.max(CONFIG.MIN_ZOOM, newZoomLevel - 1);
        }

        // Ha nem változott, ne csináljunk semmit
        if (newZoomLevel === gameState.camera.zoomLevel) {
            return;
        }

        // Zoom az egér pozícióhoz képest
        const oldZoom = gameState.camera.zoom;
        const worldX = (mouseX - canvas.width / 2) / oldZoom + gameState.camera.x;
        const worldY = (mouseY - canvas.height / 2) / oldZoom + gameState.camera.y;

        gameState.camera.zoomLevel = newZoomLevel;
        gameState.camera.zoom = getZoomLevel(newZoomLevel);

        const newWorldX = (mouseX - canvas.width / 2) / gameState.camera.zoom + gameState.camera.x;
        const newWorldY = (mouseY - canvas.height / 2) / gameState.camera.zoom + gameState.camera.y;

        gameState.camera.x += worldX - newWorldX;
        gameState.camera.y += worldY - newWorldY;

        constrainCamera(canvas);
        saveGameState();
    }, { passive: false });
}

