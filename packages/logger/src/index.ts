import * as winston from 'winston';
import { ElasticsearchTransport } from 'winston-elasticsearch';

const fields = (values: Record<string, string | number>) =>
  values && Object.entries(values).map(([name, val]) => `${name}#${val ?? "NULL"}`).join("|")

export const lgm = (
  status: number,
  name: string,
  values: Record<string, string | number> = {},
) => [status, name, fields(values)].filter(Boolean).join("|")

const printStack = winston.format.printf((info) => {
  const log = `${info.level}: ${info.message}`;

  return info.stack
    ? `${log}\n${info.stack}`
    : log;
});

export type Logger = ReturnType<typeof winston["createLogger"]>;
export function mkLogger(app?: string, env?: string): Logger
export function mkLogger(app: string, env: string, cloudId: string, username: string, password: string, minLevel?: "debug" | "info" | "warn" | "error"): Logger
export function mkLogger(app?: string, env?: string, cloudId?: string, username?: string, password?: string, minLevel?: string): Logger {
  const index = `logs-${env}-${app}`

  const transports: winston.transport[] = [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.combine(
          winston.format.errors({ stack: true }),
          printStack,
        ),
      ),
    })
  ]

  if (cloudId && username && password) {
    transports.push(new ElasticsearchTransport({
      index,
      format: winston.format.json(),
      indexSuffixPattern: "YYYY.MM.DD",
      dataStream: true,
      clientOpts: {
        cloud: {
          id: cloudId
        },
        auth: {
          username,
          password
        }
      }
    }))
  }

  return winston.createLogger({
    level: minLevel || 'info',
    format: winston.format.simple(),
    defaultMeta: {
      app,
      env
    },
    transports,
  })
}