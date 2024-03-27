const last = (path: string) => `/${path.split("/").at(-1) ?? ""}`

const join = (...segements: string[]) => {
  const split = segements.filter(Boolean).join("/").split("://")
  const [protocol, hostAndPath] = split.length > 1 ? split : ["", split[0]]

  return [
    protocol,
    hostAndPath.split("/").filter(Boolean).join("/")
  ].filter(Boolean).join("://")
}

export const Paths = {
  join,
  last,

  Api: {
    _V1: "/api/v1",

    Auth: {
      GitHub: "/auth/github",
    },

    UserCustomer: {
      Index: "/customer/user",
      Get: (id: string) => `/customer/user/${id}`,
    }
  },

  Web: {
    Index: "/",
    Login: "/login",
  },
} as const