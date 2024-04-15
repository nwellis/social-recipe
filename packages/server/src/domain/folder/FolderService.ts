import { DatabaseEntityStore, Folder, ServerEntityManaged } from "@acme/core";
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

  async getFolders(query: { orgId: string }) {
    return this.folder.allWithOwner(query.orgId)
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