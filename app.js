import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import  questionsRoute  from './Routes/QuestionsRoute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json())
app.use(express.static(path.join(__dirname, '/Public')));
app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs');

questionsRoute(app);

app.listen(3000, ()=>{
    console.log("API iniciada na porta 3000");
})

