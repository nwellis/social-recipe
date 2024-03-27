import { Event } from "./Event.js";

export type StreamSubscription = {
    stop(): Promise<void>
}

export type AppendStreamResult = {
    successful: true
} | {
    successful: false
    error: Error
}

export interface EventStore<
    TEvent extends Event,
    TReadContext = {},
> {
    observeStream(onEvent: (ctx: TReadContext, event: TEvent) => void): Promise<StreamSubscription>
    appendToStream(...events: TEvent[]): Promise<AppendStreamResult>
}