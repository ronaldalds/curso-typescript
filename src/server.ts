import express from 'express';
import { router } from './routes';
import swaggerUI from "swagger-ui-express";
import swaggerFile from "./swagger.json";

const app = express();
app.use(express.json());

// Route
app.use(router);

// Swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));


app.listen('3000', () => console.log('listening on http://localhost:3000'));