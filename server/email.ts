if (!process.env.SENDGRID_API_KEY) {
  console.warn("SENDGRID_API_KEY not found - email functionality will be disabled");
}

interface PasswordResetEmailParams {
  to: string;
  resetToken: string;
  firstName?: string;
}

export async function sendPasswordResetEmail(params: PasswordResetEmailParams): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.error('Cannot send email: SENDGRID_API_KEY not configured');
    return false;
  }

  const resetUrl = `https://${process.env.REPLIT_DEV_DOMAIN || 'localhost:5000'}/reset-password?token=${params.resetToken}`;
  
  const emailData = {
    personalizations: [
      {
        to: [{ email: params.to }],
        subject: 'Reset Your DST Brokerage Password'
      }
    ],
    from: {
      email: 'mannamohit542@gmail.com',
      name: 'DST Brokerage'
    },
    reply_to: {
      email: 'mannamohit542@gmail.com',
      name: 'DST Brokerage'
    },
    content: [
      {
        type: 'text/plain',
        value: `Password Reset Request

Hello${params.firstName ? ` ${params.firstName}` : ''},

You requested to reset your password for your DST Brokerage account. 

Click this link to reset your password: ${resetUrl}

This link will expire in 1 hour for security reasons.

If you didn't request this password reset, you can safely ignore this email.

DST Brokerage - Delaware Statutory Trust Investment Platform`
      },
      {
        type: 'text/html',
        value: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Password Reset Request</h2>
            <p>Hello${params.firstName ? ` ${params.firstName}` : ''},</p>
            <p>You requested to reset your password for your DST Brokerage account.</p>
            <p><a href="${resetUrl}">Click here to reset your password</a></p>
            <p>Link: ${resetUrl}</p>
            <p>This link will expire in 1 hour.</p>
            <p>DST Brokerage</p>
          </div>
        `
      }
    ]
  };

  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('SendGrid API error:', response.status, errorData);
      return false;
    }

    // Log response details for debugging
    const responseHeaders = response.headers.get('x-message-id');
    console.log(`Password reset email sent to ${params.to}, SendGrid Message ID: ${responseHeaders}`);
    console.log(`Response status: ${response.status}`);
    return true;
  } catch (error) {
    console.error('Failed to send password reset email:', error);
    return false;
  }
}