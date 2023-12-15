import Page from './Page';
import Vector2 from '../models/Vector2';


test('test mouseBounds Correctness', () => {
	const sut = new Page(new Vector2(45, 50), new Vector2(50, 50), 0);
	let result = sut.getMouseBoundsData({ x: 25, y: -40 });
	expect(result.topBounds.y).toBe(true);
});

test('test getRelativePositionUnscaled Correctness', () => {
	const sut = new Page(new Vector2(0, 0), new Vector2(890, 208), 0);

	let result = sut.getRelativePositionUnscaled(new Vector2(318.698072363041, 14.308893044871212));
	expect(result).toStrictEqual(new Vector2(318.698072363041, 14.308893044871212));
});