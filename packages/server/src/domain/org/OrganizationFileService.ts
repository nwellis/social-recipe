import { DatabaseEntityStore, OrgFileMetadata, S3FileStoreWithUpload, ServerEntityManaged } from "@acme/core";
import mem from "mem";
import { generateId } from "lucia";
import { OrgFileMetadataStore } from '../../store/OrgFileMetadataStore.js';
import { DOS3FileStore } from '../../store/DOS3FileStore.js';

export class OrganizationFileService {

  static Instance = mem(() => new OrganizationFileService(
    DOS3FileStore.Instance(),
    OrgFileMetadataStore),
  )

  constructor(
    protected readonly s3: S3FileStoreWithUpload<string>,
    protected readonly file: DatabaseEntityStore<OrgFileMetadata>,
  ) { }

  createId() {
    return generateId(15);
  }

  async getOrgFileMetadata(id: string) {
    return this.file.findOne(id);
  }

  async getOrgFileMetadatas(query: { orgId: string }) {
    const usersOrgs = await this.file.allWithOwner(query.orgId)
    return usersOrgs.slice().sort((a, b) => a.createdAt - b.createdAt)
  }

  async createOrgFileMetadata(payload: Omit<OrgFileMetadata, keyof ServerEntityManaged | "url">) {
    const _id = this.createId();

    const { presignedUrl } = await this.s3.createUploadUrl(
      `org/${payload.orgId}/files/${_id}`,
      { acl: 'public-read' },
    )

    const metadata: OrgFileMetadata = {
      ...payload,
      _id,
      __schema: 1,
      __version: 1,
      createdAt: Date.now(),
      url: presignedUrl,
    }

    await this.file.set(metadata._id, metadata);

    return metadata;
  }

  async deleteOrgFile(id: string) {
    await this.s3.delete(id)
    return this.file.delete(id)
  }
}