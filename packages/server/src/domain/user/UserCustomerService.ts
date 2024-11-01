import { DatabaseEntityStore, ServerEntityManaged, UserCustomer } from "@acme/core";
import mem from "mem";
import { UserCustomerStore } from "../../store/UserCustomerStore.js";
import { generateId } from "lucia";
import { OrganizationService } from "../org/OrganizationService.js";
import { FolderService } from "../folder/FolderService.js";
import { arraySet, getValueOrDefault, getValueOrDefaultTo } from '@acme/util';

export class UserCustomerService {

  static Instance = mem(() => new UserCustomerService(
    UserCustomerStore,
    OrganizationService.Instance(),
    FolderService.Instance(),
  ))

  constructor(
    protected readonly user: DatabaseEntityStore<UserCustomer>,
    protected readonly organization: OrganizationService,
    protected readonly folder: FolderService,
  ) { }

  createUserId() {
    return generateId(15);
  }

  async getUser(id: string) {
    return this.user.findOne(id, { hashedPassword: 0, __version: 0, __schema: 0 });
  }

  async createUser(payload: Omit<UserCustomer, keyof ServerEntityManaged>) {
    const user: UserCustomer = {
      ...payload,
      _id: this.createUserId(),
      __schema: 1,
      __version: 1,
      createdAt: Date.now(),
    }

    await this.user.set(user._id, user);
    const setup = await this.initialUserSetup(user);

    return { user, ...setup };
  }

  async initialUserSetup(user: UserCustomer) {
    const org = await this.organization.createOrg({
      userId: user._id,
    })

    const folder = await Promise.all([
      this.folder.createFolder({
        __type: 'UserCreatedRecipes',
        root: true,
        permanent: true,
        createdBy: 'System',

        title: 'My Recipes',
        orgId: org._id,
        entityIds: [],
        subfolderIds: [],
      }),

      this.folder.createFolder({
        __type: 'UserSavedRecipes',
        root: true,
        permanent: true,
        createdBy: 'System',

        title: 'Saved Recipes',
        orgId: org._id,
        entityIds: [],
        subfolderIds: [],
      })
    ])

    return { org, folder }
  }

  async addSavedRecipe(userId: string, tags: string[], recipeIds: string[]) {
    const user = await this.user.findOne(userId)

    const next = user.savedRecipeTagIds
    for (const tag of tags) {
      next[tag] = arraySet(
        getValueOrDefault(next, tag, []).concat(recipeIds)
      )
    }

    await this.user.patch(
      userId,
      { savedRecipeTagIds: next },
      { __version: user.__version }
    );
    return next
  }

  async removeSavedRecipe(userId: string, tags: string[], recipeIds: string[]) {
    const user = await this.user.findOne(userId)
    const removeIds = new Set(recipeIds)

    const next = user.savedRecipeTagIds
    for (const tag of tags) {
      next[tag] = next[tag]?.filter(id => !removeIds.has(id))
    }

    await this.user.patch(
      userId,
      { savedRecipeTagIds: next },
      { __version: user.__version }
    );
    return next
  }
}