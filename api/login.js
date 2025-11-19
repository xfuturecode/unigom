export default function handler(req, res) {
  // Autoriser le frontend depuis n'importe quelle origine
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Gestion de la pré-demande (OPTIONS)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    const { username, password, matricule } = req.body;

    // Vérifier que tous les champs sont présents
    if (!username || !password || !matricule) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    // Pour l'instant, on ne stocke pas, juste un log côté serveur
    console.log("Nouvel utilisateur inscrit :", { username, password, matricule });

    // Réponse côté frontend
    return res.status(200).json({
      message: `Inscription réussie pour l'utilisateur "${username}" avec le matricule "${matricule}".`,
      data: { username, matricule } // renvoyer éventuellement les infos utiles
    });
  }

  // Méthode non autorisée
  res.status(405).json({ message: "Méthode non autorisée." });
}
