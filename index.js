const PORT = process.env.PORT || 3000;

const express = require('express');
const pg = require('pg');

const app = express();
const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

app.use(express.static('public'));
app.use(express.json());

db.query(`
  CREATE TABLE IF NOT EXISTS clicks(
    id SERIAL PRIMARY KEY,
    whatGotClicked VARCHAR(128) NOT NULL, 
    pageX INT NOT NULL, 
    pageY INT NOT NULL,
    dataId VARCHAR(128) NOT NULL,
    timestamp INT NOT NULL,
    userId VARCHAR(128) NOT NULL

  );    
`);

app.post('/clicks', async (request, response) => {
  const {
    whatGotClicked,
    pageX,
    pageY,
    dataId,
    timestamp,
    userId,
  } = request.body;

  await db.query(
    `INSERT INTO clicks (whatGotClicked, pageX, pageY, dataId, timestamp, userId) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
    [
      whatGotClicked.slice(0, 128),
      pageX,
      pageY,
      dataId,
      timestamp,
      Number(userId),
    ]
  );

  response.json({ clicked: 'event' });
});

app.listen(PORT, () =>
  console.log(`Server is up and running at port ${PORT} 🚀`)
);
