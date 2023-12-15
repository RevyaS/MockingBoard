import Page from './Page';
import Vector2 from '../models/Vector2';

const sut = new Page(new Vector2(45, 50), new Vector2(50, 50), 0);

test('test mouseBounds Correctness', () => {
	let result = sut.getMouseBoundsData({ x: 25, y: -40 });
	expect(result.topBounds.y).toBe(true);
});