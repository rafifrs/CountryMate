# CountryMate - SPA
Deployment Link -> country-mate-p6m6.vercel.app

A modern single-page application (SPA) that combines country information display with AI-powered features.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Authentication](#authentication)
- [GraphQL API](#graphql-api)
- [AI Assistant Integration](#ai-assistant-integration)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

CountryMate is a React-based SPA that provides country information and integrates AI-powered features. It uses GraphQL to fetch country data, allows users to filter/search countries, and integrates an AI assistant via the NVIDIA NIM API. Additionally, the app supports authentication using Google OAuth.

## Features

### Country Information Display
- List of countries displaying:
  - Name
  - Emoji flag
  - Capital
  - Currency
- Responsive design for all screen sizes
- Clickable Country Cards:
  - Opens an AI chat bot to ask questions about the country
  - Shows additional details:
    - Languages spoken
    - Continent
    - Other relevant details
- Filter countries by continent
- Search functionality to quickly find countries

### AI Assistant Integration
- Chat interface connecting to NVIDIA NIM API
- Features:
  - Ask questions about displayed countries
  - Get travel recommendations
  - Translate country information
- Typing indicators and graceful error handling

### Authentication (Bonus Feature)
- Google or Github OAuth sign-in
- Protected routes for the main application
- Display user profile information after login
- Proper authentication state management and error handling

## Technologies Used

- React (Frontend framework)
- TypeScript (Strongly-typed JavaScript)
- GraphQL (API query language) via Apollo Client
- OAuth 2.0 (Authentication)
- NVIDIA NIM API (AI Assistant)
- Firebase (Authentication & Database)
- Styled-components or Tailwind CSS (Styling)

## Setup Instructions

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Yarn](https://yarnpkg.com/) or npm
- Google/GitHub OAuth credentials

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/countrymate.git
   cd CountryMate
   ```

2. Install dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```

3. Set up environment variables (see the next section).

4. Start the backend server:
   ```bash
   node server.js
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open `http://localhost:5173` in your browser.

## Environment Variables

Create a `.env` file in the root directory and add the following:

```env
VITE_NIM_API_KEY=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
VITE_FIREBASE_API_KEY="AIzaSyC1rz46wQKnmdbWn711I5EzMUxFLJFyvAE"
VITE_FIREBASE_AUTH_DOMAIN="countrymate-4d4b5.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="countrymate-4d4b5"
VITE_FIREBASE_STORAGE_BUCKET="countrymate-4d4b5.firebasestorage.app"
VITE_FIREBASE_MESSAGING_SENDER_ID="611306287850"
VITE_FIREBASE_APP_ID="1:611306287850:web:c106f08cc8409371afdd93"
measurementId="G-66RBRZK3ZX"
```

## Usage

- Browse countries and click on them to open an AI chat bot.
- Use the filter to select countries by continent.
- Use the search bar to find specific countries.
- Sign in with Google or Github for access to protected routes.

## Authentication

Authentication is implemented using OAuth 2.0 via Google.
- Upon sign-in, the user’s profile information is displayed.
- The main application is protected and requires authentication.

## GraphQL API

This project uses the public GraphQL endpoint:
```
https://countries.trevorblades.com
```
To fetch country details.

## AI Assistant Integration

- Uses the NVIDIA NIM API for AI-powered country insights.
- Handles errors gracefully and provides a smooth chat experience.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

