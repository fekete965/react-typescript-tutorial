import { Equal, Expect } from "../helpers/type-utils";

const BACKEND_TO_FRONTEND_STATUS_MAP = {
  0: "pending",
  1: "success",
  2: "error",
} as const;

type BackendToFrontendStatusMap = typeof BACKEND_TO_FRONTEND_STATUS_MAP;

type BackendStatus = keyof BackendToFrontendStatusMap;
type FrontendStatus = BackendToFrontendStatusMap[BackendStatus];

type test = [
  Expect<Equal<BackendStatus, 0 | 1 | 2>>,
  Expect<Equal<FrontendStatus, "pending" | "success" | "error">>
];
