import AuthTokenModel, { IAuthToken } from "../models/tokenModel";

export const findAuthTokenByEmail = async (
  email: string
): Promise<IAuthToken | null> => {
  try {
    const token: IAuthToken | null = await AuthTokenModel.findOne({ email });

    if (token) return token;
  } catch {
    return null;
  }
  return null;
};
