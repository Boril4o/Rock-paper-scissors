export function isOutOfBoundaries(movableElement, minPosition, containerBottomRight) {
    const elementBoundaries = movableElement.element.getBoundingClientRect()

    const maxPosition = [containerBottomRight[1] - elementBoundaries.width,
        containerBottomRight[0] - elementBoundaries.height]

    if (elementBoundaries.top >= minPosition[1] 
        && elementBoundaries.left >= minPosition[0]
        && elementBoundaries.bottom <= maxPosition[1]
        && elementBoundaries.right <= maxPosition[0]
    ) {
        return false
    }

    return true
}

export function resolveWallCollision(movableElement, newPosition, minPosition, containerBottomRight) {
    const elementBoundaries = movableElement.element.getBoundingClientRect()
    
    const maxPosition = [containerBottomRight[1] - elementBoundaries.width,
    containerBottomRight[0] - elementBoundaries.height]

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
    const rect1 = me1.element.getBoundingClientRect();
    const rect2 = me2.element.getBoundingClientRect();

    const center1X = me1.x + rect1.width / 2;
    const center1Y = me1.y + rect1.height / 2;
    const center2X = me2.x + rect2.width / 2;
    const center2Y = me2.y + rect2.height / 2;

    const dx = center1X - center2X;
    const dy = center1Y - center2Y;

    const minWidth = (rect1.width / 2) + (rect2.width / 2);
    const minHeight = (rect1.height / 2) + (rect2.height / 2);

    if (Math.abs(dx) < minWidth && Math.abs(dy) < minHeight) {
        
        const overlapX = minWidth - Math.abs(dx);
        const overlapY = minHeight - Math.abs(dy);

        if (overlapX < overlapY) {
            me1.vx *= -1; 
            me2.vx *= -1;
        } else {
            me1.vy *= -1;
            me2.vy *= -1;
        }
    }
}

function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}