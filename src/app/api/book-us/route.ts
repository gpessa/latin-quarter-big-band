import { BookUsFormData } from "@/app/[locale]/(home)/components/BookUs";
import { resolveLocale } from "@/sanity/localeConfig";
import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing email configuration" },
      { status: 500 }
    );
  }

  const { name, email, phone, message, locale }: BookUsFormData & {
    locale?: string;
  } = await req.json();
  const resend = new Resend(apiKey);
  const lang = resolveLocale(locale);

  const html = `
    <!DOCTYPE html>
    <html lang="${lang}">
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
    const { emails } = await client.fetch(
      `*[_type == "general"][0]{
        emails
      }`
    );

    const data = await resend.emails.send({
      from: "info@latinquarterbigband.com",
      to: emails,
      subject: `Book Us - Request from ${name}`,
      html,
    });

    console.error("data", data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json({ error });
  }
}
