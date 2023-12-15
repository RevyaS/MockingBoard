import MainLayer from './MainLayer';
import Vector2 from '../models/Vector2';

const sut = new MainLayer();

test('test getRelativePositionUnscaled Correctness', () => {
	let result = sut.getRelativePositionUnscaled(new Vector2(818, 424.25));
	expect(result).toStrictEqual(new Vector2(578, 364.25));
});