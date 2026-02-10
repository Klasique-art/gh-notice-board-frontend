# Project Instructions

This document provides a comprehensive guide to setting up, developing, and deploying the **GitHub Notice Board** frontend project.

## 1. Project Overview

This is a [Next.js](https://nextjs.org) project bootstrapped with `create-next-app`. It uses:

-   **Framework**: Next.js 16.1.1 (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS v4
-   **Icons**: Lucide React, React Icons
-   **State/Logic**: React Hooks, Custom Hooks
-   **Forms**: Formik, Yup
-   **Maps**: @react-google-maps/api

## 2. Prerequisites

Before you begin, ensure you have the following installed:

-   **Node.js**: Version 20.x or higher is recommended.
-   **npm** (or yarn/pnpm/bun): Checks `package-lock.json` normally implies npm.

## 3. Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd gh-notice-board
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Environment Configuration**:
    Create a `.env.local` file in the root directory. You will need the following environment variables:

    ```env
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
    ```

    > **Note:** The `NEXT_PUBLIC_-` prefix is required for variables to be exposed to the browser.

## 4. Development

To start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The page auto-updates as you edit the file.

### Key Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server. |
| `npm run build` | Builds the application for production. |
| `npm run start` | Starts the production server (after building). |
| `npm run lint` | Runs ESLint to catch code quality issues. |

## 5. Project Structure

Here's an overview of the key directories:

-   **`app/`**: Contains the application routes (App Router).
    -   `page.tsx`: The main entry page.
    -   `layout.tsx`: The root layout.
    -   `api/`: API routes (backend-for-frontend logic).
-   **`components/`**: Reusable UI components.
    -   `ui/`: Generic UI elements (buttons, inputs, etc.).
    -   Specific features may have their own subfolders.
-   **`data/`**: Static data files and constants (e.g., `constants.ts`).
-   **`hooks/`**: Custom React hooks.
-   **`public/`**: Static assets like images, fonts, etc.
-   **`styles/`**: Global styles (if any supplementary to Tailwind).
-   **`types/`**: TypeScript type definitions.
-   **`utils/`**: Helper functions and utilities.

## 6. Configuration Details

### Tailwind CSS
The project uses Tailwind CSS v4. Configuration is handled automatically.

### Image Domains
Images are configured to load from:
-   `images.unsplash.com`
-   `plus.unsplash.com`
-   `localhost` (port 8000)

If you need to load images from other domains, update `next.config.ts`.

### API Configuration
The base API URL is defined in `data/constants.ts`.
-   Current default: `http://localhost:8000/api`
-   **Production**: You may need to update `BASE_URL` in `data/constants.ts` or configure it to use an environment variable for easier switching.

## 7. Common Tasks

### Adding a New Page
Create a new folder in `app/` with the desired route name, and add a `page.tsx` file inside it.
Example: `app/about/page.tsx` becomes `http://localhost:3000/about`.

### Adding a Component
Create a new file in `components/` (or a subdirectory). Use TypeScript interfaces for props.

