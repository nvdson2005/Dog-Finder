# DogFinder

A Tinder-style dog breed discovery app built with Angular 21. Browse random dog breeds, like the ones you love, and manage your favorites in a dedicated dashboard.

## Features

- **Browse Mode** — Swipe through dog breed cards one by one. Like or dislike each breed with a single click.
- **Breed Details** — Click a breed card to see detailed information: name, breed group, temperament, weight, height, life span, and purpose.
- **Dashboard** — View all your liked breeds in one place. Remove favorites or manually add custom breeds via a form.
- **Custom Breed Entry** — Add any breed to your favorites manually, including name, age, weight, height, group, temperament, life span, and an image URL.
- **Quit Guard** — A confirmation prompt protects unsaved state when navigating away from the main browsing page.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 21 (standalone components) |
| Styling | Tailwind CSS v4 |
| State | Angular Signals + RxJS 7 |
| Forms | Angular Reactive Forms |
| Rendering | Angular SSR (@angular/ssr + Express 5) |
| Testing | Vitest |
| Linting | ESLint + angular-eslint |
| API | [The Dog API](https://www.thedogapi.com/) |

## Project Structure

```
src/
  app/
    components/
      forms/breed-form/        # Modal form for adding a custom breed
      nav-bar/                 # Top navigation bar
    core/
      api/                     # BreedApiService + injection token
      interceptors/            # Auth (API key) and error HTTP interceptors
    directives/
      card-action.directive    # Applies like/dislike visual feedback to buttons
    guards/
      quit-guard               # CanDeactivate guard for the main page
    pages/
      main-page/               # Tinder-style browsing layout
      breed-image/             # Default child route — shows a random breed image
      breed-detail/            # Child route — shows full breed details
      dashboard/               # Favorites management page
    pipes/
      breed-api-pipe           # Transforms raw API values for display
    shared/utils/              # API mapping utilities
    types/                     # TypeScript interfaces for API responses
  environments/                # Environment configuration files
```

## Routing

| Path | Component | Description |
|---|---|---|
| `/` | `MainPage` + `BreedImageComponent` | Landing page with a random breed image |
| `/:breedId` | `MainPage` + `BreedDetailsComponent` | Breed details overlay |
| `/dashboard` | `Dashboard` | Liked breeds management |
| `/**` | — | Redirects to `/` |

## Getting Started

### Prerequisites

- Node.js 20+
- npm 11+

### Installation

```bash
npm install
```

### Environment Configuration

Create `src/environments/environment.development.ts` with the following shape:

```ts
export const environment = {
  BASE_DOG_URL: 'https://api.thedogapi.com',
  API_KEY: 'your-api-key-here',
  USER_ID: 'your-user-id-here',
};
```

You can get a free API key from [The Dog API](https://www.thedogapi.com/).

### Development Server

```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/`. The app reloads automatically on file changes.

### Production Build

```bash
npm run build
```

Build artifacts are placed in the `dist/` directory.

### SSR Server

```bash
npm run serve:ssr:DogFinder
```

### Watch Mode

```bash
npm run watch
```

## Testing

Unit tests use [Vitest](https://vitest.dev/).

```bash
npm test
# or
ng test
```

Tests cover components, pages, pipes, interceptors, and directives.

## Linting

```bash
npm run lint
# or
ng lint
```

## Architecture Notes

- **Lazy loading** — all page components are loaded on demand via `loadComponent`.
- **Token-based DI** — `BASE_API_URL` is provided at the route level, making the API service configurable per route subtree.
- **Signals + RxJS interop** — the app uses Angular Signals for local state and `toSignal`/`toObservable` to bridge with RxJS streams (e.g. paginated breed fetching via `scan`).
- **HTTP interceptors** — `authInterceptor` injects the API key into every request; `errorInterceptor` handles API errors globally.
