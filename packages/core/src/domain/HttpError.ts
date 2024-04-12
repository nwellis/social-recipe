import { DomainError } from "./DomainError.js"

export class HttpError extends DomainError {

  static async fromResponse(response: Response) {
    try {
      const body = await response.json() as { error: string }
      return new HttpError(response, body.error)
    } catch (err) {
      return new HttpError(response, response.statusText)
    }
  }

  static isHttpError(error: unknown): error is HttpError {
    return error?.constructor === HttpError
  }

  static async throwIfNotOk(response: Response) {
    if (response && !response.ok) {
      throw await HttpError.fromResponse(response)
    }
  }

  get status() {
    return this.cause.status
  }

  constructor(
    public readonly cause: Response,
    message: string,
  ) {
    super(message)
    this.httpCode = cause.status ?? 500
  }
}