
class Vector2 {
	constructor(public x: number, public y: number) {

	}

	updateFloored(x: number, y: number) {
		this.x = Math.floor(x);
		this.y = Math.floor(y);
	}
}

export default Vector2;
