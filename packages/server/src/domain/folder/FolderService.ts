import { DatabaseEntityStore, Folder, FolderType, ServerEntityManaged } from "@acme/core";
import mem from "mem";
import { generateId } from "lucia";
import { FolderStore } from "../../store/FolderStore.js";

export class FolderService {

  static Instance = mem(() => new FolderService(FolderStore))

  constructor(
    protected readonly folder: DatabaseEntityStore<Folder>,
  ) { }

  createId() {
    return generateId(15);
  }

  async getFolder(id: string) {
    return this.folder.findOne(id);
  }

  async getOrganizationFolders(orgId: string) {
    return this.folder.allWithOwner(orgId)
  }

  async searchFolders(query: {
    orgId: string,
    type?: FolderType,
    root?: boolean,
    permanent?: boolean,
  }) {
    return this.folder.searchWithOwner(query.orgId, {
      $and: [
        query.type && { __type: query.type },
        query.root && { root: query.root },
        query.permanent && { permanent: query.permanent },
      ].filter(Boolean)
    })
  }

  async createFolder(payload: Omit<Folder, keyof ServerEntityManaged>) {
    const folder: Folder = {
      ...payload,
      _id: this.createId(),
      __schema: 1,
      __version: 1,
      createdAt: Date.now(),
    }

    await this.folder.set(folder._id, folder);

    return folder;
  }

  async deleteFolder(id: string) {
    return this.folder.delete(id)
  }
}