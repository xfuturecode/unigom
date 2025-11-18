export default function handler(req, res) {
    if (req.method === "POST") {
        const { username, password } = req.body;

        // Exemple simple
        if (username === "admin" && password === "1234") {
            return res.status(200).json({ message: "Connexion réussie !" });
        }

        return res.status(200).json({ message: "Identifiants incorrects." });
    }

    res.status(405).json({ message: "Méthode non autorisée" });
}
