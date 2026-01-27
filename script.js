import { MoveableElement } from "./MoveableElement.js"

const gameContainer = document.getElementById("play-container")
const mainContainer = document.getElementsByTagName("main")[0]

const gameContainerBounderies = gameContainer.getBoundingClientRect()

const containerTopLeft = [gameContainerBounderies.left, gameContainerBounderies.top]
const containerBottomRight = [gameContainerBounderies.right, gameContainerBounderies.bottom]

const test = new MoveableElement(10, 10)
mainContainer.appendChild(test.createElement([containerTopLeft[0] + window.scrollX, containerTopLeft[1] + window.scrollY]))

function isOutOfBoundaries(movableElement) {
    const elementBoundaries = movableElement.element.getBoundingClientRect()

    if (elementBoundaries.top >= containerTopLeft[1] 
        && elementBoundaries.left >= containerTopLeft[0]
        && elementBoundaries.bottom <= containerBottomRight[1]
        && elementBoundaries.right <= containerBottomRight[0]
    ) {
        return false
    }

    return true
}