import { BookUsFormData } from "@/app/(home)/components/BookUs";
import { LANG } from "@/contants";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, phone, message }: BookUsFormData = await req.json();

  const html = `
    <!DOCTYPE html>
    <html lang=${LANG}>
      <body>
        <table>
          <tr>
            <td><strong>Name</strong></td>
            <td>${name}</td>
          </tr>
          <tr>
            <td><strong>Email</strong></td>
            <td>${email}</td>
          </tr>
          <tr>
            <td><strong>Phone</strong></td>
            <td>${phone}</td>
          </tr>
          <tr>
            <td><strong>Message</strong></td>
            <td>${message}</td>
          </tr>
        </table>
      </body>
    </html>
  `;

  try {
    const data = await resend.emails.send({
      from: `Latin Quarter Big Band <onboarding@resend.dev>`, // works in dev without DNS
      to: ["nomeecognome@gmail.com"], // where to receive the test
      subject: `Book Us Request from ${name}`,
      html,
    });

    console.error("data", data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json({ error });
  }
}
