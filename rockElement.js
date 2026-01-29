import { MoveableElement } from "./MoveableElement.js";

export class RockElement extends MoveableElement {
    constructor(initialVX, initialVY) {
        super(initialVX, initialVY)

        this.emoji = '🪨'
        this.type = 'rock'
    }
}