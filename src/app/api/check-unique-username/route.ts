import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";
import { userNameValidarion } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
  username: userNameValidarion,
});

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get("username"),
    };

    // validation with zod

    const result = UsernameQuerySchema.safeParse(queryParam);
    console.log(result);

    if (!result.success) {
      const usernameError = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameError?.length > 0
              ? usernameError.join(", ")
              : "Invalid query parameters",
        },
        { status: 400 }
      );
    }

    const { username } = result.data;

    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Username is taken",
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Username is available",
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error checikng username.");
    return Response.json(
      {
        success: false,
        message: "Error checikng username.",
      },
      { status: 500 }
    );
  }
}