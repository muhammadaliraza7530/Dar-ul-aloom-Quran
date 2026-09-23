import { createServerFn } from "@tanstack/react-start";

// This is a placeholder server function for TanStack Start (if supported by the user's specific setup).
// It securely accesses environment variables (like a Resend API key or SMTP credentials)
// to send an email without exposing them to the frontend.

export const sendEmailNotification = createServerFn({ method: "POST" })
  .validator((data: { type: "Admission" | "Contact"; details: Record<string, string> }) => data)
  .handler(async ({ data }) => {
  console.log("SERVER FUNCTION TRIGGERED - SENDING EMAIL", data.type);
  
  // Environment variables should be set in the deployment environment (e.g., Vercel dashboard)
  // For Resend: process.env.RESEND_API_KEY
  // For SendGrid: process.env.SENDGRID_API_KEY
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn("⚠️ RESEND_API_KEY is not configured in the environment. Email was not sent.");
    return { success: false, error: "Email configuration missing." };
  }

  // Format the email body
  let htmlBody = `<h2>New ${data.type} Form Submission</h2><table border="1" cellpadding="5" cellspacing="0">`;
  for (const [key, value] of Object.entries(data.details)) {
    htmlBody += `<tr><td><strong>${key}</strong></td><td>${value}</td></tr>`;
  }
  htmlBody += `</table>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Dar ul Uloom <onboarding@resend.dev>", // Replace with verified domain
        to: "yasirnazeem709@gmail.com", // Found in screenshots
        subject: `New ${data.type} Submission`,
        html: htmlBody
      })
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error("Resend API error:", errorText);
      return { success: false, error: errorText };
    }
    
    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error: "Network error" };
  }
});
