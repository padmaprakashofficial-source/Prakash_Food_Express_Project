import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  try {
    const order = req.body;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // ✅ Admin email fixed here
    const ADMIN_EMAIL = "padmaprakashofficial@gmail.com";

    // 📩 Send order to Admin
    await transporter.sendMail({
      from: `"Prakash Food Express" <${process.env.SMTP_USER}>`,
      to: ADMIN_EMAIL,
      subject: '🧾 New Order Received',
      text: JSON.stringify(order, null, 2)
    });

    // 📩 Send confirmation to Customer
    await transporter.sendMail({
      from: `"Prakash Food Express" <${process.env.SMTP_USER}>`,
      to: order.customer.email,
      subject: '✅ Order Successful',
      text: `Hi ${order.customer.name},\n\nYour order has been placed successfully.\n\nThank you for ordering from Prakash Food Express 🙏`
    });

    res.status(200).json({ ok: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Email sending failed" });
  }
}

