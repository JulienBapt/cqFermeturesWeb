import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import {ServiceCategory} from './service.model';

@Component({
  selector: 'app-services',
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="prestations" class="services" aria-labelledby="services-title">
      <div class="container">

        <header class="services__header">
          <span class="section-label">Nos prestations</span>
          <h2 class="section-title" id="services-title">
            Trois expertises,<br />une seule adresse
          </h2>
          <p class="services__intro">
            Que ce soit pour sécuriser votre habitation, maîtriser la lumière ou
            habiller vos vitrages, nous intervenons chez les particuliers et les
            professionnels en Île-de-France.
          </p>
        </header>

        <!-- Category Tabs -->
        <div class="services__tabs" role="tablist" aria-label="Catégories de prestations">
          @for (cat of categories; track cat.id; let i = $index) {
            <button
              class="services__tab"
              [class.services__tab--active]="activeIndex() === i"
              role="tab"
              [attr.aria-selected]="activeIndex() === i"
              [attr.aria-controls]="'panel-' + cat.id"
              [id]="'tab-' + cat.id"
              (click)="setActive(i)"
            >
              <span class="tab__icon" aria-hidden="true">{{ cat.icon }}</span>
              <span class="tab__title">{{ cat.title }}</span>
              <span class="tab__tagline">{{ cat.tagline }}</span>
            </button>
          }
        </div>

        <!-- Category Panels -->
        @for (cat of categories; track cat.id; let i = $index) {
          <div
            class="services__panel"
            [class.services__panel--active]="activeIndex() === i"
            role="tabpanel"
            [id]="'panel-' + cat.id"
            [attr.aria-labelledby]="'tab-' + cat.id"
            [attr.aria-hidden]="activeIndex() !== i"
          >
            <div class="panel__intro">
              <p class="panel__description">{{ cat.description }}</p>
            </div>

            <ul class="panel__grid" role="list" aria-label="Sous-catégories de {{ cat.title }}">
              @for (sub of cat.subCategories; track sub.id) {
                <li class="panel__card">
                  <div class="card__img-wrapper">
                    <img
                      ngSrc="{{ sub.image }}"
                      [alt]="sub.imageAlt"
                      fill
                      class="card__img"
                    />
                    <div class="card__img-overlay" aria-hidden="true"></div>
                  </div>
                  <div class="card__body">
                    <h3 class="card__title">{{ sub.name }}</h3>
                    <p class="card__desc">{{ sub.description }}</p>
                  </div>
                </li>
              }
            </ul>
          </div>
        }

        <!-- CTA -->
        <div class="services__cta-row">
          <a href="#contact" class="btn-primary">
            Demander un devis gratuit
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: `
    .services {
      padding: var(--section-padding);
      background: var(--color-grey-soft);
    }

    .services__header {
      max-width: 600px;
      margin-bottom: 3rem;
    }

    .services__intro {
      color: var(--color-text-muted);
      font-size: 1.05rem;
      line-height: 1.7;
      margin-top: 0.75rem;
    }

    /* Tabs */
    .services__tabs {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      margin-bottom: 2.5rem;

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }
    }

    .services__tab {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.4rem;
      padding: 1.25rem 1.5rem;
      background: var(--color-white);
      border: 2px solid var(--color-grey-mid);
      border-radius: var(--radius-md);
      text-align: left;
      transition: border-color var(--transition), box-shadow var(--transition), transform var(--transition);
      cursor: pointer;

      &:hover {
        border-color: var(--color-green);
        transform: translateY(-2px);
      }

      &--active {
        border-color: var(--color-green);
        background: var(--color-green);
        color: var(--color-white);
        box-shadow: var(--shadow-hover);

        .tab__tagline { color: rgba(255,255,255,0.75); }
      }
    }

    .tab__icon {
      font-size: 1.8rem;
      line-height: 1;
    }

    .tab__title {
      font-family: var(--font-display),serif;
      font-size: 1.15rem;
      font-weight: 700;
    }

    .tab__tagline {
      font-size: 0.8rem;
      color: var(--color-text-muted);
      line-height: 1.4;
    }

    /* Panels */
    .services__panel {
      display: none;

      &--active {
        display: block;
        animation: fadeIn 0.3s ease;
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .panel__intro {
      margin-bottom: 2rem;
    }

    .panel__description {
      color: var(--color-text-muted);
      font-size: 1rem;
      max-width: 700px;
    }

    .panel__grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }

    /* Cards */
    .panel__card {
      background: var(--color-white);
      border-radius: var(--radius-md);
      overflow: hidden;
      box-shadow: var(--shadow-card);
      transition: transform var(--transition), box-shadow var(--transition);

      &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-hover);

        .card__img {
          transform: scale(1.04);
        }
      }
    }

    .card__img-wrapper {
      position: relative;
      overflow: hidden;
      aspect-ratio: 16 / 10;
    }

    .card__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }

    .card__img-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.3));
    }

    .card__body {
      padding: 1.25rem 1.5rem 1.5rem;
    }

    .card__title {
      font-family: var(--font-display),serif;
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--color-black);
      margin-bottom: 0.5rem;
    }

    .card__desc {
      font-size: 0.875rem;
      color: var(--color-text-muted);
      line-height: 1.6;
    }

    .services__cta-row {
      display: flex;
      justify-content: center;
      padding-top: 1.5rem;
    }
  `,
})
export class ServicesComponent {
  activeIndex = signal(0);

