import { ServerEnv } from '@acme/server-env';
import { mkLogger } from '@acme/logger';

export const Logger = mkLogger("Events", ServerEnv.NodeEnv)