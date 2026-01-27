export class MoveableElement {
    constructor(initialVX, initialVY) {
        this.vx = initialVX
        this.vy = initialVY
    }

    createElement(startPosition) {
        this.x = startPosition[0]
        this.y = startPosition[1]

        this.element = document.createElement("p")

        this.element.innerText = "🪨"
        this.element.style.position = "absolute"
        this.element.style.left = `${this.x}px`
        this.element.style.top = `${this.y}px`
        this.element.style.right = "auto"
        this.element.style.bottom = "auto"
        this.element.style.margin = `${0}px`

        return this.element
    }

    changePosition(newPosition) {
        this.x = newPosition[0]
        this.y = newPosition[1]

        this.element.style.left = `${this.x}px`
        this.element.style.top = `${this.y}px`
    }
}