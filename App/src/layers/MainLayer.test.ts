import MainLayer from './MainLayer';
import Vector2 from '../models/Vector2';
import Panel from '../models/Panel';

const sut = new MainLayer();

test('test getRelativePositionUnscaled Correctness', () => {
	let result = Panel.GetRelativePositionUnscaled(sut, new Vector2(818, 424.25));
	expect(result).toStrictEqual(new Vector2(578, 364.25));
});