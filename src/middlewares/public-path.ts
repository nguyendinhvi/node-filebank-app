import Urlpattern from "url-pattern";

export const publicPaths = [
  new Urlpattern("POST@/v1/auth/login"),
  new Urlpattern("POST@/v1/auth/register"),
  // new Urlpattern("GET@/v1/auth/"),
];
