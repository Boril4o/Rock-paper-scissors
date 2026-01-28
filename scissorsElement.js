import { MoveableElement } from "./MoveableElement";

export class ScissorsElement extends MoveableElement {
    constructor(initialVX, initialVY) {
        super(initialVX, initialVY)

        this.emoji = '✂️'
    }
}