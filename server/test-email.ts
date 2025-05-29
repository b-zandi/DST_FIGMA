export async function sendTestEmail(to: string): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.error('Cannot send email: SENDGRID_API_KEY not configured');
    return false;
  }

  const emailData = {
    personalizations: [
      {
        to: [{ email: to }],
        subject: 'Test Email from DST Brokerage'
      }
    ],
    from: {
      email: 'mannamohit542@gmail.com',
      name: 'DST Brokerage Test'
    },
    content: [
      {
        type: 'text/plain',
        value: 'This is a test email to verify SendGrid delivery.'
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

    console.log(`Test email response status: ${response.status}`);
    console.log(`Test email response headers: ${JSON.stringify(Object.fromEntries(response.headers))}`);
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('SendGrid test email error:', response.status, errorData);
      return false;
    }

    console.log(`Test email sent successfully to ${to}`);
    return true;
  } catch (error) {
    console.error('Failed to send test email:', error);
    return false;
  }
}