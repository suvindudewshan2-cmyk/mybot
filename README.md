# StudyMate AI — Gemini API version

## Deploy with Render
1. Upload the files in this project to your GitHub repository, preserving `public/index.html`.
2. In Render, choose New > Web Service and connect that GitHub repository.
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Choose Free plan if available.
6. In Render > Environment, add `GEMINI_API_KEY` as the key and your secret API key as its value.
7. Save and deploy, then open the Render URL.

Never put the API key in HTML, client-side JavaScript, GitHub, or messages. If it was exposed publicly, revoke it and create another one. Free hosting can sleep when idle, and Gemini free-tier availability and limits depend on Google's current terms and model availability.

The browser and API are served from the same Render app. The website posts messages to `/api/chat`.
