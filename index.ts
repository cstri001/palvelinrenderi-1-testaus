import express from 'express';
import {PrismaClient} from '@prisma/client';

const app : express.Application = express();

const prisma = new PrismaClient();

const port = Number(process.env.PORT) || 3001;

app.set('view engine', 'ejs');

app.get('/', async (req : express.Request, res : express.Response) => {
  let kunnat = await prisma.kunta.findMany({
    orderBy: {
      kunta: 'asc'
    }
  });
  res.render('index', {kunnat : kunnat, sortField: 'kunta', sortOrder: 'asc', hakusana: ''});
})

app.get('/hae', async (req : express.Request, res : express.Response) => {
  // This req.query.enter-text-here is the part in the URL that's like .../hae?hakusana=Mikkeli
  // Force-casting this as string is required to prevent errors here
  
  let { hakusana, sort, order } = req.query as { hakusana?: string; sort?: string; order?: string };

  // Define allowed sorting fields (to prevent injection attacks)
  const allowedFields = ["kunta", "asukkaatYhteensa", "asukkaatMiehet", "asukkaatNaiset"];

  // Validate the sorting field. "!" mark tells Typescript that "I will assure you this will have a value, so stop complaining"
  const sortField = allowedFields.includes(sort || "") ? sort! : "kunta";

  // Validate the sorting order
  const sortOrder = order === "desc" ? "desc" : "asc"; // Defaults to "asc"

  try {
    let whereClause = {};
    if (hakusana) {
      whereClause = {
        kunta: {
          startsWith: hakusana
        },
      };
    }

    let kunnat = await prisma.kunta.findMany({
      where: whereClause,
      orderBy: {
        [sortField]: sortOrder,
      },
    });

    // Ensure hakusana, sortField and sortOrder are always defined in the "index.ejs" file
    res.render("index", { kunnat, sortField, sortOrder, hakusana });
  } catch (error) {
    console.error("Database query failed:", error);
    res.status(500).send("Server error");
  }

})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
