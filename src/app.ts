import express from 'express';
import cors from 'cors';
import routes from './routes/routes';
const bodyParser = 'bodyParser';
import http from 'http';

const app = express();

app.use(express.urlencoded({ limit: '90mb', extended: true }));
app.use(cors());
app.use(express.json({ limit: '90mb' }));
app.use(routes);

export default app;
