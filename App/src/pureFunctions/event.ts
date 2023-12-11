import { KonvaEventObject, Node } from "konva/lib/Node";

export const ExtractEventData = <Type>(ev: KonvaEventObject<any>) => ev.evt.detail as Type;

export const GenerateEventFire =
	<T>(konvaNode: Node) => (eventName: string) =>
		(data: T) => konvaNode.fire(eventName, { evt: new CustomEvent(eventName, { detail: data }) });