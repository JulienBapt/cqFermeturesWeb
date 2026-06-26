import {Component, ChangeDetectionStrategy, signal} from '@angular/core';
import { NavbarComponent } from './components/navbar.component';
import { HeroComponent } from './components/hero.component';
import { ServicesComponent } from './components/services.component';
import { PartnersComponent } from './components/partners.component';
import { ReviewsComponent } from './components/reviews.component';
import { ContactComponent } from './components/contact.component';
import { FooterComponent } from './components/footer.component';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    HeroComponent,
    ServicesComponent,
    PartnersComponent,
    ReviewsComponent,
    ContactComponent,
    FooterComponent,
    NgOptimizedImage,
  ],
  template: `
    <a class="skip-link" href="#main-content">Aller au contenu principal</a>
    <app-navbar />
    <main id="main-content">
      <app-hero />
      <app-services />
      <app-partners />
      <app-reviews />
      <app-contact />
    </main>
    <app-footer />
    @if (windowScrolled()) {
      <button class="scroll-to-top-btn" title="Remonter" (click)="scrollToTop()" type="button" aria-label="Remonte en haut">
        <img class="scroll-to-top-img" alt="Flèche pour remonter en haut" ngSrc="assets/images/angle-circle-arrow-up-icon.png" height="48" width="48">
      </button>
    }
  `,
  styles: `
    :host {
      display: block;
    }
    .skip-link {
      position: absolute;
      top: -100%;
      left: 1rem;
      background: var(--color-green);
      color: #fff;
      padding: 0.5rem 1rem;
      border-radius: 0 0 4px 4px;
      font-weight: 600;
      z-index: 9999;
      text-decoration: none;
      transition: top 0.2s;
      &:focus {
        top: 0;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "(window:scroll)": "onWindowScroll()",
  }
})
export class AppComponent {
  windowScrolled = signal<boolean>(false);

  onWindowScroll(): void {
    const scrollY = window.scrollY;
    this.windowScrolled.set(scrollY > 300);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
