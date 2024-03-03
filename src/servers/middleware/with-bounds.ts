import { type MiddlewareHandler } from "hono";
import { HTTPException } from "hono/http-exception";
import { IClusterRequestPayload } from "../interfaces";

const withBounds = (): MiddlewareHandler => {
  return async (c, next) => {
    const { bounds } = await c.req.json<IClusterRequestPayload>();

    if (!bounds)
      throw new HTTPException(400, { message: "bounds is required" });
    if (
      !bounds.northEast ||
      !bounds.southWest ||
      !bounds.northEast.length ||
      !bounds.southWest.length
    ) {
      throw new HTTPException(400, {
        message: "bounds must contain northEast and southWest",
      });
    }

    return next();
  };
};

export default withBounds;
