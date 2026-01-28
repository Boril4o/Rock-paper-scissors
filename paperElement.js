import { MoveableElement } from "./MoveableElement";

export class PaperElement extends MoveableElement {
    constructor(initialVX, initialVY) {
        super(initialVX, initialVY)

        this.emoji = '📝'
    }
}