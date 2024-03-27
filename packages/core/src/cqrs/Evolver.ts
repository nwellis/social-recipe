import type { Event } from "./Event.js";

/**
 * Pattern for organizing business logic in event sourcing…
 * 
 * - `evolve` given the current state and an event, returns the new state
 * - `getInitialState` returns the initial state
 */
export type Evolver<
  State,
  EventType extends Event
> = {
  evolve: (currentState: State, event: EventType) => State;
  getInitialState: () => State;
};