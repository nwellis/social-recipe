import type {
  Adapter,
  DatabaseSession,
  RegisteredDatabaseSessionAttributes,
  DatabaseUser,
  RegisteredDatabaseUserAttributes
} from "lucia";
import { Collection } from "mongodb";

interface UserDoc extends RegisteredDatabaseUserAttributes {
  _id: string;
  __v?: any;
}

interface SessionDoc extends RegisteredDatabaseSessionAttributes {
  _id: string;
  __v?: any;
  userId: string;
  expiresAt: Date;
}

/**
 * @see https://github.com/lucia-auth/lucia/blob/main/packages/adapter-mongodb/src/index.ts
 */
export class LuciaMongoDatabaseAdapter implements Adapter {
  private Session: Collection<SessionDoc>;
  private User: Collection<UserDoc>;

  constructor(Session: Collection<SessionDoc>, User: Collection<UserDoc>) {
    this.Session = Session;
    this.User = User;
  }

  public async deleteSession(sessionId: string): Promise<void> {
    await this.Session.findOneAndDelete({ _id: sessionId });
  }

  public async deleteUserSessions(userId: string): Promise<void> {
    await this.Session.deleteMany({ userId });
  }

  public async getSessionAndUser(
    sessionId: string
  ): Promise<[session: DatabaseSession | null, user: DatabaseUser | null]> {
    // await necessary for mongoose
    const cursor = await this.Session.aggregate([
      { $match: { _id: sessionId } },
      {
        $lookup: {
          from: this.User.collectionName,
          localField: "userId",
          // relies on _id being a String, not ObjectId.
          foreignField: "_id",
          as: "userDocs"
        }
      }
    ]);
    const sessionUsers = await cursor.toArray();

    const sessionUser = sessionUsers?.at(0) ?? null;
    if (!sessionUser) return [null, null];

    const { userDocs, ...sessionDoc } = sessionUser;
    const userDoc = userDocs?.at(0) ?? null;
    if (!userDoc) return [null, null];

    const session = transformIntoDatabaseSession(sessionDoc as SessionDoc);
    const user = transformIntoDatabaseUser(userDoc);
    return [session, user];
  }

  public async getUserSessions(userId: string): Promise<DatabaseSession[]> {
    const sessions = await this.Session.find(
      { userId },
      {
        projection: {
          // MongoDB driver doesn't use the extra fields that Mongoose does
          // But, if the dev is passing in mongoose.connection, these fields will be there
          __v: 0,
          _doc: 0
        }
      }
    ).toArray();

    return sessions.map((val) => transformIntoDatabaseSession(val));
  }

  public async setSession(session: DatabaseSession): Promise<void> {
    const value: SessionDoc = {
      _id: session.id,
      userId: session.userId,
      expiresAt: session.expiresAt,
      ...session.attributes
    };

    await this.Session.insertOne(value);
  }

  public async updateSessionExpiration(sessionId: string, expiresAt: Date): Promise<void> {
    await this.Session.findOneAndUpdate(
      { _id: sessionId },
      { $set: { expiresAt } }
    );
  }

  public async deleteExpiredSessions(): Promise<void> {
    await this.Session.deleteMany({
      expiresAt: {
        $lte: new Date()
      }
    });
  }
}

function transformIntoDatabaseUser(value: UserDoc): DatabaseUser {
  delete value.__v;
  const { _id: id, ...attributes } = value;
  return {
    id,
    attributes
  };
}

function transformIntoDatabaseSession(value: SessionDoc): DatabaseSession {
  delete value.__v;
  const { _id: id, userId, expiresAt, ...attributes } = value;
  return {
    id,
    userId,
    expiresAt,
    attributes
  };
}