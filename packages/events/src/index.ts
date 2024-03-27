import { PostEvents } from '@acme/core'
import { useKafkaStore } from './index.js'

export * from './providers/index.js'

export const usePostEvents = (groupId: string) => useKafkaStore<PostEvents.All>(groupId, 'posts', 'postId')