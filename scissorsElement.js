import { MoveableElement } from "./MoveableElement.js";

export class ScissorsElement extends MoveableElement {
    constructor(initialVX, initialVY) {
        super(initialVX, initialVY)

        this.emoji = '✂️'
        this.type = 'scissor'
    }
}