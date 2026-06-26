import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  service: string;
  avatar?: string;
}

@Component({
  selector: 'app-reviews',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="avis" class="reviews" aria-labelledby="reviews-title">
      <div class="container">

        <header class="reviews__header">
          <span class="section-label">Avis clients</span>
          <h2 class="section-title" id="reviews-title">
            Ils nous ont fait<br />confiance
          </h2>
          <div class="reviews__summary" aria-label="Note moyenne : 5 étoiles sur 5">
            <div class="stars" aria-hidden="true">
              @for (star of [1,2,3,4,5]; track star) {
                <span class="star star--full">★</span>
              }
            </div>
            <strong class="reviews__avg">5,0</strong>
            <span class="reviews__count">/ 5 — {{ reviews.length }} avis vérifiés</span>
          </div>
        </header>

        <!-- Cards -->
        <div class="reviews__track" aria-live="polite" aria-atomic="false">
          <ul class="reviews__list" role="list" aria-label="Avis de nos clients">
            @for (review of visibleReviews(); track review.id) {
              <li class="review-card" aria-label="Avis de {{ review.author }}">
                <div class="review-card__top">
                  <div class="review-card__avatar" aria-hidden="true">
                    {{ initials(review.author) }}
                  </div>
                  <div class="review-card__meta">
                    <strong class="review-card__author">{{ review.author }}</strong>
                    <span class="review-card__date">{{ review.date }}</span>
                  </div>
                  <div class="review-card__stars" [attr.aria-label]="review.rating + ' étoiles sur 5'">
                    @for (star of [1,2,3,4,5]; track star) {
                      <span class="star" [class.star--full]="star <= review.rating" aria-hidden="true">★</span>
                    }
                  </div>
                </div>

                <blockquote class="review-card__text">
                  <p>{{ review.text }}</p>
                </blockquote>

                <span class="review-card__service">{{ review.service }}</span>
              </li>
            }
          </ul>
        </div>

        <!-- Navigation -->
        <div class="reviews__nav" role="group" aria-label="Navigation entre les avis">
          <button
            class="reviews__btn"
            (click)="prev()"
            [attr.aria-disabled]="activeIndex() === 0"
            aria-label="Avis précédents"
          >
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>

          <div class="reviews__dots" role="group" aria-label="Pages d'avis">
            @for (dot of dots(); track $index; let i = $index) {
              <button
                class="reviews__dot"
                [class.reviews__dot--active]="i === activeIndex()"
                (click)="goTo(i)"
                [attr.aria-label]="'Aller à la page ' + (i + 1)"
                [attr.aria-current]="i === activeIndex() ? 'true' : null"
              ></button>
            }
          </div>

          <button
            class="reviews__btn"
            (click)="next()"
            [attr.aria-disabled]="activeIndex() === dots().length - 1"
            aria-label="Avis suivants"
          >
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <!-- Google badge -->
        <div class="reviews__google-badge" aria-label="Avis certifiés Google">
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Avis vérifiés Google
        </div>
      </div>
    </section>
  `,
  styles: `
    .reviews {
      padding: var(--section-padding);
      background: var(--color-grey-soft);
    }

    .reviews__header {
      margin-bottom: 3rem;
    }

    .reviews__summary {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-top: 1rem;
      flex-wrap: wrap;
    }

    .stars {
      display: flex;
      gap: 2px;
    }

    .star {
      font-size: 1.2rem;
      color: var(--color-grey-mid);

      &--full {
        color: #f5a623;
      }
    }

    .reviews__avg {
      font-family: var(--font-display),serif;
      font-size: 1.5rem;
      color: var(--color-black);
    }

    .reviews__count {
      font-size: 0.875rem;
      color: var(--color-text-muted);
    }

    .reviews__track {
      overflow: hidden;
    }

    .reviews__list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
      animation: fadeIn 0.35s ease;

      @media (max-width: 680px) {
        grid-template-columns: 1fr;
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* Review Card */
    .review-card {
      background: var(--color-white);
      border-radius: var(--radius-md);
      padding: 1.75rem;
      box-shadow: var(--shadow-card);
      display: flex;
      flex-direction: column;
      gap: 1rem;
      transition: transform var(--transition), box-shadow var(--transition);
      border: 1px solid transparent;

      &:hover {
        transform: translateY(-3px);
        box-shadow: var(--shadow-hover);
        border-color: var(--color-green-light);
      }
    }

    .review-card__top {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .review-card__avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--color-green);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.875rem;
      flex-shrink: 0;
    }

    .review-card__meta {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.1rem;
    }

    .review-card__author {
      font-size: 0.95rem;
      color: var(--color-black);
    }

    .review-card__date {
      font-size: 0.75rem;
      color: var(--color-text-muted);
    }

    .review-card__stars {
      display: flex;
      gap: 1px;

      .star { font-size: 0.95rem; }
    }

    .review-card__text {
      font-size: 0.9rem;
      line-height: 1.7;
      color: var(--color-text);
      font-style: italic;
      border-left: 3px solid var(--color-green-light);
      padding-left: 0.75rem;
      flex: 1;
    }

    .review-card__service {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--color-green);
      background: var(--color-green-light);
      padding: 0.25rem 0.75rem;
      border-radius: 100px;
      width: fit-content;

      &::before {
        content: '✓';
        font-weight: 700;
      }
    }

    /* Navigation */
    .reviews__nav {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1.5rem;
      margin-top: 2rem;
    }

    .reviews__btn {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 2px solid var(--color-grey-mid);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-text);
      transition: border-color var(--transition), background var(--transition), color var(--transition);

      &:hover:not([aria-disabled="true"]) {
        border-color: var(--color-green);
        background: var(--color-green);
        color: white;
      }

      &[aria-disabled="true"] {
        opacity: 0.35;
        cursor: default;
      }
    }

    .reviews__dots {
      display: flex;
      gap: 0.5rem;
    }

    .reviews__dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--color-grey-mid);
      border: none;
      transition: background var(--transition), transform var(--transition);
      cursor: pointer;

      &--active {
        background: var(--color-green);
        transform: scale(1.4);
      }
    }

    /* Google badge */
    .reviews__google-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 2rem;
      font-size: 0.8rem;
      color: var(--color-text-muted);
      font-weight: 500;
    }
  `,
})
export class ReviewsComponent {
  readonly perPage = 3;
  readonly activeIndex = signal(0);

  readonly reviews: Review[] = [
    {
      id: '1',
      author: 'Baptiste Julien',
      rating: 5,
      date: 'Avril 2026',
      text: 'Travail impeccable, rapide et propre. Les volets sont de très bonne qualité et le rendu est top. Je recommande sans hésiter !',
      service: 'Installation volets roulants',
    },
    {
      id: '2',
      author: 'Christine Mazzocco',
      rating: 5,
      date: 'Mars 2026',
      text: 'Très satisfaite du résultat ! La vitrophanie a donné une vraie identité à ma vitrine. Conseil, ponctualité et professionnalisme au rendez-vous.',
      service: 'Vitrophanie décorative',
    },
    {
      id: '3',
      author: 'Mohammed El-hasser',
      rating: 5,
      date: 'Mars 2026',
      text: 'Installation parfaite, les stores sont élégants et fonctionnels. Très bon accompagnement du début à la fin. Un vrai sens du détail !',
      service: 'Installation stores bannes',
    },
    {
      id: '4',
      author: 'Marie Lebourne',
      rating: 5,
      date: 'Mars 2026',
      text: 'Intervention rapide et soignée pour la motorisation de nos volets. L\'équipe est sérieuse et à l\'écoute. Résultat au-delà de nos attentes.',
      service: 'Motorisation Somfy',
    },
    {
      id: '5',
      author: 'Thomas Norwas',
      rating: 5,
      date: 'Février 2026',
      text: 'Film solaire posé sur nos baies vitrées : la chaleur a nettement diminué cet été. Travail propre, sans bulle ni défaut. Très professionnel.',
      service: 'Film solaire',
    },
    {
      id: '6',
      author: 'Sandrine Piotot',
      rating: 5,
      date: 'Décembre 2025',
      text: 'Devis clair et honnête, délai respecté à la lettre. Les volets battants aluminium s\'intègrent parfaitement à notre façade. Merci !',
      service: 'Volets battants aluminium',
    },
  ];

  readonly dots = computed(() =>
    Array.from({ length: Math.ceil(this.reviews.length / this.perPage) })
  );

  readonly visibleReviews = computed(() => {
    const start = this.activeIndex() * this.perPage;
    return this.reviews.slice(start, start + this.perPage);
  });

  initials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  prev(): void {
    if (this.activeIndex() > 0) {
      this.activeIndex.update(i => i - 1);
    }
  }

  next(): void {
    if (this.activeIndex() < this.dots().length - 1) {
      this.activeIndex.update(i => i + 1);
    }
  }

  goTo(index: number): void {
    this.activeIndex.set(index);
  }
}
