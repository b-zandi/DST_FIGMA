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
    content: [
      {
        type: 'text/html',
        value: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Password Reset Request</h2>
            
            <p>Hello${params.firstName ? ` ${params.firstName}` : ''},</p>
            
            <p>You requested to reset your password for your DST Brokerage account. Click the button below to set a new password:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Reset My Password
              </a>
            </div>
            
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #666;">${resetUrl}</p>
            
            <p style="color: #666; font-size: 14px;">
              This link will expire in 1 hour for security reasons.
            </p>
            
            <p style="color: #666; font-size: 14px;">
              If you didn't request this password reset, you can safely ignore this email.
            </p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 12px;">
              DST Brokerage - Delaware Statutory Trust Investment Platform
            </p>
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