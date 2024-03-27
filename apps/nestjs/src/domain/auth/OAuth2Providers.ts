import { Paths } from "@acme/core";
import { ServerEnv } from "@acme/server-env";
import { Injectable } from "@nestjs/common";
import { GitHub } from "arctic";

@Injectable()
export class OAuth2Providers {
    readonly gitHub = new GitHub(
        ServerEnv.OAuth.GitHub.ClientID,
        ServerEnv.OAuth.GitHub.ClientSecret,
        {
            redirectURI: Paths.join(ServerEnv.Origin.Api, Paths.Api._V1, Paths.Api.Auth.GitHub, "callback")
        }
    )
}