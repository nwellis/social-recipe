import { Command } from "../../cqrs/Command.js";

export namespace PostCommands {
  export type All = Create | Delete

  export type Create = Command<'PostCreate'> & {
    postId: string
    createdBy: string
    content: string
  }

  export type Delete = Command<'PostDelete'> & {
    postId: string
  }
}