import dotenv from 'dotenv';
import cors from 'cors';
import * as path from 'path';
import * as fs from 'fs';
// import https from 'https';
import cookieParser from 'cookie-parser';
dotenv.config();

import express from 'express';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { render } from '../client/dist/ssr/entry-server.cjs';
import { startBackWithBase } from './db';

import forumRouter from './routes/forum.routes';
import themeRouter from './routes/theme.routes';
import commentsRouter from './routes/comments.routes';
import likesRouter from './routes/likes.routes';
import helmet from 'helmet';


// const options = {
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem'),
// };
const app = express();

app.use(helmet());
app.use(cors());
app.use(cookieParser());

app.use(express.json());

app.use('/api/forums', forumRouter);
app.use('/api/theme', themeRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/likes', likesRouter);

startBackWithBase();
app.use(express.static(path.resolve(__dirname, '../client/dist/client')));
app.get('*', async (req, res) => {
  const result = await render(req.url);
  const template = path.resolve(__dirname, '../client/dist/client/index.html');
  const htmlString = fs.readFileSync(template, 'utf-8');
  const newString = htmlString.replace('<!--ssr-outlet-->', result);
  res.send(newString);
});

// const server = https.createServer({ key: options.key, cert: options.cert }, app);

// server.listen(8000, () => {
//   console.log('listening on 8000'); 
// });

const port = Number(process.env.SERVER_PORT) || 3001;
app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});
