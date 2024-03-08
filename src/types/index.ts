import { z } from "zod";

export type RequestContentLocation = "body" | "params" | "query";

export type BaseResponseBodySuccessful<T> = {
  success: true;
  result: T;
  error: null;
};

export type BaseResponseBodyFailure<T> = {
  success: false;
  result: null;
  error: T;
};
