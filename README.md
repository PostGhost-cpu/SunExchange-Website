# Sun Exchange — Static Site Redesign
A compact, static site redesign for _Sun Exchange_ that prioritises clarity and mobile responsiveness. News content is loaded from news.meta.json and rendered client-side with progressive loading; forms and components are accessible and easy to maintain. Built with semantic HTML, modular CSS, and plain JavaScript for simple local hosting and deployment.
This repository contains a static, informational redesign of the Sun Exchange website. The redesign focuses on clarity, consistent branding and improved content discovery. The codebase uses semantic HTML5, modular CSS and light client JavaScript. No backend is included.

## Main features and functionality
- Multi-page static site: _home, about, solutions, projects, news, contact, login._
- News feed loaded from _news.json_ (or inline fallback).
- Progressive news loading: initial batch + load-more button.
- Accessible, responsive card layout for articles.
- Simple client-side validation for login and contact forms.
- Sitemap for indexing and QA.

## Tech stack
+ __HTML5__ (semantic markup)
+ __CSS3__ (modular styles, CSS variables)
+ __JavaScript__ (vanilla ES6)
+ Static asset structure (images, JSON)

## File structure

SunExchange/
├─ home.html
├─ news.html
├─ about.html
├─ contact.html
├─ CSS/
│  └─ _stylesheet.css_
├─ JS/
│  └─ _scriptsheet.js_
├─ images/
├─ news.json
└─ sitemap.xml

### Behaviour and configuration - scriptsheet.js
A single, lightweight script that powers form validation, a live contact-number counter, and a client-side news feed. It keeps the site interactive without a backend. Use it for local testing and static hosting.

1. Validates login and contact forms.
  - Shows a live remaining-character counter for the contact number.
  - Loads news from news.json or an inline JSON fallback.
  - Caches news to localStorage.
  - Renders articles in batches with a fade-in animation and a Load More button.
  - Adds accessible links and a “Read more” action for each article.

2. Rendering approach
  - Articles are inserted as semantic DOM nodes.
  - Template literals are used for markup. Where possible text is escaped to avoid injecting raw HTML.
  - Each card includes: _linked image, linked heading, summary, publisher info, and a Read more link._
  - New batches animate with a fade-in effect.

3. Form validation and character counter
  - __login_validation()__ checks for non-empty email and password.
  - __contact_validation()__ checks required fields.
  - The contact-number counter reads the input maxlength. It updates on input and paste.
  - If the field exceeds maxlength the form submit is prevented and the user is focused back to the input.
