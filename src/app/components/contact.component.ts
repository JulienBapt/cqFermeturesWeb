import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contact" class="contact" aria-labelledby="contact-title">
      <div class="container">
        <div class="contact__grid">

          <!-- Left: Info + WhatsApp -->
          <div class="contact__info">
            <span class="section-label">Contactez-nous</span>
            <h2 class="section-title" id="contact-title">
              Chaque projet<br />est unique
            </h2>
            <p class="contact__desc">
              Expliquez-nous vos besoins, vos envies ou vos contraintes, et nous vous
              proposerons une solution sur mesure, adaptée à votre espace et à votre budget.
              <br /><br />
              <strong>Conseil, réactivité et travail soigné garantis.</strong>
            </p>

            <!-- WhatsApp primary CTA -->
            <a
              href="https://wa.me/33651325466"
              target="_blank"
              rel="noopener noreferrer"
              class="contact__whatsapp"
              aria-label="Contacter CQ Fermetures sur WhatsApp"
            >
              <div class="whatsapp__icon" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div class="whatsapp__text">
                <span class="whatsapp__label">Écrire sur WhatsApp</span>
                <span class="whatsapp__number">06 51 32 54 66</span>
              </div>
            </a>

            <!-- Phone call -->
            <a
              href="tel:+33651325466"
              class="contact__phone"
              aria-label="Appeler le 06 51 32 54 66"
            >
              <div class="phone__icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                </svg>
              </div>
              <div class="phone__text">
                <span class="phone__label">Appeler directement</span>
                <span class="phone__number">06 51 32 54 66</span>
              </div>
            </a>

            <!-- Email -->
            <a
              href="mailto:cqfermetures@gmail.com"
              class="contact__email-link"
              aria-label="Envoyer un e-mail à cqfermetures@gmail.com"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              cqfermetures&#64;gmail.com
            </a>

            <!-- Zone d'intervention -->
            <div class="contact__zone">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--color-green)" aria-hidden="true">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span>Antony &amp; toute l'Île-de-France</span>
            </div>
          </div>

          <!-- Right: Contact Form -->
          <div class="contact__form-wrapper">
            <h3 class="contact__form-title">Décrivez votre projet</h3>
            <p class="contact__form-subtitle">Nous vous répondons sous 24h.</p>

            @if (submitted()) {
              <div class="contact__success" role="alert" aria-live="polite">
                <div class="success__icon" aria-hidden="true">✓</div>
                <h4>Merci pour votre message !</h4>
                <p>Notre équipe vous répondra dans les plus brefs délais.</p>
                <button class="btn-outline" (click)="resetForm()">Envoyer un autre message</button>
              </div>
            } @else {
              <form
                [formGroup]="contactForm"
                (ngSubmit)="onSubmit()"
                class="contact__form"
                novalidate
                aria-label="Formulaire de contact"
              >
                <div class="form__row">
                  <div class="form__field">
                    <label for="name" class="form__label">
                      Votre nom <span aria-hidden="true" class="required">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      class="form__input"
                      formControlName="name"
                      autocomplete="name"
                      [class.form__input--error]="isInvalid('name')"
                      aria-required="true"
                      [attr.aria-describedby]="isInvalid('name') ? 'name-error' : null"
                      placeholder="Jean Dupont"
                    />
                    @if (isInvalid('name')) {
                      <span id="name-error" class="form__error" role="alert">
                        Veuillez indiquer votre nom.
                      </span>
                    }
                  </div>

                  <div class="form__field">
                    <label for="phone" class="form__label">Numéro de téléphone</label>
                    <input
                      id="phone"
                      type="tel"
                      class="form__input"
                      formControlName="phone"
                      autocomplete="tel"
                      placeholder="06 00 00 00 00"
                    />
                  </div>
                </div>

                <div class="form__field">
                  <label for="email" class="form__label">
                    Votre e-mail <span aria-hidden="true" class="required">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    class="form__input"
                    formControlName="email"
                    autocomplete="email"
                    [class.form__input--error]="isInvalid('email')"
                    aria-required="true"
                    [attr.aria-describedby]="isInvalid('email') ? 'email-error' : null"
                    placeholder="jean@exemple.fr"
                  />
                  @if (isInvalid('email')) {
                    <span id="email-error" class="form__error" role="alert">
                      Veuillez entrer une adresse e-mail valide.
                    </span>
                  }
                </div>

                <div class="form__field">
                  <label for="subject" class="form__label">
                    Sujet <span aria-hidden="true" class="required">*</span>
                  </label>
                  <select
                    id="subject"
                    class="form__input form__select"
                    formControlName="subject"
                    [class.form__input--error]="isInvalid('subject')"
                    aria-required="true"
                    [attr.aria-describedby]="isInvalid('subject') ? 'subject-error' : null"
                  >
                    <option value="" disabled>Choisissez une prestation…</option>
                    <option value="volets">Volets (roulants, battants, coulissants)</option>
                    <option value="stores">Stores (banne, intérieur, pergola)</option>
                    <option value="films">Films (solaire, sécurité, vitrophanie)</option>
                    <option value="motorisation">Motorisation / Domotique</option>
                    <option value="autre">Autre demande</option>
                  </select>
                  @if (isInvalid('subject')) {
                    <span id="subject-error" class="form__error" role="alert">
                      Veuillez sélectionner un sujet.
                    </span>
                  }
                </div>

                <div class="form__field">
                  <label for="message" class="form__label">
                    Votre projet <span aria-hidden="true" class="required">*</span>
                  </label>
                  <textarea
                    id="message"
                    class="form__input form__textarea"
                    formControlName="message"
                    rows="5"
                    [class.form__input--error]="isInvalid('message')"
                    aria-required="true"
                    [attr.aria-describedby]="isInvalid('message') ? 'message-error' : null"
                    placeholder="Décrivez votre projet : type de prestation, dimensions approximatives, contraintes particulières…"
                  ></textarea>
                  @if (isInvalid('message')) {
                    <span id="message-error" class="form__error" role="alert">
                      Veuillez décrire votre projet (minimum 10 caractères).
                    </span>
                  }
                </div>

                <p class="form__required-note">
                  <span aria-hidden="true" class="required">*</span> Champs obligatoires
                </p>

                <button
                  type="submit"
                  class="btn-primary form__submit"
                  [attr.aria-busy]="submitting()"
                >
                  @if (submitting()) {
                    <span class="spinner" aria-hidden="true"></span>
                    Envoi en cours…
                  } @else {
                    Définir ensemble votre projet
                    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  }
                </button>
              </form>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .contact {
      padding: var(--section-padding);
      background: var(--color-white);
    }

    .contact__grid {
      display: grid;
      grid-template-columns: 1fr 1.3fr;
      gap: 5rem;
      align-items: start;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
        gap: 3rem;
      }
    }

    /* Info column */
    .contact__desc {
      color: var(--color-text-muted);
      line-height: 1.75;
      margin-bottom: 2rem;
      margin-top: 0.5rem;
    }

    /* WhatsApp CTA */
    .contact__whatsapp {
      display: flex;
      align-items: center;
      gap: 1rem;
      background: #25D366;
      color: white;
      padding: 1.1rem 1.5rem;
      border-radius: var(--radius-md);
      margin-bottom: 1rem;
      box-shadow: 0 4px 16px rgba(37, 211, 102, 0.3);
      transition: transform var(--transition), box-shadow var(--transition);

      &:hover, &:focus-visible {
        transform: translateY(-2px);
        box-shadow: 0 6px 24px rgba(37, 211, 102, 0.45);
      }
    }

    .whatsapp__icon {
      width: 52px;
      height: 52px;
      background: rgba(255,255,255,0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .whatsapp__text {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }

    .whatsapp__label {
      font-size: 0.8rem;
      font-weight: 500;
      opacity: 0.9;
    }

    .whatsapp__number {
      font-family: var(--font-display), serif;
      font-size: 1.2rem;
      font-weight: 700;
    }

    /* Phone CTA */
    .contact__phone {
      display: flex;
      align-items: center;
      gap: 1rem;
      border: 2px solid var(--color-grey-mid);
      border-radius: var(--radius-md);
      padding: 1rem 1.5rem;
      margin-bottom: 1.25rem;
      transition: border-color var(--transition), background var(--transition);

      &:hover, &:focus-visible {
        border-color: var(--color-green);
        background: var(--color-green-light);
      }
    }

    .phone__icon {
      width: 44px;
      height: 44px;
      background: var(--color-green-light);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-green);
      flex-shrink: 0;
    }

    .phone__text {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
    }

    .phone__label {
      font-size: 0.78rem;
      color: var(--color-text-muted);
      font-weight: 500;
    }

    .phone__number {
      font-family: var(--font-display), serif;
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--color-black);
    }

    .contact__email-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--color-green);
      font-weight: 500;
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
      transition: color var(--transition);

      &:hover { color: var(--color-green-dark); text-decoration: underline; }
    }

    .contact__zone {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.85rem;
      color: var(--color-text-muted);
    }

    /* Form column */
    .contact__form-wrapper {
      background: var(--color-grey-soft);
      border-radius: var(--radius-lg);
      padding: 2.5rem;

      @media (max-width: 480px) {
        padding: 1.5rem;
      }
    }

    .contact__form-title {
      font-family: var(--font-display), serif;
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--color-black);
      margin-bottom: 0.25rem;
    }

    .contact__form-subtitle {
      font-size: 0.875rem;
      color: var(--color-text-muted);
      margin-bottom: 1.75rem;
    }

    .contact__form {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .form__row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.25rem;

      @media (max-width: 560px) {
        grid-template-columns: 1fr;
      }
    }

    .form__field {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .form__label {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--color-text);
    }

    .required {
      color: #c0392b;
    }

    .form__input {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 2px solid var(--color-grey-mid);
      border-radius: var(--radius-sm);
      font-family: var(--font-body), serif;
      font-size: 0.95rem;
      color: var(--color-text);
      background: var(--color-white);
      transition: border-color var(--transition), box-shadow var(--transition);

      &::placeholder { color: #aaa; }

      &:focus {
        outline: none;
        border-color: var(--color-green);
        box-shadow: 0 0 0 3px rgba(29, 109, 48, 0.12);
      }

      &--error {
        border-color: #c0392b;
        &:focus { box-shadow: 0 0 0 3px rgba(192, 57, 43, 0.12); }
      }
    }

    .form__select {
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23555' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 1rem center;
      padding-right: 2.5rem;
      cursor: pointer;
    }

    .form__textarea {
      resize: vertical;
      min-height: 120px;
    }

    .form__error {
      font-size: 0.8rem;
      color: #c0392b;
      font-weight: 500;
    }

    .form__required-note {
      font-size: 0.78rem;
      color: var(--color-text-muted);
    }

    .form__submit {
      width: 100%;
      justify-content: center;
      padding: 1rem;
      font-size: 1rem;
    }

    /* Spinner */
    .spinner {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255,255,255,0.4);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Success state */
    .contact__success {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 0.75rem;
      padding: 3rem 1rem;

      h4 {
        font-family: var(--font-display), serif;
        font-size: 1.3rem;
        font-weight: 700;
        color: var(--color-black);
      }

      p {
        color: var(--color-text-muted);
        font-size: 0.9rem;
        margin-bottom: 1rem;
      }
    }

    .success__icon {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: var(--color-green);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
  `,
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);

  submitted = signal(false);
  submitting = signal(false);

  readonly contactForm = this.fb.group({
    name:    ['', [Validators.required, Validators.minLength(2)]],
    phone:   [''],
    email:   ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  isInvalid(field: string): boolean {
    const ctrl = this.contactForm.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  private readonly contactEmail = 'cqfermetures@gmail.com';

  private readonly subjectLabels: Record<string, string> = {
    volets: 'Volets (roulants, battants, coulissants)',
    stores: 'Stores (banne, intérieur, pergola)',
    films: 'Films (solaire, sécurité, vitrophanie)',
    motorisation: 'Motorisation / Domotique',
    autre: 'Autre demande',
  };

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const { name, phone, subject, message } = this.contactForm.value;
    const subjectLabel = this.subjectLabels[subject ?? ''] ?? subject ?? '';

    const mailSubject = `Demande de devis : ${subjectLabel}`;
    const bodyLines = [
      `Nom : ${name}`,
      `Téléphone : ${phone || 'Non renseigné'}`,
      '',
      message,
    ];

    const mailtoUrl =
      `mailto:${this.contactEmail}` +
      `?subject=${encodeURIComponent(mailSubject)}` +
      `&body=${encodeURIComponent(bodyLines.join('\n'))}`;

    // Open the user's email client pre-filled with the form data (no back-end needed).
    window.location.href = mailtoUrl;

    this.submitted.set(true);
  }

  resetForm(): void {
    this.contactForm.reset();
    this.submitted.set(false);
  }
}
