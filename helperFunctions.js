import { RockElement } from "./rockElement.js"
import { PaperElement } from "./paperElement.js"
import { ScissorsElement } from "./scissorsElement.js"

export function resolveWallCollision(movableElement, newPosition, minPosition, containerBottomRight) {
    const maxPosition = [containerBottomRight[1] - movableElement.width,
    containerBottomRight[0] - movableElement.height]

    let resolvedPosition = []

    if (newPosition[0] < minPosition[0]) {
        resolvedPosition.push(minPosition[0] + minPosition[0] * 0.001)
        movableElement.vx *= -1.0
    }
    else if (newPosition[0] > maxPosition[0]) {
        resolvedPosition.push(maxPosition[0] - maxPosition[0] * 0.001)
        movableElement.vx *= -1.0
    }
    else {
        resolvedPosition.push(newPosition[0])
    }

    if (newPosition[1] < minPosition[1]) {
        resolvedPosition.push(minPosition[1] + minPosition[1] * 0.001)
        movableElement.vy *= -1.0
    } else if (newPosition[1] > maxPosition[1]) {
        resolvedPosition.push(maxPosition[1] - maxPosition[1] * 0.001)
        movableElement.vy *= -1.0
    }
    else {
        resolvedPosition.push(newPosition[1])
    }

    return resolvedPosition
}

export function resolveObjectsColision(me1, me2) {
    let anyCollisionResolved = false

    const center1X = me1.x + me1.width / 2;
    const center1Y = me1.y + me1.height / 2;
    const center2X = me2.x + me2.width / 2;
    const center2Y = me2.y + me2.height / 2;

    const dx = center1X - center2X;
    const dy = center1Y - center2Y;

    const minWidth = (me1.width / 2) + (me2.width / 2);
    const minHeight = (me1.height / 2) + (me2.height / 2);

    if (Math.abs(dx) < minWidth && Math.abs(dy) < minHeight) {

        anyCollisionResolved = true
        
        const overlapX = minWidth - Math.abs(dx);
        const overlapY = minHeight - Math.abs(dy);

        if (overlapX < overlapY) {
            me1.vx *= -1; 
            me2.vx *= -1;

            const correction = overlapX / 2;
            
            if (dx > 0) {
                me1.x += correction;
                me2.x -= correction;
            } else {
                me1.x -= correction;
                me2.x += correction;
            }
        } else {
            me1.vy *= -1;
            me2.vy *= -1;

            const correction = overlapY / 2;

            if (dy > 0) {
                me1.y += correction;
                me2.y -= correction;
            } else {
                me1.y -= correction;
                me2.y += correction;
            }
        }
    }

    return anyCollisionResolved
}

export function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

export function getMovableElements(minSpeed, maxSpeed, spawnAmount) {
    const moveableElements = []

    for (let i = 0; i < spawnAmount; i++) {
        const rockElement = new RockElement(getRandomFloat(minSpeed, maxSpeed), getRandomFloat(minSpeed, maxSpeed))
        const paperElement = new PaperElement(getRandomFloat(minSpeed, maxSpeed), getRandomFloat(minSpeed, maxSpeed))
        const scissorsElement = new ScissorsElement(getRandomFloat(minSpeed, maxSpeed), getRandomFloat(minSpeed, maxSpeed))
    
        moveableElements.push(rockElement, paperElement, scissorsElement)
    }

    moveableElements.sort((a, b) => {
        if (a instanceof RockElement && !(b instanceof RockElement)) return -1
        if (!(a instanceof RockElement) && b instanceof RockElement) return 1
        return 0
    })
    
    moveableElements.sort((a, b) => {
        if (a instanceof PaperElement && !(b instanceof PaperElement)) return -1
        if (!(a instanceof PaperElement) && b instanceof PaperElement) return 1
        return 0
    })

    return moveableElements
}

export function placeMovableElements(moveableElements, container, spawnAmount, minPosition, containerBottomRight) {
    const defaultWidth = 48.063
    const defaultHeight = 47
    
    let xCount = 0
    for (let i = 0; i < moveableElements.length; i++) {
        if (xCount === spawnAmount) {
            xCount = 0
        }

        const me = moveableElements[i]
        const y = minPosition[1] + (((containerBottomRight[0] - defaultHeight) / 3) * Math.floor(i / spawnAmount))
        const x = minPosition[0] + (defaultWidth + defaultWidth * 0.05) * (xCount++ + 1)

        container.appendChild(me.createElement([x + window.scrollX, y + window.scrollY]))

        const boundaries = me.element.getBoundingClientRect()
        me.width = boundaries.width
        me.height = boundaries.height
    }
}

export function placeMovableElements1(moveableElements, container, spawnAmount, minPosition, containerBottomRight) {
    const defaultWidth = 48.063
    const defaultHeight = 47
    
    // Bounds
    const leftBound = minPosition[0];
    const topBound = minPosition[1];
    const bottomBound = containerBottomRight[0];
    const rightBound = containerBottomRight[1];

    // Calculate center X for the bottom group
    const centerX = leftBound + (rightBound - leftBound) / 2;

    for (let i = 0; i < moveableElements.length; i++) {
        const me = moveableElements[i];
        
        // 1. Determine which Group (0, 1, or 2) this item belongs to
        const groupIndex = Math.floor(i / spawnAmount);
        
        // 2. Determine its index inside that group (0 to 9)
        const indexInGroup = i % spawnAmount;

        // 3. Create a mini-grid offset so they don't stack on top of each other.
        // This makes a 5-wide grid (adjust '5' to change row width)
        const row = Math.floor(indexInGroup / 5); 
        const col = indexInGroup % 5;
        
        const offsetX = col * (defaultWidth * 1.1); // 1.1 adds a 10% gap
        const offsetY = row * (defaultHeight * 1.1);

        let x, y;

        switch (groupIndex) {
            case 0: // TOP LEFT
                x = leftBound + offsetX;
                y = topBound + offsetY;
                break;
            
            case 1: // TOP RIGHT
                // Start from right edge and subtract width
                // We shift left by (5 * width) to make room for the whole group
                x = (rightBound - (defaultWidth * 6)) + offsetX;
                y = topBound + offsetY;
                break;

            case 2: // BOTTOM CENTER
                // Start from center and subtract half the group's total width to center it
                x = (centerX - (defaultWidth * 2.5)) + offsetX; 
                y = (bottomBound - (defaultHeight * 3)) + offsetY;
                break;
        }

        // Apply global scroll offset if needed (standard browser behavior)
        container.appendChild(me.createElement([x + window.scrollX, y + window.scrollY]));

        // Set dimensions after placing
        const boundaries = me.element.getBoundingClientRect();
        me.width = boundaries.width;
        me.height = boundaries.height;
    }
}

export function getCounts(elements) {
    const rock = elements.filter(e => e.type === 'rock').length;
    const paper = elements.filter(e => e.type === 'paper').length;
    const scissor = elements.filter(e => e.type === 'scissor').length;

    return { rock, paper, scissor };
}