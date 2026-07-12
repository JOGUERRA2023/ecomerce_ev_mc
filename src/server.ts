import 'dotenv/config';
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { ChatMessage } from '@shared/interfaces/ChatMessage';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();
app.use(express.json());

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */
const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env['apikey_google'],
    }),
  ],
});

app.post('/api/chat', async (req, res) => {
  const sytemPrompt = `Eres un asistente de compras para una tienda virtual. Tu objetivo es ayudar a los usuarios con sus compras. 

  - Debes responder en español.
  - Debes responder en base a los productos relacionados como: ""Mix Nueces, Almendras, Semillas, Frutos Secos"" y otros.
  - Si el usuario menciona una categoría de productos, debes mostrarle los productos de esa categoría.
  - Si el usuario menciona un producto específico, debes mostrarle los detalles de ese producto.
  - Si el usuario menciona un precio, debes mostrarle los productos que se encuentran en ese rango de precios.
  - Si el usuario menciona una marca, debes mostrarle los productos de esa marca.
  - Si el usuario no menciona algo relacionado a la tienda, comentarle que ajustarse a las métricas.
  `;
  const { message } = req.body;
  const response = await ai.generate({
    model: googleAI.model('gemini-3.5-flash'),
    prompt: message,
    system: sytemPrompt,
    config: {
      temperature: 0.7,
    },
  });

  const content = response.text;
  const chatMessage: ChatMessage = {
    id: crypto.randomUUID(),
    content: content || '',
    sender: 'bot',
    timestamp: new Date(),
  };

  res.json(chatMessage);
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
