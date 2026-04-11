import { resolveWallCollision, resolveObjectsColision, getMovableElements, getCounts, placeMovableElements1} from "./helperFunctions.js"

//default settings
const minSpeed = 50
const maxSpeed = 100
const spawnAmount = 10

//game rules
const rules = {
    rock: 'scissor',
    paper: 'rock',
    scissor: 'paper'
}

// get the container for the elements
const gameContainer = document.getElementById("play-container")
const mainContainer = document.getElementsByTagName("main")[0]

//bondaries of the container
const gameContainerBounderies = gameContainer.getBoundingClientRect()

// min/max positons where the elements can be at
const minPosition = [gameContainerBounderies.left, gameContainerBounderies.top]
const containerBottomRightBoundaries = [gameContainerBounderies.bottom, gameContainerBounderies.right]

//get movable elements from each type by spawnAmount
const moveableElements = getMovableElements(minSpeed, maxSpeed, spawnAmount)

//place the elemenst sorted. Each element is with its type at any of the playground corners
placeMovableElements1(moveableElements, mainContainer, spawnAmount, minPosition, containerBottomRightBoundaries)

//last anim time
let lastAnim = undefined

//start game
requestAnimationFrame(runSimulation)

//appliese force to each element and checks for collison and game end
function runSimulation(time) {
    if (!lastAnim) {
        lastAnim = time
    }

    //update each element positon and check if there is collison
    for (const me of moveableElements) {
        let x = me.x + me.vx * ((time - lastAnim) / 1000)
        let y = me.y + me.vy * ((time - lastAnim) / 1000)
        
        const resolvedWallCollision = resolveWallCollision(me, [x, y], minPosition, containerBottomRightBoundaries)
    
        me.changePosition(resolvedWallCollision)
    }

    //check if there is collison between two elements and decide which one wins
    for (let i = 0; i < moveableElements.length; i++) {
        for (let j = i + 1; j < moveableElements.length; j++) {
            const me1 = moveableElements[i]
            const me2 = moveableElements[j]
            const anyColisionResolved = resolveObjectsColision(me1, me2)

            //if there is collison change the type of the losing one to the winning one
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

    //get count for each type
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

    //if there is no winner the game continues
    if (!isWinner) {
        lastAnim = time
        requestAnimationFrame(runSimulation)
    }
    
}