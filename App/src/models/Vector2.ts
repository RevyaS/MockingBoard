
class Vector2 {
	static Of(val: { x: number, y: number }) {
		return new Vector2(val.x, val.y);
	}

	constructor(public x: number, public y: number) {
	}

	updateFloored(x: number, y: number) {
		this.x = Math.floor(x);
		this.y = Math.floor(y);
	}

	floor() {
		return new Vector2(Math.floor(this.x), Math.floor(this.y));
	}

	// Method Overloading in TS sucks imo
	add(vec: Vector2): Vector2
	add(x: number, y: number): Vector2
	add(a: Vector2 | number, b?: number) {
		const { x, y } = a instanceof Vector2 ? a : { x: a, y: b! };

		return new Vector2(this.x + x, this.y + y);
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

	multiplyScalar(ratio: number) {
		return new Vector2(this.x * ratio, this.y * ratio);
	}

	clone() {
		return new Vector2(this.x, this.y);
	}
}

export default Vector2;
