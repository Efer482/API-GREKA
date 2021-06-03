const express   = require('express');
const app       = express();

const vs        = "/api/v1/";

// Middlewares
app.use(express.json());

app.set('port', process.env.PORT || 3000);

const booksRoutes   =   require("./routes/books");
const userRoutes    =   require("./routes/user");
const comments      =   require("./routes/comment");
const views         =   require("./routes/views");
const rating        =   require("./routes/rating");
const tags          =   require("./routes/tags");
const premium       =   require("./routes/premium");

app.use('/books',   booksRoutes);
app.use('/user',    userRoutes);
app.use('/comment', comments);
app.use('/views', views);
app.use('/rating', rating);
app.use('/tags',   tags);
app.use('/premium', premium);
app.use('/', (req, res) => {
    res.status(404).send({
        ok: false, message: 'El recurso que busca no existe'
    })
});

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
