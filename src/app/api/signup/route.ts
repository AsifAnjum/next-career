import { NextRequest } from "next/server";
import { responseData } from "@/lib/responseHelper";
import UserModel from "@/db/models/userModel";
import dbConnect from "@/db/dbConnect";

export const POST = async (request: NextRequest) => {
  await dbConnect();
  const { name, email, password, gender } = await request.json();

  if (!name || !password || !email || !gender) {
    return responseData(400, false, "Please fill all fields");
  }

  try {
    const isUserExist = await UserModel.findOne({ email });

    if (isUserExist) {
      return responseData(
        409,
        false,
        `An account with -> ${email} <- already exists`
      );
    } else {
      const newUser = {
        name,
        email,
        password,
        gender,
      };

      await UserModel.create(newUser);

      return responseData(201, true, `User ${name} has been created`);
    }
  } catch (error: any) {
    return responseData(400, false, "Error creating user", undefined, error);
  }
};
