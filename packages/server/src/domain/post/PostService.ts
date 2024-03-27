import { EventProjection, PostCommands, PostDecider, PostEvents } from "@acme/core";
import mem from "mem";
import { usePostEvents } from "../../../../events/dist/index.js";


export class PostService {
    static Instance = mem(() => new PostService())

    private eventStore = usePostEvents("post-service")
    private projection = new EventProjection(
        this.eventStore,
        (event) => event.postId,
        PostDecider,
    )

    send(command: PostCommands.All) {
        return this.eventStore.appendToStream(
            ...PostDecider.decide(command, this.read(command.postId), Date.now()),
        )
    }

    async create(content: string) {
        await this.eventStore.appendToStream({
            postId: "123",
            __type: "PostCreated",
            content,
            createdAt: Date.now(),
            createdBy: "me",
        })
    }

    async delete(postId: string) {
        await this.eventStore.appendToStream({
            postId,
            __type: "PostDeleted",
            deletedAt: Date.now(),
        })
    }

    read(postId: string) {
        return this.projection.aggregates.get(postId)
    }
}