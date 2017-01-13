const app = require('express')();

app.get('/', (req, res) => {
  res.send(`<h1>A-O RIVER!</h1>
            <img src="http://i.giphy.com/26tkn6aLlSimb9azS.gif" alt="A-O River!" />`);
});

app.listen(process.env.PORT);
