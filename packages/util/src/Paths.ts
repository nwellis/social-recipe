export const lastPathSegment = (path: string) => `/${path.split("/").at(-1) ?? ""}`

export const joinPaths = (...segements: string[]) => {
  const split = segements.filter(Boolean).join("/").split("://")
  const [protocol, hostAndPath] = split.length > 1 ? split : ["", split[0]]

  return [
    protocol,
    hostAndPath.split("/").filter(Boolean).join("/")
  ].filter(Boolean).join("://")
}