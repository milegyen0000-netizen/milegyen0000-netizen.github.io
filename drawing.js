import { CONFIG } from './config.js';

export function drawTree(ctx, x, y) {
    // 8-bites pixeles fa rajzolása (lépcsős)
    const centerX = x + CONFIG.TILE_SIZE / 2;
    const centerY = y + CONFIG.TILE_SIZE / 2;
    
    // Törzs (pixeles) - sötétebb barna
    ctx.fillStyle = '#5a3a2a';
    const trunkX = Math.floor(centerX - 3);
    const trunkY = Math.floor(y + CONFIG.TILE_SIZE - 8);
    ctx.fillRect(trunkX, trunkY, 6, 8);
    
    // Korona (pixeles kör - lépcsős) - világosabb zöld, hogy látszódjon
    ctx.fillStyle = '#3a8a3a';
    const radius = CONFIG.TILE_SIZE / 3;
    const steps = 8;
    for (let i = 0; i < steps; i++) {
        const angle1 = (i / steps) * Math.PI * 2;
        const angle2 = ((i + 1) / steps) * Math.PI * 2;
        const x1 = Math.floor(centerX + Math.cos(angle1) * radius);
        const y1 = Math.floor(centerY + Math.sin(angle1) * radius);
        const x2 = Math.floor(centerX + Math.cos(angle2) * radius);
        const y2 = Math.floor(centerY + Math.sin(angle2) * radius);
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.closePath();
        ctx.fill();
    }
    
    // Sötétebb részletek a kontraszthoz
    ctx.fillStyle = '#2a6a2a';
    const detailPositions = [
        [centerX - 4, centerY - 2],
        [centerX + 3, centerY - 1],
        [centerX - 2, centerY + 3]
    ];
    detailPositions.forEach(([px, py]) => {
        ctx.fillRect(Math.floor(px), Math.floor(py), 2, 2);
    });
}

export function drawHouse(ctx, x, y) {
    // 8-bites pixeles ház rajzolása (lépcsős ferde vonalak)
    const baseY = y + CONFIG.TILE_SIZE - 12;
    const roofTopY = y + 8;
    const roofLeftX = x + 4;
    const roofRightX = x + CONFIG.TILE_SIZE - 4;
    const centerX = x + CONFIG.TILE_SIZE / 2;
    
    // Ház alap (pixeles)
    ctx.fillStyle = '#8b6f47';
    const baseX = Math.floor(x + 4);
    const baseWidth = Math.floor(CONFIG.TILE_SIZE - 8);
    ctx.fillRect(baseX, Math.floor(baseY), baseWidth, 8);
    
    // Tető (lépcsős ferde vonalak) - finomabb lépcsőzés
    ctx.fillStyle = '#cc4444';
    // Bal oldal tető (lépcsős) - kevesebb lépcső
    const steps = 5;
    for (let i = 0; i < steps; i++) {
        const t = i / steps;
        const t2 = (i + 1) / steps;
        const x1 = Math.floor(roofLeftX + (centerX - roofLeftX) * t);
        const y1 = Math.floor(baseY + (roofTopY - baseY) * t);
        const x2 = Math.floor(roofLeftX + (centerX - roofLeftX) * t2);
        const y2 = Math.floor(baseY + (roofTopY - baseY) * t2);
        
        // Vastagabb vonalak a finomabb lépcsőzéshez
        const height = Math.max(2, Math.ceil((y2 - y1) / 2));
        ctx.fillRect(x1, y1, x2 - x1 + 1, height);
    }
    // Jobb oldal tető (lépcsős) - kevesebb lépcső
    for (let i = 0; i < steps; i++) {
        const t = i / steps;
        const t2 = (i + 1) / steps;
        const x1 = Math.floor(centerX + (roofRightX - centerX) * t);
        const y1 = Math.floor(roofTopY + (baseY - roofTopY) * t);
        const x2 = Math.floor(centerX + (roofRightX - centerX) * t2);
        const y2 = Math.floor(roofTopY + (baseY - roofTopY) * t2);
        
        // Vastagabb vonalak a finomabb lépcsőzéshez
        const height = Math.max(2, Math.ceil((y2 - y1) / 2));
        ctx.fillRect(x1, y1, x2 - x1 + 1, height);
    }
    
    // Ajtó (pixeles)
    ctx.fillStyle = '#4a2a1a';
    const doorX = Math.floor(centerX - 3);
    const doorY = Math.floor(y + CONFIG.TILE_SIZE - 10);
    ctx.fillRect(doorX, doorY, 6, 6);
    
    // Ablak (pixeles)
    ctx.fillStyle = '#4a9eff';
    const windowX = Math.floor(x + 6);
    const windowY = Math.floor(baseY - 4);
    ctx.fillRect(windowX, windowY, 4, 4);
    ctx.fillRect(Math.floor(x + CONFIG.TILE_SIZE - 10), windowY, 4, 4);
}

