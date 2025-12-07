# Basis Prep

**Current Status (v1.0.6):**
- **Model**: Gemini 1.5 Flash (Stable, Free Tier compatible)
- **Deployment**: Live on GitHub Pages
- **Note**: If you see errors about `gemini-2.0-flash-exp`, your browser is serving an **OLD cached version**. The code for 2.0 does not exist in the current deployment.

## Troubleshooting Cache Issues
If you invoke the app and get a "Quota Exceeded" for `gemini-2.0`, please:
1.  **Use this fresh link**: [https://mfmqazi.github.io/basis-prep/?v=latest](https://mfmqazi.github.io/basis-prep/?v=latest)
2.  **Clear Browser Cache**: Hard refresh the page.
3.  **Verify Version**: Look for "Basis Prep v2" in the title or "(v1.0.6)" in the footer.

## Features
- **Basis Curriculum Alignment**: Subjects and topics match the Basis Primary, Middle, and High School progression.
- **AI Question Generation**: Powered by Google Gemini.
- **Progress Tracking**: Detailed history and score tracking.
- **Study Materials**: Curated resources for each grade level.

## Tech Stack
- React
- Vite
- Tailwind CSS
- Firebase (Auth & Firestore)
- Google Gemini API

## Setup
1. Clone the repository.
2. `npm install`
3. Create a `.env` file with your Firebase and Gemini API keys.
4. `npm run dev`
