import { findUserByEmail } from "@/db/queries/userQueries";

import { responseData } from "@/lib/responseHelper";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ email: string }> }
) => {
  try {
    const { email } = await params;

    const user = await findUserByEmail(email);

    return responseData(200, true, "Data fetched", user);
  } catch (error) {
    return responseData(400, false, "An error occurred", undefined, error);
  }
};
