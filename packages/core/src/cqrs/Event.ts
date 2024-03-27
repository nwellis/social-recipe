export type Event<EventType extends string = string> = {
  __type: EventType;
}