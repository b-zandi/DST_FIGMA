import { type QuestionnaireSubmission } from "@shared/schema";

const N8N_WEBHOOK_URL = "https://dstplatform.app.n8n.cloud/webhook-test/7a837ab0-ae2b-44b1-be52-4b21b89a9b38";

export interface WebhookPayload {
  userEmail: string;
  userName: string | null;
  score: number;
  segment: string;
  answers: any;
  submittedAt: string;
  submissionId: number;
}

export async function sendN8nWebhook(submission: QuestionnaireSubmission): Promise<boolean> {
  try {
    const payload: WebhookPayload = {
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
      console.error(`n8n webhook failed: ${response.status} ${response.statusText}`);
      return false;
    }

    console.log(`n8n webhook sent successfully for submission ${submission.id}`);
    return true;

  } catch (error) {
    console.error('Error sending n8n webhook:', error);
    return false;
  }
}