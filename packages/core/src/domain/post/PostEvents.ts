import { Event } from "../../cqrs/Event.js";

export namespace PostEvents {
  export type All = Created | Deleted

  export type Created = Event<'PostCreated'> & {
    postId: string
    createdAt: number
    createdBy: string
    content: string
  }

  export type Deleted = Event<'PostDeleted'> & {
    postId: string
    deletedAt: number
  }
}