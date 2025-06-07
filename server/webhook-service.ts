import { type QuestionnaireSubmission, type User } from "@shared/schema";

const N8N_WEBHOOK_URL = "https://dstplatform.app.n8n.cloud/webhook-test/7a837ab0-ae2b-44b1-be52-4b21b89a9b38";

export interface QuestionnaireWebhookPayload {
  userEmail: string;
  userName: string | null;
  score: number;
  segment: string;
  answers: any;
  submittedAt: string;
  submissionId: number;
}

export interface RegistrationWebhookPayload {
  eventType: "user_registration";
  userEmail: string;
  userName: string | null;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  userId: number;
  registeredAt: string;
}

export async function sendQuestionnaireWebhook(submission: QuestionnaireSubmission): Promise<boolean> {
  try {
    const payload: QuestionnaireWebhookPayload = {
      userEmail: submission.userEmail,
      userName: submission.userName,
      score: submission.score,
      segment: submission.segment,
      answers: JSON.parse(submission.answers),
      submittedAt: submission.submittedAt?.toISOString() || new Date().toISOString(),
      submissionId: submission.id
    };

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.error(`n8n questionnaire webhook failed: ${response.status} ${response.statusText}`);
      return false;
    }

    console.log(`n8n questionnaire webhook sent successfully for submission ${submission.id}`);
    return true;

  } catch (error) {
    console.error('Error sending n8n questionnaire webhook:', error);
    return false;
  }
}

export async function sendRegistrationWebhook(user: User): Promise<boolean> {
  try {
    const payload: RegistrationWebhookPayload = {
      eventType: "user_registration",
      userEmail: user.email,
      userName: user.firstName && user.lastName 
        ? `${user.firstName} ${user.lastName}`
        : null,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      userId: user.id,
      registeredAt: user.createdAt?.toISOString() || new Date().toISOString()
    };

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.error(`n8n registration webhook failed: ${response.status} ${response.statusText}`);
      return false;
    }

    console.log(`n8n registration webhook sent successfully for user ${user.id}`);
    return true;

  } catch (error) {
    console.error('Error sending n8n registration webhook:', error);
    return false;
  }
}

// Legacy function name for backward compatibility
export const sendN8nWebhook = sendQuestionnaireWebhook;