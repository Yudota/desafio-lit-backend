import express from "express";
import { routes } from "./routes";
import cors from 'cors';
import * as dotenv from 'dotenv'
const app = express();

dotenv.config()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes);

const port = process.env.PORT || 0;
const baseUrl = process.env.API_BASE_URL || ''
app.listen(port, () => console.log(`Server running on ${baseUrl}:${port}/funcionario`));
