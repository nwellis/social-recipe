import { Decider } from "./Decider.js";
import { Event } from "./Event.js";
import { EventStore, StreamSubscription } from "./EventStore.js";
import { Evolver } from "./Evolver.js";

export class EventProjection<TEvent extends Event, TState> {

    readonly aggregates = new Map<string, TState>()
    private subscription: Promise<StreamSubscription>

    constructor(
        private readonly store: EventStore<TEvent>,
        private readonly getAggregateId: (event: TEvent) => string,
        private readonly evolver: Evolver<TState, TEvent>,
    ) {
        this.subscription = this.store.observeStream((_ctx, event) => {
            const id = this.getAggregateId(event) 
            const current = this.aggregates.get(id) ?? this.evolver.getInitialState()
            this.aggregates.set(id, this.evolver.evolve(current, event))
        })
    }

    stop() {
        if (!this.subscription) return

        const stopping = this.subscription
            ?.then(sub => sub.stop())
            .catch(console.error)

        this.subscription = undefined
        return stopping
    }
}