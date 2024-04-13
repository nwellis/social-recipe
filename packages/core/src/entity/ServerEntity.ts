export type ServerEntity = {
  _id: string
}

export interface ServerEntityManaged extends ServerEntity {
  __version: number
  __schema: number
  createdAt: number
}

export type OrphanEntity<T, K extends keyof T> = T & { [P in K]: typeof OrphanEntityId }
export const OrphanEntityId = "ORPHAN" as const

export function isEntityOrphan<T extends ServerEntity, K extends keyof T>(ownerId: K, entity: T): entity is OrphanEntity<T, K> {
  return entity[ownerId] === OrphanEntityId
}