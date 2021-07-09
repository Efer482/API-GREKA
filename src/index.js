const express = require('express');
const app = express();
const morgan = require("morgan"); //Requerir "morgan", dependencia la cual da mensajes de estatus dependiendo de la request.

// version de la api
const vs = '/api/v1/';

// Middlewares
app.use(express.json());	// que reconozca los json
app.use(morgan("combined")); //"combined" da un output log detallado. A diferencia de otras opciones como "dev" que son mas concizas.

// valida si ya existe un puerto por defecto y sino usa el 3000
app.set('port', process.env.PORT || 3000);

// rutas de la api
const booksRoutes = require('./routes/books');
const userRoutes = require('./routes/user');
const comments = require('./routes/comment');
const views = require('./routes/views');
const rating = require('./routes/rating');
const tags = require('./routes/tags');
const premium = require('./routes/premium');
const forum = require('./routes/forum');
const participantForum = require('./routes/participantForum');
const commentForum = require('./routes/commentForum');
const responseForum = require('./routes/responseForum');
const { get } = require('./routes/books');

// ejecuta las rutas de la api
app.use('/books', booksRoutes);
app.use('/user', userRoutes);
app.use('/comment', comments);
app.use('/views', views);
app.use('/rating', rating);
app.use('/tags', tags);
app.use('/premium', premium);
app.use('/forum', forum);
app.use('/participantForum', participantForum);
app.use('/commentForum', commentForum);
app.use('/responseForum', responseForum);
app.use('/', (req, res) => {
	res.status(404).send({
		ok: false,
		message: 'El recurso que busca no existe'
	});
});

app.listen(app.get('port'), () => {
	console.log(`Server on port ${app.get('port')}`);
});
