export interface HttpGet<
  Response,
  Query extends Record<string, unknown> = never,
> {
  Response: Response;
  Query: Query;
}

export interface HttpGetWithRequest<
  Request,
  Response,
  Query extends Record<string, unknown> = never,
> extends HttpGet<Response, Query> {
  Request: Request;
}