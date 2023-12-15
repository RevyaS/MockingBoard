
class Vector2 {
	constructor(public x: number, public y: number) {
	}

	updateFloored(x: number, y: number) {
		this.x = Math.floor(x);
		this.y = Math.floor(y);
	}

	subtract(x: number, y: number) {
		return new Vector2(this.x - x, this.y - y);
	}

	subtractVec(vec: Vector2) {
		return this.subtract(vec.x, vec.y)
	}

	divide(x: number, y: number) {
		return new Vector2(this.x / x, this.y / y);
	}

	divideVec(vec: Vector2) {
		return this.divide(vec.x, vec.y)
	}

	multiply(x: number, y: number) {
		return new Vector2(this.x * x, this.y * y);
	}

	multiplyVec(vec: Vector2) {
		return this.multiply(vec.x, vec.y)
	}

	clone() {
		return new Vector2(this.x, this.y);
	}
}

export default Vector2;
