import { ServerEntityManaged } from '../entity/ServerEntity.js';
import { FileMetadata } from './FileMetadata.js';

export interface OrgFileMetadata extends ServerEntityManaged, FileMetadata {
  orgId: string
}