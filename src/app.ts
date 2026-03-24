import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import expressSession from 'express-session';
import healthRoute from './routes/healthRoute';
import bodyParser from 'body-parser';



const port = Number(process.env.PORT) || 3000;
dotenv.config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : `.env` });


declare module 'express-session' {
  interface SessionData {
      [key: string]: any;
  }
}

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(
    expressSession({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);

app.use(
  expressSession({
      secret: 'secret',
      resave: true,
      saveUninitialized: true,
  })
);
app.use(cors());

app.use(express.json());


app.use('/health',healthRoute)

 
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello Express + TypeScirpt!!',
  })
});

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Application is running on port ${port}`);
});

const shutdown = () => {
  console.log('Shutting down...');

  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);