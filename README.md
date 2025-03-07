# Plaud-POC 
Repository for a POC application for Plaud.ai. Application showcases ActionKit's ability to send summaries via Slack, Notion, and Gmail. Additionally there's an endpoint for a workflow to hit simulating transcripts and summaries sent from Paragon

## Integrations
- Notion
- Gmail 
- Slack

## Getting Started

First, install the dependencies:

```
npm install
```

Next, setup your `.env` file with the following variables

```
NEXT_PUBLIC_PARAGON_PROJECT_ID
SIGNING_KEY

AUTH_SECRET
NEXTAUTH_URL
AUTH_TRUST_HOST
NEXT_PUBLIC_AUTH_BACKEND

AUTH_GOOGLE_ID
AUTH_GOOGLE_SECRET
AUTH_GITHUB_ID
AUTH_GITHUB_SECRET
```

Then, run the development server:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Using Docker

1. Build an image for the Next.js app:

```
docker build -t <your_app_image_name> .
```

2. Start the app:

```
docker run --rm -v $(pwd)/.env:/app/.env -v $(pwd)/config:/app/config -v $(pwd)/cache:/app/cache -p 3000:3000 parato-demo
```
