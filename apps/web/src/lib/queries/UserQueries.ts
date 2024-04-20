import { queryOptions } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import ms from 'ms';

export const querySelf = queryOptions({
  queryKey: ['user-self'],
  queryFn: () => ApiClient.user.getSelf.query(),
  staleTime: ms('1h'),
})

export const queryUser = (userId: string) => queryOptions({
  queryKey: ['user', userId],
  queryFn: () => ApiClient.user.getUser.query(userId),
  staleTime: ms('15m'),
})