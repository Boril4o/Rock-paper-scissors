import { MoveableElement } from "./MoveableElement";

export class RockElement extends MoveableElement {
    constructor(initialVX, initialVY) {
        super(initialVX, initialVY)

        this.emoji = '🪨'
    }
}