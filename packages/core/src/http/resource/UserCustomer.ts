import { UserCustomer as Model } from "../../index.js";
import { HttpGet } from "../HttpGet.js";

declare global {
  namespace HttpResourceV1 {
    interface UserCustomer {
      Get: HttpGet<Model>;
    }
  }
}