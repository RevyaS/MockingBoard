import MainLayer from "../layers/MainLayer";
import Page from "../shapes/Page";
import Vector2 from "./Vector2";

class Panel {
	static Of(object: Page | MainLayer) {
		return new Panel(object.position, object.size, object.origSize);
	}

	static GetRelativePositionUnscaled(object: Page | MainLayer, mousePosition: Vector2) {
		return this.Of(object).GetRelativePositionUnscaled(mousePosition);
	}

	GetRelativePositionUnscaled(mousePosition: Vector2) {
		return mousePosition.subtractVec(this.position)
			.divideVec(this.size)
			.multiplyVec(this.origSize);
	}

	constructor(public position: Vector2, public size: Vector2, public origSize: Vector2) {
	}
}

export default Panel;