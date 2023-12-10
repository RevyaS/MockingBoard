import { KonvaEventObject } from "konva/lib/Node";

export function ExtractEventData<Type>(ev: KonvaEventObject<any>) {
	return ev.evt.detail as Type;
}