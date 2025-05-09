# Truck Crane Rental Website Development Prompt

This document outlines the requirements for building a truck crane rental website using the `land_starter` repository, adhering to the guidelines in `README.md`. The website must include four pages: Homepage, Services, Contact, and Testimonials, with a clean, modern design in Russian, emphasizing clarity and user trust.

## General Requirements
- **CSS**: Use BEM methodology with modular SCSS files in `src/assets/scss/components/`.
- **JavaScript**: Use vanilla JavaScript (no jQuery/heavy libraries) in `src/assets/js/`.
- **Images/Icons**: Implement lazy-loading, WebP with `<picture>` fallbacks, and inline SVG icons.
- **Animations**: Create responsive, animated components with CSS `transform`/`opacity` and `IntersectionObserver` for scroll triggers.
- **Templates**: Use Nunjucks in `src/templates/`, with components in `src/templates/pages_components/`.
- **Accessibility/SEO**: Include `alt` text, semantic HTML, and optimized metadata.

## Page Specifications

### 1. Homepage (`/`)
**Goal**: Introduce the company, highlight services, build trust, and drive action.

**Sections**:
- **Hero Section**:
  - Headline: "Надежная аренда автокранов в [Город/Регион]"
  - Subheadline: "Доступные, быстрые и профессиональные услуги автокранов"
  - CTA: "Запросить стоимость" button.
  - Background: Lazy-loaded WebP image/video of cranes (`<picture>` for fallbacks).
- **Key Benefits**:
  - 3–4 items: Fast dispatch, affordable rates, experienced operators, modern equipment.
  - Inline SVG icons with hover animations (e.g., scale).
- **Featured Services**:
  - Brief descriptions with links to Services page.
  - Use `service-card.njk` with fade-in animations.
- **Customer Trust**:
  - Client logos (inline SVGs, lazy-loaded).
  - Short testimonial quote linking to Testimonials page.
- **About the Company**:
  - Brief paragraph on experience, service area, mission.
- **CTA**:
  - "Нужен автокран сегодня?" with clickable phone and contact button.

### 2. Services Page (`/services`)
**Goal**: Detail crane rental services.

**Sections**:
- **Intro**:
  - Headline: "Наши услуги по аренде автокранов"
  - Overview of service process.
- **Service List**:
  - For each (e.g., "Аренда малого крана", "Манипулятор с длинной стрелой"):
    - Name, description, specs (lift capacity, reach, model), optional price.
    - Lazy-loaded WebP image/SVG icon.
    - Use `service-card.njk` with slide-in animations.
- **Why Choose Us**:
  - Bullet list: 24/7 availability, certified operators, etc.

### 3. Contact Page (`/contact`)
**Goal**: Facilitate inquiries.

**Sections**:
- **Contact Form**:
  - Fields: Name, Phone, Email, Message.
  - Button: "Запросить обратный звонок".
  - Validate via `form-validation.js`.
- **Contact Info**:
  - Clickable phone, email, address.
- **Map**:
  - Google Map iframe (service area/office).
- **Working Hours**:
  - Days and hours.

### 4. Testimonials Page (`/testimonials`)
**Goal**: Build trust via client feedback.

**Sections**:
- **Intro**:
  - Headline: "Что говорят наши клиенты"
  - Paragraph on customer satisfaction.
- **Testimonial Grid/Slider**:
  - For each (use `review-card.njk`):
    - Client/company name, quote (2–4 sentences), optional rating/photo.
    - Fade-in animations or slider (`testimonial-slider.js`).
- **CTA**:
  - "Нужен надежный автокран? Свяжитесь с нами!" with Contact page link.

## Nunjucks Guidelines
- **Components**: Store in `src/templates/pages_components/` (e.g., `hero-section.njk`, `service-card.njk`).
- **Importing**: Use `{% include "pages_components/component-name.njk" %}` in main templates.
- **Reusability**: Use Nunjucks variables/macros for dynamic data.
- **Naming**: Lowercase, hyphenated (e.g., `review-card.njk`).
- **Commenting**: Add comments, e.g., `{# Hero section with dynamic headline #}`.

## Styling and Animations
- Use SCSS variables (`_variables.scss`) and mixins (`_mixins.scss`).
- Ensure responsiveness with `rem`/`%` units and media queries.
- Apply smooth animations via `_animations.scss` (e.g., `fade-in`, `slide-up`).
- Optimize with `will-change` and GPU-accelerated properties.

## Image and Icon Handling
- Lazy-load images (`loading="lazy"`) with WebP and `<picture>` fallbacks.
- Use inline SVGs via sprite (`build/img/sprite-svg.svg`) or direct HTML.
- Optimize with `gulp-imagemin` and maintain aspect ratios.

## Development Steps
1. Install dependencies: `npm install`.
2. Develop templates, SCSS, and JS in `src/`.
3. Run `gulp` for development with live reload.
4. Build production files: `gulp build`.