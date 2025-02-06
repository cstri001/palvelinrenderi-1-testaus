import express from 'express';
import {PrismaClient} from '@prisma/client';

const app : express.Application = express();

const prisma = new PrismaClient();

const port = Number(process.env.PORT) || 3001;

app.set('view engine', 'ejs');

app.get('/', async (req : express.Request, res : express.Response) => {
  let kunnat = await prisma.kunta.findMany();
  res.render('index', {kunnat : kunnat});
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
