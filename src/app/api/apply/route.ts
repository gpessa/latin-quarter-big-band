import { JoinTheBandFormData } from "@/app/(home)/components/JoinTheBand";
import { EMAILS, LANG } from "@/contants";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, phone, message, position }: JoinTheBandFormData =
    await req.json();

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
            <td><strong>Position</strong></td>
            <td>${position}</td>
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
      from: "info@latinquarterbigband.com",
      to: "info@latinquarterbigband.com",
      subject: `Join The Band - Request from ${name}`,
      html,
    });

    console.error("data", data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json({ error });
  }
}
