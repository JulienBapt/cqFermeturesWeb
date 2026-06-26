import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="accueil" class="hero" aria-label="Présentation CQ Fermetures">

      <!-- Background Image -->
      <div class="hero__bg" aria-hidden="true">
        <picture>
          <source
            media="(max-width: 649px)"
            srcset="assets/images/front-page-mobile.jpg"
          />
          <img
            src="assets/images/front-page.jpg"
            alt=""
            fetchpriority="high"
            class="hero__img"
          />
        </picture>
        <div class="hero__overlay"></div>
        <div class="hero__diagonal" aria-hidden="true"></div>
      </div>

      <!-- Content -->
      <div class="hero__content container">
        <div class="hero__text">
          <p class="hero__eyebrow">Antony & Île-de-France</p>
          <h1 class="hero__title">
            L'alliance du savoir-faire<br />
            <em>français</em> et de la qualité<br />
            sur mesure
          </h1>
          <p class="hero__subtitle">
            Entreprise locale spécialisée dans l'installation de <strong>stores</strong>,
            <strong>volets</strong> et <strong>films de vitrage</strong>. Chaque projet
            réalisé avec soin, écoute et professionnalisme. Produits <strong>100 % français</strong>.
          </p>
          <div class="hero__actions">
            <a href="#contact" class="btn-primary">
              Votre projet
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="#prestations" class="btn-outline hero__btn-outline">
              Nos prestations
            </a>
          </div>
        </div>

        <!-- Floating Stats -->
        <div class="hero__stats" aria-label="Chiffres clés">
          @for (stat of stats; track stat.label) {
            <div class="hero__stat">
              <span class="hero__stat-value" aria-label="{{ stat.value }} {{ stat.label }}">
                {{ stat.value }}
              </span>
              <span class="hero__stat-label">{{ stat.label }}</span>
            </div>
          }
        </div>
      </div>

      <!-- Scroll cue -->
      <div class="hero__scroll-cue" aria-hidden="true">
        <div class="scroll-dot"></div>
      </div>
    </section>
  `,
  styles: `
    .hero {
      position: relative;
      min-height: 100svh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;
      color: var(--color-white);
    }

    .hero__bg {
      position: absolute;
      inset: 0;
      z-index: 0;
    }

    .hero__img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 30%;
    }

    .hero__overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        135deg,
        rgba(10, 10, 10, 0.72) 0%,
        rgba(29, 109, 48, 0.45) 60%,
        rgba(10, 10, 10, 0.55) 100%
      );
    }

    /* Signature diagonal stripe */
    .hero__diagonal {
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 120px;
      background: var(--color-white);
      clip-path: polygon(0 100%, 100% 0, 100% 100%);
    }

    .hero__content {
      position: relative;
      z-index: 1;
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: center;
      gap: 3rem;
      padding-top: 5rem;
      padding-bottom: 8rem;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
        padding-bottom: 10rem;
      }
    }

    .hero__text {
      max-width: 640px;
    }

    .hero__eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.7);
      margin-bottom: 1.25rem;

      &::before {
        content: '';
        display: block;
        width: 32px;
        height: 2px;
        background: var(--color-green);
      }
    }

    .hero__title {
      font-family: var(--font-display),serif;
      font-size: clamp(2.2rem, 5.5vw, 4rem);
      font-weight: 700;
      line-height: 1.15;
      margin-bottom: 1.5rem;

      em {
        font-style: normal;
        color: #6dcc85;
      }
    }

    .hero__subtitle {
      font-size: clamp(1rem, 2vw, 1.15rem);
      line-height: 1.75;
      color: rgba(255,255,255,0.85);
      margin-bottom: 2.5rem;
      max-width: 520px;

      strong {
        color: #fff;
        font-weight: 600;
      }
    }

    .hero__actions {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .hero__btn-outline {
      border-color: rgba(255,255,255,0.6);
      color: var(--color-white);

      &:hover, &:focus-visible {
        background: rgba(255,255,255,0.15);
        border-color: white;
      }
    }

    /* Floating stats card */
    .hero__stats {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: var(--radius-lg);
      padding: 2rem 1.75rem;
      min-width: 180px;
      text-align: center;

      @media (max-width: 900px) {
        flex-direction: column;
        justify-content: center;
        gap: 2.5rem;
        padding: 1.25rem 2rem;
        min-width: 0;
      }

      @media (max-width: 480px) {
        gap: 1.5rem;
      }
    }

    .hero__stat {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      padding: 0.75rem 0;
      border-bottom: 1px solid rgba(255,255,255,0.15);

      &:last-child { border-bottom: none; }

      @media (max-width: 900px) {
        border-bottom: none;
        padding: 0 2rem;
        &:last-child { border-right: none; }
      }
    }

    .hero__stat-value {
      font-family: var(--font-display),serif;
      font-size: 2rem;
      font-weight: 700;
      color: #6dcc85;
      line-height: 1;
    }

    .hero__stat-label {
      font-size: 0.75rem;
      font-weight: 500;
      color: rgba(255,255,255,0.75);
      letter-spacing: 0.05em;
    }

    /* Scroll cue */
    .hero__scroll-cue {
      position: absolute;
      bottom: 140px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1;

      @media (max-width: 900px) {
        bottom: 90px;
      }
    }

    .scroll-dot {
      width: 28px;
      height: 44px;
      border: 2px solid rgba(255,255,255,0.5);
      border-radius: 14px;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        top: 6px;
        left: 50%;
        transform: translateX(-50%);
        width: 4px;
        height: 8px;
        background: rgba(255,255,255,0.8);
        border-radius: 2px;
        animation: scroll-bounce 1.8s ease infinite;
      }
    }

    @keyframes scroll-bounce {
      0%, 100% { transform: translateX(-50%) translateY(0); opacity: 1; }
      50% { transform: translateX(-50%) translateY(10px); opacity: 0.3; }
    }
  `,
})
export class HeroComponent {
  readonly stats = [
    { value: '100%', label: 'Produits français' },
    { value: '5★',   label: 'Satisfaction client' },
    { value: '3',    label: 'Expertises métier' },
  ];
}
