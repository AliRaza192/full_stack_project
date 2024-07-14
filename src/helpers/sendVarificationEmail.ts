import { resend } from "@/lib/resend";
import VarificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function SendVarificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Message App || Verification code",
      react: VarificationEmail({ username, otp: verifyCode }),
    });
    return { success: true, message: "Varification email send Successfully." };
  } catch (emailError) {
    console.error("Error sending varification email", emailError);
    return { success: false, message: "Failed to send varification email." };
  }
}
