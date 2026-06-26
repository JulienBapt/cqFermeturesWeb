# CQ Fermetures — Site vitrine Angular 21

Site vitrine one-page pour CQ Fermetures, entreprise d'installation de stores, volets et films en Île-de-France.

## Stack technique

- **Angular 21** — Standalone components, Signals, OnPush
- **SCSS** — CSS custom properties, responsive mobile-first
- **Reactive Forms** — Formulaire de contact validé
- **NgOptimizedImage** — Images optimisées
- **Schema.org LocalBusiness** — SEO structuré

---

## Structure du projet

```
src/
├── index.html                          ← SEO meta + JSON-LD
├── styles.scss                         ← Design tokens + utilitaires globaux
└── app/
    ├── app.component.ts                ← Shell page unique
    ├── app.config.ts                   ← Configuration Angular
    ├── models/
    │   └── service.model.ts            ← Interfaces TypeScript
    └── components/
        ├── navbar/
        │   └── navbar.component.ts     ← Navigation sticky + mobile
        ├── hero/
        │   └── hero.component.ts       ← Devanture + photo couverture
        ├── services/
        │   └── services.component.ts   ← Prestations (3 catégories + onglets)
        ├── partners/
        │   └── partners.component.ts   ← Partenaires (Somfy, Franciaflex…)
        ├── reviews/
        │   └── reviews.component.ts    ← Avis clients avec pagination
        ├── contact/
        │   └── contact.component.ts    ← WhatsApp + formulaire réactif
        └── footer/
            └── footer.component.ts     ← Pied de page complet
```

---

## Images à remplacer

Placez vos photos dans `src/assets/images/` :

| Fichier                    | Usage                              |
|----------------------------|------------------------------------|
| `hero-cover.jpg`           | Photo de couverture hero (1920×1080 min) |
| `placeholder.jpg`          | Placeholder temporaire pour les sous-catégories |
| `logo-somfy.webp`          | Logo Somfy                         |
| `logo-franciaflex.webp`    | Logo Franciaflex                   |
| `logo-profalux.webp`       | Logo Profalux                      |
| `logo-reflectiv.webp`      | Logo Réflectiv                     |

### Photos sous-catégories à ajouter dans `services.component.ts`

**Volets :**
- `volets-roulants.jpg`
- `volets-battants.jpg`
- `volets-coulissants.jpg`
- `motorisation-somfy.jpg`

**Stores :**
- `store-banne.jpg`
- `store-interieur.jpg`
- `store-vertical.jpg`
- `pergola.jpg`

**Films :**
- `film-solaire.jpg`
- `film-securite.jpg`
- `vitrophanie.jpg`
- `film-intimite.jpg`

---

## Lancement

```bash
npm install
ng serve
```

## Build production

```bash
ng build --configuration production
```

---

## SEO — Points clés implémentés

- ✅ Balises meta `title`, `description`, `keywords`, `robots`
- ✅ Open Graph (Facebook / LinkedIn)
- ✅ Twitter Card
- ✅ Données structurées JSON-LD `LocalBusiness` (Schema.org)
- ✅ `lang="fr"` sur `<html>`
- ✅ Skip link accessibilité
- ✅ ARIA labels sur toutes les sections et interactions
- ✅ Hiérarchie de titres H1 → H2 → H3 cohérente
- ✅ `NgOptimizedImage` avec `priority` sur le hero

## Accessibilité (WCAG AA)

- ✅ Focus visible sur tous les éléments interactifs
- ✅ Contrastes couleurs conformes (vert #1d6d30 sur blanc : ratio 5.5:1)
- ✅ ARIA roles, labels et live regions
- ✅ `aria-expanded` sur le burger menu
- ✅ `role="alert"` sur les messages d'erreur de formulaire
- ✅ `prefers-reduced-motion` respecté
