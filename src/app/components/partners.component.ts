import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

interface Partner {
  name: string;
  location: string;
  description: string;
  logo: string;
  logoAlt: string;
  since: string;
}

@Component({
  selector: 'app-partners',
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="partenaires" class="partners" aria-labelledby="partners-title">
      <div class="container">

        <header class="partners__header">
          <span class="section-label">Nos partenaires</span>
          <h2 class="section-title" id="partners-title">
            Nous sommes en<br />bonne compagnie
          </h2>
          <p class="partners__intro">
            Des marques françaises de référence, sélectionnées pour leur qualité,
            leur durabilité et leur engagement envers l'excellence.
          </p>
        </header>

        <ul class="partners__grid" role="list" aria-label="Liste de nos partenaires">
          @for (partner of partners; track partner.name) {
            <li class="partner-card">
              <div class="partner-card__logo-area" aria-hidden="true">
                <img
                  ngSrc="{{ partner.logo }}"
                  [alt]="partner.logoAlt"
                  width="160"
                  height="100"
                  class="partner-card__logo"
                />
              </div>
              <div class="partner-card__body">
                <h3 class="partner-card__name">{{ partner.name }}</h3>
                <p class="partner-card__location">
                  <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  {{ partner.location }}
                </p>
                <p class="partner-card__desc">{{ partner.description }}</p>
                <span class="partner-card__since">Partenaire depuis {{ partner.since }}</span>
              </div>
            </li>
          }
        </ul>

        <div class="partners__badge">
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="var(--color-green)">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
          </svg>
          <p>
            <strong>Produits 100 % français</strong> — Toutes nos marques partenaires sont
            des entreprises françaises engagées dans la qualité et la durabilité.
          </p>
        </div>
      </div>
    </section>
  `,
  styles: `
    .partners {
      padding: var(--section-padding);
      background: var(--color-white);
    }

    .partners__header {
      max-width: 600px;
      margin-bottom: 3rem;
    }

    .partners__intro {
      color: var(--color-text-muted);
      font-size: 1.05rem;
      line-height: 1.7;
      margin-top: 0.75rem;
    }

    .partners__grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2.5rem;
    }

    .partner-card {
      display: flex;
      flex-direction: column;
      border: 1px solid var(--color-grey-mid);
      border-radius: var(--radius-md);
      overflow: hidden;
      transition: border-color var(--transition), box-shadow var(--transition), transform var(--transition);

      &:hover {
        border-color: var(--color-green);
        box-shadow: var(--shadow-hover);
        transform: translateY(-3px);
      }
    }

    .partner-card__logo-area {
      background: var(--color-grey-soft);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      min-height: 120px;
      border-bottom: 1px solid var(--color-grey-mid);
    }

    .partner-card__logo {
      width: auto;
      object-fit: contain;
      filter: grayscale(0.2);
      transition: filter var(--transition);

      .partner-card:hover & {
        filter: none;
      }
    }

    .partner-card__body {
      padding: 1.25rem 1.5rem 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      flex: 1;
    }

    .partner-card__name {
      font-family: var(--font-display), serif;
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--color-black);
    }

    .partner-card__location {
      display: flex;
      align-items: center;
      gap: 0.3rem;
      font-size: 0.8rem;
      font-weight: 500;
      color: var(--color-green);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .partner-card__desc {
      font-size: 0.875rem;
      color: var(--color-text-muted);
      line-height: 1.55;
      flex: 1;
    }

    .partner-card__since {
      display: inline-block;
      margin-top: 0.5rem;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--color-green);
      background: var(--color-green-light);
      padding: 0.25rem 0.6rem;
      border-radius: 100px;
    }

    .partners__badge {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      background: var(--color-green-light);
      border-left: 3px solid var(--color-green);
      border-radius: 0 var(--radius-md) var(--radius-md) 0;
      padding: 1.25rem 1.5rem;
      max-width: 700px;

      p {
        font-size: 0.925rem;
        color: var(--color-text);
        line-height: 1.6;
      }

      svg {
        flex-shrink: 0;
        margin-top: 2px;
      }
    }
  `,
})
export class PartnersComponent {
  readonly partners: Partner[] = [
    {
      name: 'Somfy',
      location: 'Cluses, Haute-Savoie',
      description: 'Groupe industriel français fondé en 1969, leader mondial de la motorisation et de la domotique pour la maison.',
      logo: 'assets/images/somfy-logo.jpg',
      logoAlt: 'Logo Somfy',
      since: '2023',
    },
    {
      name: 'Franciaflex',
      location: 'Chécy, Loiret',
      description: 'Storiste de France depuis 1961. Expert reconnu dans la fabrication de stores et protections solaires haut de gamme.',
      logo: 'assets/images/franciaflex-logo.jpg',
      logoAlt: 'Logo Franciaflex',
      since: '2023',
    },
    {
      name: 'Profalux',
      location: 'Haute-Savoie',
      description: 'Membre du Syndicat national de la fermeture et de la protection solaire. Fabricant de volets aluminium sur mesure.',
      logo: 'assets/images/profalux-logo.jpg',
      logoAlt: 'Logo Profalux',
      since: '2023',
    },
    {
      name: 'Réflectiv',
      location: 'Bonneuil-sur-Marne',
      description: 'Leader du film adhésif depuis 1981. Films solaires, de sécurité et de décoration pour vitrages professionnels et résidentiels.',
      logo: 'assets/images/reflectiv-logo.jpg',
      logoAlt: 'Logo Réflectiv',
      since: '2023',
    },
  ];
}
