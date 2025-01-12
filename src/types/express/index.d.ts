import { AuthUser } from "../user";

export {};

declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: string;
        name: string;
        email: string;
        superAdmin: boolean;
      };
    }
  }
}
