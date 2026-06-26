import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
  PLATFORM_ID,
  effect,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.scrolled]': 'scrolled()',
  },
  template: `
    <header class="navbar" [class.scrolled]="scrolled()" role="banner">
      <div class="navbar__inner container">
        <!-- Logo -->
        <a href="#accueil" class="navbar__logo" aria-label="CQ Fermetures - Retour à l'accueil">
          <span class="navbar__logo-icon" aria-hidden="true">🏠</span>
          <span class="navbar__logo-text">
            <strong>CQ</strong>Fermetures
          </span>
        </a>

        <!-- Desktop Nav -->
        <nav class="navbar__nav" aria-label="Navigation principale">
          <ul class="navbar__links" role="list">
            @for (link of navLinks; track link.href) {
              <li>
                <a [href]="link.href" class="navbar__link">{{ link.label }}</a>
              </li>
            }
          </ul>
        </nav>

        <!-- CTA Phone -->
        <a href="tel:+33651325466" class="navbar__cta btn-primary" aria-label="Appeler le 06 51 32 54 66">
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
          </svg>
          06 51 32 54 66
        </a>

        <!-- Mobile Toggle -->
        <button
          class="navbar__burger"
          (click)="toggleMenu()"
          [attr.aria-expanded]="menuOpen()"
          aria-controls="mobile-menu"
          aria-label="Ouvrir le menu de navigation"
        >
          <span class="burger-line" [class.open]="menuOpen()"></span>
          <span class="burger-line" [class.open]="menuOpen()"></span>
          <span class="burger-line" [class.open]="menuOpen()"></span>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div
        id="mobile-menu"
        class="navbar__mobile"
        [class.navbar__mobile--open]="menuOpen()"
        aria-hidden="{{ !menuOpen() }}"
      >
        <nav aria-label="Navigation mobile">
          <ul class="navbar__mobile-links" role="list">
            @for (link of navLinks; track link.href) {
              <li>
                <a [href]="link.href" class="navbar__mobile-link" (click)="closeMenu()">
                  {{ link.label }}
                </a>
              </li>
            }
          </ul>
          <a href="tel:+33651325466" class="btn-primary navbar__mobile-cta">
            📞 06 51 32 54 66
          </a>
        </nav>
      </div>
    </header>
  `,
  styles: `
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .navbar {
      background: var(--color-white);
      border-bottom: 1px solid transparent;
      transition: border-color var(--transition), box-shadow var(--transition);

      &.scrolled {
        border-color: var(--color-grey-mid);
        box-shadow: 0 2px 20px rgba(0,0,0,.08);
      }
    }

    .navbar__inner {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      height: 4.5rem;
    }

    .navbar__logo {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      font-family: var(--font-display),serif;
      font-size: 1.3rem;
      flex-shrink: 0;

      strong {
        color: var(--color-green);
      }
    }

    .navbar__logo-icon {
      font-size: 1.4rem;
    }

    .navbar__nav {
      flex: 1;
      display: flex;
      justify-content: center;

      @media (max-width: 768px) {
        display: none;
      }
    }

    .navbar__links {
      display: flex;
      gap: 0.25rem;
    }

    .navbar__link {
      padding: 0.5rem 0.9rem;
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--color-text);
      border-radius: var(--radius-sm);
      transition: color var(--transition), background var(--transition);

      &:hover {
        color: var(--color-green);
        background: var(--color-green-light);
      }
    }

    .navbar__cta {
      flex-shrink: 0;
      font-size: 0.875rem;
      padding: 0.6rem 1.25rem;

      @media (max-width: 768px) {
        display: none;
      }
    }

    .navbar__burger {
      display: none;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
      width: 40px;
      height: 40px;
      padding: 8px;
      border-radius: var(--radius-sm);
      margin-left: auto;
      transition: background var(--transition);

      &:hover { background: var(--color-grey-soft); }

      @media (max-width: 768px) {
        display: flex;
      }
    }

    .burger-line {
      display: block;
      width: 100%;
      height: 2px;
      background: var(--color-black);
      border-radius: 2px;
      transition: transform 0.25s ease, opacity 0.25s ease;

      &:nth-child(1).open { transform: translateY(7px) rotate(45deg); }
      &:nth-child(2).open { opacity: 0; transform: scaleX(0); }
      &:nth-child(3).open { transform: translateY(-7px) rotate(-45deg); }
    }

    .navbar__mobile {
      display: none;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease, padding 0.3s ease;
      background: var(--color-white);
      border-top: 1px solid var(--color-grey-mid);

      @media (max-width: 768px) {
        display: block;
      }

      &--open {
        max-height: 400px;
        padding-bottom: 1.5rem;
      }
    }

    .navbar__mobile-links {
      display: flex;
      flex-direction: column;
      padding: 1rem clamp(1rem, 5vw, 3rem);
    }

    .navbar__mobile-link {
      display: block;
      padding: 0.85rem 0;
      font-size: 1.05rem;
      font-weight: 500;
      border-bottom: 1px solid var(--color-grey-mid);
      transition: color var(--transition);

      &:hover { color: var(--color-green); }
    }

    .navbar__mobile-cta {
      margin: 1.25rem clamp(1rem, 5vw, 3rem) 0;
      justify-content: center;
    }
  `,
})
export class NavbarComponent {
  private readonly platformId = inject(PLATFORM_ID);

  scrolled = signal(false);
  menuOpen = signal(false);

  readonly navLinks = [
    { href: '#accueil',      label: 'Accueil' },
    { href: '#prestations',  label: 'Prestations' },
    { href: '#partenaires',  label: 'Partenaires' },
    { href: '#avis',         label: 'Avis clients' },
    { href: '#contact',      label: 'Contact' },
  ];

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      effect(() => {
        const handler = () => this.scrolled.set(window.scrollY > 40);
        window.addEventListener('scroll', handler, { passive: true });
        return () => window.removeEventListener('scroll', handler);
      });
    }
  }

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
