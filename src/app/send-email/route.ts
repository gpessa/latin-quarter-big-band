import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend("re_EkwBbKAS_DmG4kzawzjwSQ1cD6J2LKaZz"); //"process.env.RESEND_API_KEY"

export async function GET(req: Request) {
  //   const body = await req.json();

  try {
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>", // works in dev without DNS
      to: ["nomeecognome@gmail.com"], // where to receive the test
      subject: "Test email from Resend",
      html: `<p><strong>Name:</strong>`,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}
