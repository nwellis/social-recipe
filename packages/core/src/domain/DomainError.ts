export class DomainError extends Error {

  private readonly _domainError = true
  httpCode = 500

  static isDomainError(error: unknown): error is DomainError {
    return error?.["_domainError"] === true
  }

  toResponseObject() {
    return {
      // code: this.code,
      error: this.message,
    }
  }
}

export class NotFoundError extends DomainError {
  httpCode = 404
}

export class BadRequestError extends DomainError {
  httpCode = 400
}

export class ConflictError extends DomainError {
  httpCode = 409
}

export class InternalDomainError extends DomainError {
  static readonly message = "We ran into an issue, please try again later."
}