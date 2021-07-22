const express = require('express');
const app = express();
const morgan = require("morgan"); //Requerir "morgan", dependencia la cual da mensajes de estatus dependiendo de la request.
const fs = require("fs"); //Requerir "file-system", dependencia la cual simplifica operaciones con archivos de la API, como escritura y lectura.
const path = require("path"); //Modulo path, viene preinstalado con node.js y es parte de la navegacion de archivos
const pdfGenerator = require("pdfkit"); // Modulo para la creacion de PDFs
const readline = require("readline"); // Modulo readline, viene preinstalado con node.js y es parte de la lectura de consola y mas


readline.emitKeypressEvents(process.stdin); // Leer cuando se presiona las teclas en el teclado

if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}

// Variables de tiempo.
var currentDate = new Date();
var date = currentDate.getFullYear()+'-'+(currentDate.getMonth()+1)+'-'+currentDate.getDate()
var time = currentDate.getHours() + "-" + currentDate.getMinutes() + "-" + currentDate.getSeconds();
var dateTime = date + "_" + time;
const logPath = "./logs/log_" + dateTime + ".pdf"; //Crear PDF con nombre de la fecha actual.

// version de la api
const vs = '/api/v1/';

// Middlewares
app.use(express.json());	// que reconozca los json

//Variable para adjuntar el formato de log de morgan y escribirlo en el archivo "access.log", __dirname se refiere a el directorio en el que se ejecuta el script, en este caso la carpeta "src", por lo que "access.log" se encuentra en src. "{flags: "a"}" se refiere a adjuntar.
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: "a"})

// Variable que inicializa un nuevo generador para el pdf.
let theOutput = new pdfGenerator();

//"combined" da un output log detallado. A diferencia de otras opciones como "dev" que son mas concizas | "stream:accessLogStream" da output a la variable "accessLogStream".
app.use(morgan("combined", {stream:accessLogStream}));

// valida si ya existe un puerto por defecto y sino usa el 3000
app.set('port', process.env.PORT || 3000);

// rutas de la api
const booksRoutes = require('./routes/books'); 											//Libros
const userRoutes = require('./routes/user');												//Usuario
const comments = require('./routes/comment');												//Comentario
const views = require('./routes/views');														//Vistas
const rating = require('./routes/rating');													//Calificacion / rating
const tags = require('./routes/tags');															//Etiquetas
const premium = require('./routes/premium');												//Premium
const forum = require('./routes/forum');														//Forums
const participantForum = require('./routes/participantForum');			//Participante de foro
const commentForum = require('./routes/commentForum');							//Comentario de foro
const responseForum = require('./routes/responseForum');						//Respuestas en foro
const { get } = require('./routes/books');
const { Stream } = require('stream');

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

// Al presionar, en la consola ctrl + b y despues presionar ENTER se ejecuta
process.stdin.on("keypress", (str, key) => {
  if (key.ctrl && key.name === "b") {
    
    //Leer el archivo de los logs en este directorio.
    fs.readFile(__dirname + "/access.log", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      logData = data.toString(); // Transformar lo leido a string.
      
      // Creacion de PDF
      theOutput.pipe(fs.createWriteStream(logPath));
      theOutput.image("./uploads/greka/logo.png", {
        fit: [150, 150],
        align: "center",
      });
      theOutput.text("Server Requests\n", {
        bold: true,
        underline: true,
        align: 'center',
      });
      theOutput.text("\n\n");
      theOutput.text("Morgan logs desde : " + dateTime + "\n -----------------------------", {
        bold: true,
      });
      theOutput.text("\n");
      theOutput.text(logData);
      theOutput.end();

      console.log(logData);
    });

  }
});

// Cuando se presiona crtl + c en la consola se ejecuta esto.
process.on("SIGINT", function () {
  console.log("Señal de interrupcion recibida \n"); // Mostrar en consola confirmacion de el proceso

  //Borrar archivo access.log
  fs.unlink(__dirname + "/access.log", (err) => {
    if (err) throw err;
    console.log(__dirname + "/access.log fue borrado exitosamente"); // Mostrar en consola que fue exitoso borrar el archivo
  });
});
