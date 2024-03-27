import { describe, expect, test } from 'vitest'
import { Paths } from './Paths.js'

describe("Paths", () => {
  test("join with undefined path", () => {
    const segments = ["http://", "example.com/", undefined, "/path/to//", "//file"]
    expect(Paths.join(...segments)).toBe("http://example.com/path/to/file")
  })

  test("join with undefined host", () => {
    const segments = [undefined, "/path/to//", "//file"]
    expect(Paths.join(...segments)).toBe("path/to/file")
  })

  test("join & clean url", () => {
    const segments = ["http://", "example.com/", "/path/to//", "//file"]
    expect(Paths.join(...segments)).toBe("http://example.com/path/to/file")
  })

  test("join & clean url with origin", () => {
    const segments = ["http://example.com/", "/path/to//", "//file"]
    expect(Paths.join(...segments)).toBe("http://example.com/path/to/file")
  })

  test("join & clean url with port", () => {
    const segments = ["http://localhost:3000/", "/path/to//", "//file"]
    expect(Paths.join(...segments)).toBe("http://localhost:3000/path/to/file")
  })

  test("join no trailing host slash", () => {
    const segments = ["http://localhost:3000", "/path/to//", "//file"]
    expect(Paths.join(...segments)).toBe("http://localhost:3000/path/to/file")
  })

  test("join api route", () => {
    const segments = ["http://localhost:3000", "api/v1", "/route"]
    expect(Paths.join(...segments)).toBe("http://localhost:3000/api/v1/route")
  })
})