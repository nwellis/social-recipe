import type { Command } from "./Command.js";
import type { Event } from "./Event.js";
import { Evolver } from "./Evolver.js";

/**
 * Pattern for organizing business logic in event sourcing…
 * 
 * - `decide` given the state and a command, returns the resulting events
 * - `evolve` given the current state and an event, returns the new state
 * - `getInitialState` returns the initial state
 */
export type Decider<
  State,
  CommandType extends Command,
  EventType extends Event
> = {
  decide: (command: CommandType, state: State, when?: number) => EventType[];
} & Evolver<State, EventType>;