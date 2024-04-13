import { describe, expect, test } from 'vitest'
import { joinPaths } from './Paths.js'

describe("Paths", () => {
  test("join with undefined path", () => {
    const segments = ["http://", "example.com/", undefined, "/path/to//", "//file"]
    expect(joinPaths(...segments)).toBe("http://example.com/path/to/file")
  })

  test("join with undefined host", () => {
    const segments = [undefined, "/path/to//", "//file"]
    expect(joinPaths(...segments)).toBe("path/to/file")
  })

  test("join & clean url", () => {
    const segments = ["http://", "example.com/", "/path/to//", "//file"]
    expect(joinPaths(...segments)).toBe("http://example.com/path/to/file")
  })

  test("join & clean url with origin", () => {
    const segments = ["http://example.com/", "/path/to//", "//file"]
    expect(joinPaths(...segments)).toBe("http://example.com/path/to/file")
  })

  test("join & clean url with port", () => {
    const segments = ["http://localhost:3000/", "/path/to//", "//file"]
    expect(joinPaths(...segments)).toBe("http://localhost:3000/path/to/file")
  })

  test("join no trailing host slash", () => {
    const segments = ["http://localhost:3000", "/path/to//", "//file"]
    expect(joinPaths(...segments)).toBe("http://localhost:3000/path/to/file")
  })

  test("join api route", () => {
    const segments = ["http://localhost:3000", "api/v1", "/route"]
    expect(joinPaths(...segments)).toBe("http://localhost:3000/api/v1/route")
  })

  test("join api route 2", () => {
    const segments = ["http://localhost:3001", "api/v1/auth/github/callback"]
    expect(joinPaths(...segments)).toBe("http://localhost:3001/api/v1/auth/github/callback")
  })
})