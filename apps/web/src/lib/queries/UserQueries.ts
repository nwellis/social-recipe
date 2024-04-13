import { queryOptions } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";

export const querySelf = queryOptions({
  queryKey: ['user-self'],
  queryFn: () => ApiClient.user.getSelf.query(),
})

export const queryUser = (userId: string) => queryOptions({
  queryKey: ['user', userId],
  queryFn: () => ApiClient.user.getUser.query(userId),
})