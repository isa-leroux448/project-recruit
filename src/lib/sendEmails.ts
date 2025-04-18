import FormData from "form-data";
import Mailgun from 'mailgun.js';
import { CoachType } from "@/models/coach";
import { DOMAIN } from "./set-env";

export async function sendAccountRequest(coachInfo: CoachType) {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY as string
  });
  try {
    await mg.messages.create(DOMAIN as string, {
      from: `Project Recruit <noreply@${DOMAIN}>`,
      to: (process.env.ADMIN_EMAILS?.split(',').map(email => email.trim()) || ["Isabella Leroux <isabella.leroux.dev@gmail.com>"]),
      subject: `New account request - ${coachInfo.firstName} ${coachInfo.lastName}`,
      template: "account request",
      "h:X-Mailgun-Variables": JSON.stringify({
        firstName: coachInfo.firstName,
        lastName: coachInfo.lastName,
        email: coachInfo.email,
        university: coachInfo.university,
        position: coachInfo.position
      }),
    });
  } catch (error) {
    console.log(error);
  }
}

export async function sendDecisionEmail(coachInfo: CoachType, status: "approved" | "denied") {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY as string
  });
  try {
    const subject = status === "approved" ? "Your account has been approved!" : "Your account request has been denied";
    const template = status === "approved" ? "account approved" : "account denied";
    await mg.messages.create(DOMAIN as string, {
      from: `Project Recruit <noreply@${DOMAIN}>`,
      to: [`${coachInfo.firstName} ${coachInfo.lastName} <${coachInfo.email}>`],
      subject,
      template,
      "h:X-Mailgun-Variables": JSON.stringify({
        firstName: coachInfo.firstName,
        lastName: coachInfo.lastName,
        email: coachInfo.email,
        university: coachInfo.university,
        position: coachInfo.position
      }),
    });
  } catch (error) {
    console.log(error);
  }
}