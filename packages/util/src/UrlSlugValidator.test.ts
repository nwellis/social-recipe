import { describe, expect, test } from "vitest"
import { UrlSlugValidator } from "./UrlSlugValidator.js";

/**
 * Note that the year 2023 is not a leap year.
 */
describe("UrlSlugValidator", () => {

  test("Uppercase invalid", () => {
    const sut = "InvalidSlug"
    expect(UrlSlugValidator.Business.isValid(sut)).toBe(false)
  })

  test("Spaces invalid", () => {
    const sut = "invalid slug"
    expect(UrlSlugValidator.Business.isValid(sut)).toBe(false)
  })

  test("Trailing dash invalid", () => {
    const sut = "invalid-slug-"
    expect(UrlSlugValidator.Business.isValid(sut)).toBe(false)
  })

  test("Leading dash invalid", () => {
    const sut = "-invalid-slug"
    expect(UrlSlugValidator.Business.isValid(sut)).toBe(false)
  })

  test("Underscores invalid", () => {
    const sut = "invalid_slug"
    expect(UrlSlugValidator.Business.isValid(sut)).toBe(false)
  })

  test("Special character invalid", () => {
    const sut = "invalid-slu%g-he$re"
    expect(UrlSlugValidator.Business.isValid(sut)).toBe(false)
  })

  test("Valid slug", () => {
    const sut = "valid-slug"
    expect(UrlSlugValidator.Business.isValid(sut)).toBe(true)
  })

  test("Invalid slug uppercase", () => {
    const sut = "Big-Money-Adventures-100"
    expect(UrlSlugValidator.Business.isValid(sut)).toBe(false)
  })

  test("Make slug spaces and periods", () => {
    const sut = "Peackock Adventures L.L.C."

    const slug = UrlSlugValidator.Business.mkSlug(sut)
    expect(slug).toBe("peackock-adventures-llc")
    expect(UrlSlugValidator.Business.isValid(slug)).toBe(true)
  })

  test("Make slug underscore", () => {
    const sut = "Big_Tuna"

    const slug = UrlSlugValidator.Business.mkSlug(sut)
    expect(slug).toBe("big-tuna")
    expect(UrlSlugValidator.Business.isValid(slug)).toBe(true)
  })

  test("Make slug special characters", () => {
    const sut = "** Big $MONEY$ & Adventures 100% **"

    const slug = UrlSlugValidator.Business.mkSlug(sut)
    expect(slug).toBe("big-money-adventures-100")
    expect(UrlSlugValidator.Business.isValid(slug)).toBe(true)
  })
})