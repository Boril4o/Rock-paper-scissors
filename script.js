import { MoveableElement } from "./MoveableElement.js"
import { isOutOfBoundaries, resolveWallCollision, resolveObjectsColision, getRandomFloat } from "./helperFunctions.js"
import { RockElement } from "./rockElement.js"
import { PaperElement } from "./paperElement.js"
import { ScissorsElement } from "./scissorsElement.js"

const gameContainer = document.getElementById("play-container")
const mainContainer = document.getElementsByTagName("main")[0]

const gameContainerBounderies = gameContainer.getBoundingClientRect()

const minPosition = [gameContainerBounderies.left, gameContainerBounderies.top]
const containerBottomRightBoundaries = [gameContainerBounderies.bottom, gameContainerBounderies.right]

const moveableElements = []
mainContainer.appendChild(test.createElement([minPosition[0] + window.scrollX, minPosition[1] + window.scrollY]))
mainContainer.appendChild(test1.createElement([minPosition[0] * 2 + window.scrollX, minPosition[1] + window.scrollY]))

for (let i = 0; i < 10; i++) {
    const rockElement = new RockElement(getRandomFloat(200, 300), getRandomFloat(200, 300))

    moveableElements.push(rockElement)


}

let lastAnim = undefined

//requestAnimationFrame(runSimulation)

function runSimulation(time) {
    if (!lastAnim) {
        lastAnim = time
    }

    for (const me of a) {
        let x = me.x + me.vx * ((time - lastAnim) / 1000)
        let y = me.y + me.vy * ((time - lastAnim) / 1000)
    
        if (isOutOfBoundaries(me, minPosition, containerBottomRightBoundaries)) {
            [x, y] = resolveWallCollision(me, [x, y], minPosition, containerBottomRightBoundaries)
        }
    
        me.changePosition([x, y])
    }

    for (let i = 0; i < a.length; i++) {
        for (let j = i + 1; j < a.length; j++) {
            resolveObjectsColision(a[i], a[j])
        }
    }

    lastAnim = time
    requestAnimationFrame(runSimulation)
}

