const PORT = process.env.PORT || 3000;

const express = require('express');

const app = express();
app.use(express.static('public'));

app.use(express.json());


app.post('/clicks', async (request, response) => {

  const {userClicks} = request.body;

  response.json{ click: 'tracked' };
});


app.listen(PORT, () =>
  console.log(`Server is up and running at port ${PORT} 🚀`)
);
