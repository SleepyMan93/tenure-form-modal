import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const allowedOrigins = [
  "https://tenureconsulting.com",
  "https://www.tenureconsulting.com",
  "https://tenure.webflow.io",
];

function setCors(req, res) {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default async function handler(req, res) {
  setCors(req, res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      leadType,
      fullName,
      email,
      role,
      companyName,
      website,
      productsInterested = [],
      urgency,
      employeeSize,
      existingBenefitsStatus,
      extraQuestions,
    } = req.body;

    if (!fullName || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const to =
      leadType === "direct"
        ? "owen@tenureconsulting.com"
        : "enquiries@tenureconsulting.com";

    await resend.emails.send({
      from: "Tenure <enquiries@mg.tenureconsulting.com>",
      to,
      reply_to: email,
      subject: `New Tenure enquiry — ${leadType === "direct" ? "Direct contact" : "General"}`,
      html: `
        <h2>New Tenure enquiry</h2>

        <p><strong>Lead type:</strong> ${leadType}</p>

        <hr />

        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Role:</strong> ${role || "-"}</p>

        <hr />

        <p><strong>Company:</strong> ${companyName || "-"}</p>
        <p><strong>Website:</strong> ${website || "-"}</p>

        <hr />

        <p><strong>Products interested in:</strong><br />
          ${productsInterested.length ? productsInterested.join(", ") : "-"}
        </p>

        <p><strong>Existing benefits:</strong> ${existingBenefitsStatus || "-"}</p>
        <p><strong>Urgency:</strong> ${urgency || "-"}</p>
        <p><strong>Employee size:</strong> ${employeeSize || "-"}</p>

        <hr />

        <p><strong>Additional message:</strong><br />
          ${extraQuestions || "-"}
        </p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Enquiry send failed:", error);
    return res.status(500).json({ error: "Failed to send enquiry" });
  }
}