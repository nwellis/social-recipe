export class UrlSlugError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "Slug Error"
  }
}

export class UrlSlugValidator {

  static Business = new UrlSlugValidator()
    .setMaxLength(24)

  private _maxLength = 32
  get maxLength() { return this._maxLength }
  private _regex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  get regex() { return this._regex }

  setMaxLength(value: number) {
    this._maxLength = Math.max(0, value)
    return this
  }

  matcher(value: RegExp) {
    this._regex = value
    return this
  }

  validateSlug(slug = ""): UrlSlugError[] {
    const errors: UrlSlugError[] = []

    if (slug.length === 0) errors.push(new UrlSlugError("Must not be empty"))
    if (slug.length > this._maxLength) errors.push(new UrlSlugError(`Must be no more than ${this._maxLength} characters`))
    if (!this._regex.test(slug)) errors.push(new UrlSlugError("Must only contain lowercase letters, numbers, and hyphens"))

    return errors
  }

  isValid(slug: string) {
    return this.validateSlug(slug).length === 0
  }

  mkSlug(text: string) {
    if (!text) return ""
    // Eventually I gave up, this is from the internet
    const slug = text
      .normalize('NFKD')            // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
      .toLowerCase()                // Convert the string to lowercase letters
      .trim()                       // Remove whitespace from both sides of a string (optional)
      .replace(/\s+/g, '-')         // Replace spaces with -
      .replace(/[^\w-]+/g, '')      // Remove all non-word chars
      .replace(/_/g, '-')           // Replace _ with -
      .replace(/--+/g, '-')         // Replace multiple - with single -
      .replace(/-$/g, '')           // Remove trailing -
      .split("-")
      .filter(Boolean)
      .join("-")

    return slug
  }

  // mkSlug(text: string) {
  //   const slug = text.toLowerCase()
  //     .trim()
  //     .replace(/[^\w ]+/g, "")
  //     .replace(/\s+/g, "-")
  //     .split("-")
  //     .filter(Boolean)
  //     .join("-")

  //   return slug
  // }
}