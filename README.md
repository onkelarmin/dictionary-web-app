# Dictionary Web App

A modern dictionary application that allows users to search for English words and explore definitions, phonetics, audio pronunciation, synonyms, antonyms, and source links.

Built as part of a Frontend Mentor challenge, this project focuses on robust validation, API boundary handling, and clean separation between server logic, domain models, and UI rendering.

---

## Technologies used

- Astro
- Astro Actions
- TypeScript
- Zod (`astro:schema`)
- Free Dictionary API
- SCSS
- Vanilla JavaScript
- View Transitions API
- Lenis

---

## Features

- Search for English words
- View:
  - Definitions
  - Example sentences
  - Phonetic spelling
  - Audio pronunciation (when available)
  - Synonyms and antonyms
  - Source links
- Dedicated “Word Not Found” state
- Global error handling for network and server failures
- Accessible form validation with focus management
- Theme switching (light / dark)
- Font switching (serif / sans-serif / mono)
- Responsive layout for all screen sizes
- Smooth UI transitions

---

## Architecture

The application follows a layered architecture:
Form → Client Validation → Astro Action → API Boundary Validation
→ Transform (API → Domain Model) → Template-Based Rendering

- **Shared Validation Schema**  
  The same Zod schema is used client- and server-side to prevent validation drift.

- **API Boundary Validation**  
  External API responses are validated before being accepted into the application. Unexpected shapes trigger controlled `BAD_GATEWAY` errors.

- **Discriminated Union Responses**  
  Server responses use explicit status modeling:
  ```ts
  { status: "success"; payload: ... }
  { status: "not_found"; payload: ... }
  ```

- **Domain Transformation Layer**
    The UI consumes a normalized internal WordData type instead of raw API data, reducing coupling and improving maintainability.

- **Accessible UX Patterns**
    Uses aria-invalid, aria-describedby, focus management, and live regions for dynamic state announcements.

- **Explicit Error Modeling**
    Differentiates between validation errors, not-found states, and upstream failures.

---

## What I learned

- Designing and enforcing API boundaries before consuming external data
- Sharing validation logic across client and server using Zod
- Modeling UI states explicitly using discriminated unions
- Normalizing external data into stable internal domain models
- Structuring vanilla JavaScript projects with clear separation of concerns
- Implementing accessible validation and dynamic content updates

---

## Live Demo