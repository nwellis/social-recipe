import type { Command } from "./Command.js";
import type { Decider } from "./Decider.js";
import type { Event } from "./Event.js";

// TODO: https://event-driven.io/en/type_script_node_Js_event_sourcing/

// export class CommandHandler<
//   State,
//   TCommand extends Command,
//   TEvent extends Event,
//   TStore,
// > {

//   constructor(
//     private getEventStore: () => TStore,
//     private toStreamId: (recordId: string) => string,
//     private decider: Decider<State, TCommand, TEvent>
//   ) {}

//   async handle(
//     recordId: string,
//     command: TCommand,
//     eTag: ETag | undefined = undefined
//   ) {
//     const eventStore = this.getEventStore();

//     const streamId = this.toStreamId(recordId);
//     const events = await readStream<TEvent>(eventStore, streamId);

//     const state = events.reduce<State>(
//       this.decider.evolve,
//       this.decider.getInitialState()
//     );

//     const newEvents = this.decider.decide(command, state);

//     return appendToStream(eventStore, streamId, eTag, ...newEvents);
//   }
// }

// export const CommandHandler =
//   <State, CommandType extends Command, EventType extends Event>(
//     getEventStore: () => EventStoreDBClient,
//     toStreamId: (recordId: string) => string,
//     decider: Decider<State, CommandType, EventType>
//   ) =>
//   async (
//     recordId: string,
//     command: Command,
//     eTag: ETag | undefined = undefined
//   ): Promise<AppendResult> => {
//     const eventStore = getEventStore();

//     const streamId = toStreamId(recordId);
//     const events = await readStream<EventType>(eventStore, streamId);

//     const state = events.reduce<State>(
//       decider.evolve,
//       decider.getInitialState()
//     );

//     const newEvents = decider.decide(command, state);

//     const toAppend = Array.isArray(newEvents) ? newEvents : [newEvents];

//     return appendToStream(eventStore, streamId, eTag, ...toAppend);
//   };