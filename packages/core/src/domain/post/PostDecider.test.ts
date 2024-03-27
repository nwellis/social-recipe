import { describe, expect, test } from 'vitest'
import { PostDecider } from './PostDecider.js'
import { PostCommands } from './PostCommands.js'
import { Post } from '../../model/Post.js'
import { PostEvents } from './PostEvents.js'

describe("PostDecider", () => {

  const now = new Date(2024, 3, 11).valueOf()

  test("Create post event", () => {

    const state: Post = PostDecider.getInitialState()
    const command: PostCommands.All = { __type: "PostCreate", postId: "1", createdBy: "2", content: "Hello" }
    const events = PostDecider.decide(command, state, now)

    expect(events).toEqual<PostEvents.All[]>([
      {
        __type: "PostCreated",
        postId: "1",
        createdBy: "2",
        createdAt: now,
        content: "Hello",
      }
    ])

    const next = events.reduce(PostDecider.evolve, state)
    expect(next).toEqual<Post>({
      _id: command.postId,
      userId: command.createdBy,
      createdAt: now,
      deletedAt: 0,
      content: command.content,
    })
  })

  test("Create post event already created", () => {

    const state: Post = {
      _id: "1",
      userId: "2",
      createdAt: now,
      deletedAt: 0,
      content: "Hello",
    }
    const command: PostCommands.All = { __type: "PostCreate", postId: "1", createdBy: "2", content: "Hello" }

    expect(() => PostDecider.decide(command, state, now)).toThrowError()
  })
})