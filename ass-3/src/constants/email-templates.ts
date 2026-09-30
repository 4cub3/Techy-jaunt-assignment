export const registerEmailTemplate = (
  name: string,
  link: string,
  expires: string,
): string => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Verify your email</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f5f7; font-family:'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f5f7; padding:40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background-color:#111827; padding:28px 32px; text-align:center;">
              <span style="color:#ffffff; font-size:20px; font-weight:600; letter-spacing:0.5px;">
                Event Management
              </span>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 32px 24px;">
              <h1 style="margin:0 0 16px; font-size:22px; color:#111827; font-weight:600;">
                Confirm your email address
              </h1>
              <p style="margin:0 0 24px; font-size:15px; line-height:1.6; color:#4b5563;">
                Hi ${name},<br><br>
                Thanks for signing up for Event Management. Please confirm this is your email address by clicking the button below. This link will expire in ${expires}.
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td align="center" style="border-radius:6px; background-color:#2563eb;">
                    <a href=${link}" target="_blank"
                       style="display:inline-block; padding:14px 32px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; border-radius:6px;">
                      Verify Email Address
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:28px 0 0; font-size:13px; line-height:1.6; color:#9ca3af;">
                If the button above doesn't work, copy and paste this link into your browser:<br>
                <a href="${link}" style="color:#2563eb; word-break:break-all;">${link}</a>
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 32px;">
              <hr style="border:none; border-top:1px solid #e5e7eb; margin:0;">
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px 32px;">
              <p style="margin:0; font-size:13px; line-height:1.6; color:#9ca3af;">
                If you didn't create an account with Event management, you can safely ignore this email.
              </p>
              <p style="margin:16px 0 0; font-size:12px; color:#c1c5cc;">
                &copy; ${new Date().getFullYear()} Event Management. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};
