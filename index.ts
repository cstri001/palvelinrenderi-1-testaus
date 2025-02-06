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

app.get('/hae', async (req : express.Request, res : express.Response) => {
  // This req.query.enter-text-here is the part in the URL that's like .../hae?hakusana=Mikkeli
  // Force-casting this as string is required to prevent errors here
  console.log(req.query.hakusana)
  let hakusana : string = req.query.hakusana as string;
  let kunnat = await prisma.kunta.findMany({
    where: {
      kunta: {
        startsWith: hakusana
      }
    }
  })

  // Remember to send a response here as well, with the newly fetched database info!
  res.render('index', {kunnat: kunnat})
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
