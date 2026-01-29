import { MoveableElement } from "./MoveableElement.js";

export class PaperElement extends MoveableElement {
    constructor(initialVX, initialVY) {
        super(initialVX, initialVY)

        this.emoji = '📝'
        this.type = 'paper'
    }
}