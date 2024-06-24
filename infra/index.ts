import * as pulumi from "@pulumi/pulumi";
import * as digitalocean from "@pulumi/digitalocean";

const bucket = new digitalocean.SpacesBucket("nwellis-recipes", {
    name: "nwellis-recipes",
    region: digitalocean.Region.NYC3,
});

export const bucketName = bucket.id;

