import { mkLogger } from '@acme/logger';
import { ServerEnv } from '@acme/server-env';

export const Logger = mkLogger("Server", ServerEnv.NodeEnv)