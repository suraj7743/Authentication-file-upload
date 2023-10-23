import nodemailer from "nodemailer";
import EnvConfiguration from "../../config/env.config";
import jwtUtil from "../../utils/jwt.util";

class EmailService {
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EnvConfiguration.SMTP_USERNAME,
        pass: EnvConfiguration.SMTP_PASSWORD,
      },
    });
  }

  async sendmail(to: string, subject: string, text: string, url: string) {
    try {
      // send mail with defined transport object
      const info = await this.transporter.sendMail(
        {
          from: EnvConfiguration.SMTP_USERNAME,
          to: to,
          subject: subject,
          text: text,
          html: `<html>
        <body>
              <p style="text-align: center;">
                Click this button to verify your mail (valid for 10 min only)
              <a href='${url}' style="text-decoration: none;"
              >
                    Verify your email
              </a>
              </p>
        </body>
        </html>`,
        },
        function (error, info) {
          if (error) {
            throw error;
          } else {
            console.log(`message Sent: ${info.messageId} `);
          }
        }
      );
    } catch (error) {
      throw error;
    }
  }
}
export default new EmailService();
