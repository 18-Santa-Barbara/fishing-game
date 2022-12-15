import dotenv from 'dotenv';
import cors from 'cors';
import * as path from 'path';
import * as fs from 'fs';
dotenv.config();

import express from 'express';
// import { createClientAndConnect } from './db';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { render } from '../client/dist/ssr/entry-server.cjs';
import router from './app/routes/forum.routes'

const app = express();

const corsOptions = {
  credentials: true
}
app.use(cors(corsOptions));

const db = require("./app/models")
db.sequelize.sync({ force: true })  
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err: { message: string; }) => {
    console.log("Failed to sync db: " + err.message);
  });
  
app.use("/api/forums", router);

const port = Number(process.env.SERVER_PORT) || 3001;

// createClientAndConnect();
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
