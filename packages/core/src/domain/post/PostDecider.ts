import { assert } from "@acme/util";
import { Decider } from "../../cqrs/Decider.js";
import { Post } from "../../model/Post.js";
import { PostCommands } from "./PostCommands.js";
import { PostEvents } from "./PostEvents.js";

export const PostDecider: Decider<Post, PostCommands.All, PostEvents.All> = {
  decide: (command, state, when = Date.now()) => {

    switch (command.__type) {
      case 'PostCreate': {
        assert(!state, 'Post already exists')
        const created: PostEvents.All = {
          __type: 'PostCreated',
          postId: command.postId,
          createdAt: when,
          createdBy: command.createdBy,
          content: command.content
        }
        return [created]
      }

      case 'PostDelete': {
        assert(state, 'Post not created')
        const deleted: PostEvents.All = {
          __type: 'PostDeleted',
          postId: command.postId,
          deletedAt: when,
        }
        return [deleted]
      }

      default:
        return []
    }
  },

  evolve: (state, event) => {
    switch (event.__type) {
      case 'PostCreated': {
        return {
          _id: event.postId,
          userId: event.createdBy,
          createdAt: event.createdAt,
          deletedAt: 0,
          content: event.content
        }
      }

      case 'PostDeleted': {
        return {
          ...state,
          deletedAt: event.deletedAt
        }
      }

      default:
        return state
    }
  },

  getInitialState: () => {
    return undefined
  }
}