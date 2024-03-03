import { StatusCode } from "hono/utils/http-status";

class HttpRequestError extends Error {
  public status: StatusCode;
  public message: string;

  constructor(status: StatusCode, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export default HttpRequestError;