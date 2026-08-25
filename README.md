# Portfolio — Amir Ait Habib

Site statique (HTML/CSS/JS, sans framework) prêt à être publié sur GitHub Pages.

## Contenu du dossier

```
portfolio/
├── index.html          → la page du portfolio
├── style.css            → le design
├── script.js             → menu mobile + animation du schéma réseau
├── assets/
│   └── CV_Amir_AitHabib.pdf   → ton CV téléchargeable
└── README.md
```

## Publier le site sur GitHub Pages — étape par étape

**1. Crée un compte GitHub** (si tu n'en as pas déjà un) sur https://github.com

**2. Crée un nouveau dépôt (repository)**
- Clique sur le "+" en haut à droite → "New repository"
- Nomme-le **exactement** `TON-PSEUDO.github.io` (remplace `TON-PSEUDO` par ton nom d'utilisateur GitHub, par exemple si ton pseudo est `amirah`, le dépôt doit s'appeler `amirah.github.io`)
- Laisse-le en **Public**
- Ne coche pas "Add a README" (on a déjà le nôtre)
- Clique sur "Create repository"

**3. Envoie les fichiers du portfolio dans ce dépôt**

Deux options :

**Option A — par l'interface web (le plus simple, sans ligne de commande) :**
- Sur la page de ton nouveau dépôt, clique sur "uploading an existing file"
- Glisse-dépose tous les fichiers et dossiers de `portfolio/` (index.html, style.css, script.js, assets/, README.md)
- En bas, clique sur "Commit changes"

**Option B — avec Git en ligne de commande :**
```bash
cd portfolio
git init
git add .
git commit -m "Premier déploiement du portfolio"
git branch -M main
git remote add origin https://github.com/TON-PSEUDO/TON-PSEUDO.github.io.git
git push -u origin main
```

**4. Active GitHub Pages**
- Dans le dépôt, va dans "Settings" (Paramètres)
- Dans le menu de gauche, clique sur "Pages"
- Sous "Build and deployment" → "Source", sélectionne "Deploy from a branch"
- Choisis la branche `main` et le dossier `/ (root)`
- Clique sur "Save"

**5. Attends 1 à 2 minutes**, puis ton site sera accessible à l'adresse :
```
https://TON-PSEUDO.github.io
```

## Personnalisation à faire avant publication

- Dans `index.html`, section `#contact`, remplace les `href="#"` de GitHub et LinkedIn par tes vrais liens de profil.
- Si tu as des dépôts GitHub publics pour tes projets, tu peux ajouter un lien "Voir le code ↗" sur chaque carte projet dans la section `#projects`.
- Pense à mettre à jour `assets/CV_Amir_AitHabib.pdf` à chaque nouvelle version de ton CV (garde le même nom de fichier, ou mets à jour le lien dans `index.html`).
