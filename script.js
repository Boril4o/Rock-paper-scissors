import { resolveWallCollision, resolveObjectsColision, getMovableElements, getCounts, placeMovableElements1} from "./helperFunctions.js"

const minSpeed = 50
const maxSpeed = 100
const spawnAmount = 10

const rules = {
    rock: 'scissor',
    paper: 'rock',
    scissor: 'paper'
}

const gameContainer = document.getElementById("play-container")
const mainContainer = document.getElementsByTagName("main")[0]

const gameContainerBounderies = gameContainer.getBoundingClientRect()

const minPosition = [gameContainerBounderies.left, gameContainerBounderies.top]
const containerBottomRightBoundaries = [gameContainerBounderies.bottom, gameContainerBounderies.right]

const moveableElements = getMovableElements(minSpeed, maxSpeed, spawnAmount)
placeMovableElements1(moveableElements, mainContainer, spawnAmount, minPosition, containerBottomRightBoundaries)

let lastAnim = undefined

requestAnimationFrame(runSimulation)

function runSimulation(time) {
    if (!lastAnim) {
        lastAnim = time
    }

    for (const me of moveableElements) {
        let x = me.x + me.vx * ((time - lastAnim) / 1000)
        let y = me.y + me.vy * ((time - lastAnim) / 1000)
    
        const resolvedWallCollision = resolveWallCollision(me, [x, y], minPosition, containerBottomRightBoundaries)
    
        me.changePosition(resolvedWallCollision)
    }

    for (let i = 0; i < moveableElements.length; i++) {
        for (let j = i + 1; j < moveableElements.length; j++) {
            const me1 = moveableElements[i]
            const me2 = moveableElements[j]
            const anyColisionResolved = resolveObjectsColision(me1, me2)

            if (anyColisionResolved) {
                if (rules[me1.type] === me2.type) {
                    console.log("win")
                    me2.type = me1.type
                    me2.emoji = me1.emoji
                    me2.element.innerText = me1.emoji
                }
                else if (rules[me2.type] === me1.type) {
                    console.log("win")
                    me1.type = me2.type;
                    me1.emoji = me2.emoji
                    me1.element.innerText = me2.emoji;
                }
            }
        }
    }

    const counts = getCounts(moveableElements)
    let isWinner = false

    if (counts.rock === spawnAmount * 3) {
        alert("ROCK WINS!");
        isWinner = true
    }
    else if (counts.paper === spawnAmount * 3) {
        alert("PAPER WINS!");
        isWinner = true
    }
    else if (counts.scissor === spawnAmount * 3) {
        alert("SCISSOR WINS!");
        isWinner = true
    }

    if (!isWinner) {
        lastAnim = time
        requestAnimationFrame(runSimulation)
    }
    
}