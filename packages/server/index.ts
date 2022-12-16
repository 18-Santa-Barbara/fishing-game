import dotenv from 'dotenv';
import cors from 'cors';
import * as path from 'path';
import * as fs from 'fs';
dotenv.config();

import express from 'express';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { render } from '../client/dist/ssr/entry-server.cjs';
import { startBackWithBase } from './db';
import themeRouter from './routes/theme.routes';


const app = express();
app.use(cors());
const port = Number(process.env.SERVER_PORT) || 3001;

app.use('/api/theme', themeRouter);

startBackWithBase();
app.use(express.static(path.resolve(__dirname, '../client/dist/client')));

app.get('*', async (req, res) => {
  const result = await render(req.url);
  const template = path.resolve(__dirname, '../client/dist/client/index.html');
  const htmlString = fs.readFileSync(template, 'utf-8');
  const newString = htmlString.replace('<!--ssr-outlet-->', result);
  res.send(newString);
});

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});
