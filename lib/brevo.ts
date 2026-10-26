// Brevo (Sendinblue) email integration

interface SendEmailParams {
  email: string;
  prenom: string;
  nom: string;
  secteur: string;
  score?: number;
}

export async function sendDiagnosticEmail({
  email,
  prenom,
  nom,
  secteur,
  score = 75,
}: SendEmailParams) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    throw new Error('BREVO_API_KEY not configured');
  }

  const emailContent = `
Bonjour ${prenom},

Merci d'avoir réalisé le diagnostic de conformité IA de Solveria !

Voici votre score : ${score}%

Secteur d'activité : ${secteur}

Votre rapport détaillé sera disponible dans votre dashboard personnel dès que vous vous connecterez.

---

Pour accéder à votre dashboard et voir vos rapports complets, veuillez vous connecter ou créer un compte :
https://localhost:3000/login

Cordialement,
L'équipe Solveria
  `.trim();

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: 'Solveria',
          email: 'd.jale@yahoo.fr',
        },
        to: [
          {
            email,
            name: `${prenom} ${nom}`,
          },
        ],
        subject: 'Votre diagnostic de conformité IA - Solveria',
        htmlContent: `
          <html>
            <body style="font-family: Arial, sans-serif; color: #333;">
              <h2>Bonjour ${prenom},</h2>
              <p>Merci d'avoir réalisé le diagnostic de conformité IA de Solveria !</p>

              <div style="background: #f0f0f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Votre score :</strong> <span style="font-size: 32px; color: #0066cc;">${score}%</span></p>
                <p><strong>Secteur d'activité :</strong> ${secteur}</p>
              </div>

              <p>Votre rapport détaillé sera disponible dans votre dashboard personnel dès que vous vous connecterez.</p>

              <p style="margin-top: 30px;">
                <a href="https://localhost:3000/login" style="background: #0066cc; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block;">
                  Accéder à mon dashboard
                </a>
              </p>

              <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
              <p style="font-size: 12px; color: #666;">
                Cordialement,<br>
                L'équipe Solveria
              </p>
            </body>
          </html>
        `,
        textContent: emailContent,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Brevo API error: ${error.message || response.statusText}`);
    }

    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
