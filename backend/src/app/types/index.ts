// user types

export enum userRole {
  user = "user",
  seller = "seller",
  superAdmin = "super_admin",
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export type DecodedToken = {
  id: string;
  name: string;
  email: string;
  role: userRole;
  iat: Date;
  exp: Date;
};

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};
