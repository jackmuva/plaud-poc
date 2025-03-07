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

Then, run the development server:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Using Docker

1. Build an image for the Next.js app:

```
docker build -t <your_app_image_name> .
```

2. Start the app:

```
docker run --rm -v $(pwd)/.env:/app/.env -v $(pwd)/config:/app/config -v $(pwd)/cache:/app/cache -p 3000:3000 parato-demo
```
