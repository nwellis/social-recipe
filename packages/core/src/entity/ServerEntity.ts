export interface ServerEntity {
  _id: string
}

export interface ServerEntityManaged extends ServerEntity {
  __version: number
  __schema: number
  createdAt: number
}