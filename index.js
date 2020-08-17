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
    whatGotClicked NOT NULL, 
    pageX NOT NULL, 
    pageY NOT NULL,
    dataId NOT NULL,
    timestamp NOT NULL,
    userId NOT NULL,

  );    
`);




app.post('/clicks', async (request, response) => {

  const {whatGotClicked, pageX, pageY, dataId, timestamp, userId} = request.body;

  const result = await db.query(
    `INSERT INTO clicks (whatGotClicked, pageX, pageY, dataId, timestamp, userId) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
    [whatGotClicked, pageX, pageY, dataId, timestamp, userId]
  );

  response.json{ click: 'tracked' };
});


app.listen(PORT, () =>
  console.log(`Server is up and running at port ${PORT} 🚀`)
);