  setActive(index: number): void {
    this.activeIndex.set(index);
  }

  readonly categories: ServiceCategory[] = [
    {
      id: 'volets',
      icon: '🪟',
      title: 'Volets',
      tagline: 'Sécurité, isolation & élégance',
      description:
        'Nos volets sur mesure allient performance thermique, acoustique et sécurité. Motorisables et connectables à vos systèmes domotiques, ils subliment votre habitat tout en le protégeant.',
      color: '#1d6d30',
      subCategories: [
        {
          id: 'volets-roulants',
          name: 'Volets roulants',
          description: 'Motorisés ou manuels, en aluminium ou PVC, avec coffre intégré ou apparente.',
          image: 'assets/images/volets-roulants.jpg',
          imageAlt: 'Installation de volets roulants aluminium sur une façade',
        },
        {
          id: 'volets-battants',
          name: 'Volets battants',
          description: 'Volets battants aluminium sur mesure, peints dans toutes teintes RAL.',
          image: 'assets/images/volets-battants.jpg',
          imageAlt: 'Volets battants aluminium blanc sur une maison individuelle',
        },
        {
          id: 'volets-coulissants',
          name: 'Volets coulissants',
          description: 'Facilement dépliable permettant d\'être ajusté',
          image: 'assets/images/volets-persiennes.jpg',
          imageAlt: 'Volets coulissants devant une baie vitrée',
        },
        {
          id: 'volets-brise-soleil',
          name: 'Volet Brise Soleil',
          description: 'Idéaux pour les grandes baies vitrées, discrets en position ouverte.',
          image: 'assets/images/volets-brise-soleil.jpg',
          imageAlt: 'Volets intérieurs facile d\'utilisation',
        },
      ],
    },
    {
      id: 'stores',
      icon: '☀️',
      title: 'Stores',
      tagline: 'Design, durables & sur mesure',
      description:
        'Des stores banne, intérieurs ou de terrasse conçus pour maîtriser lumière et chaleur. 100 % fabriqués en France avec des toiles labellisées et des structures aluminium de haute qualité.',
      color: '#1d6d30',
      subCategories: [
        {
          id: 'stores-bannes',
          name: 'Stores bannes',
          description: 'Stores de terrasse motorisés ou manuels, résistants au vent et aux UV.',
          image: 'assets/images/store-bannes.jpg',
          imageAlt: 'Store banne déployé au dessus d\'une terrasse ensoleillée',
        },
        {
          id: 'stores-interieurs',
          name: 'Stores intérieurs',
          description: 'Stores enrouleurs, vénitiens ou jour/nuit pour chaque pièce.',
          image: 'assets/images/store-bureaux.jpg',
          imageAlt: 'Store intérieur enrouleur dans un salon moderne',
        },
        {
          id: 'stores-verticaux',
          name: 'Stores verticaux',
          description: 'Parfaits pour les grandes surfaces vitrées et les bureaux.',
          image: 'assets/images/store-projection.jpg',
          imageAlt: 'Stores à déploiement diagonal',
        },
      ],
    },
    {
      id: 'films',
      icon: '🔲',
      title: 'Films',
      tagline: 'Protéger, isoler & styliser',
      description:
        'Vitrophanie décorative, films solaires, films de sécurité ou anti-graffiti : nos solutions discrètes et efficaces transforment vos vitrages sans les remplacer, posées avec précision par nos experts.',
      color: '#1d6d30',
      subCategories: [
        {
          id: 'films-solaires',
          name: 'Films solaires',
          description: 'Réduisez la chaleur et les éblouissements tout en préservant la luminosité.',
          image: 'assets/images/films-solaires.jpg',
          imageAlt: 'Film solaire teinté appliqué sur une baie vitrée',
        },
        {
          id: 'vitrophanie',
          name: 'Films Décoratids (Vitrophanie décorative)',
          description: 'Personnalisez vitrines et cloisons avec des décors sur mesure ou givré.',
          image: 'assets/images/films-decoratifs.jpg',
          imageAlt: 'Vitrophanie décorative avec logo sur une vitrine de commerce',
        },
        {
          id: 'films-intimite',
          name: 'Films Occultants',
          description: 'Vision sens unique ou dépoli pour préserver votre intimité en journée.',
          image: 'assets/images/films-occultants.jpg',
          imageAlt: 'Film d\'intimité miroir sans tain sur des fenêtres de bureaux',
        },
      ],
    },
  ];
}
