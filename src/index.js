import express from 'express'
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import {join, dirname} from 'path'
import {fileURLToPath} from 'url'
import personasRoutes from './routes/personas.routes.js'
import videojuegosRoutes from './routes/videojuegos.routes.js'

//Aparts
//Initializations
const app = express(); //Permite correr el servidor
const __dirname = dirname(fileURLToPath(import.meta.url));

//Settings
app.set('port', process.env.PORT || 3000); // Puerto. Si la variable de entorno no existe entonces se abre en el puerdo 3000
app.set('views', join(__dirname, 'views')); // config para motor de plantillas, optiene mediante join la carpeta views
app.engine('.hbs', engine({
  defaultLayout: 'main',
  layoutsDir: join(app.get('views'), 'layouts'),                  // Dir donde está cada uno de los layouts
  partialsDir: join(app.get('views'), 'partials'),                // Dir donde está cada uno de los partials
  extname: '.hbs'                                                 // Extensión del motor de plantilla
}));// Config motor de plantillas, se especifica motor de plantilla a usar: .hbs (ext de main,hbs)
app.set('view engine', '.hbs'); //Motor de plantilla configurado y especificado

//Middlewares
app.use(morgan('dev')); // Para ver todas las peticiones del servidor
app.use(express.urlencoded({ extended: false})); // ya que se trabaja con interfaces y formularios
app.use(express.json()); // Ya que se puede trabajar con archivos .json

//Routes
app.get('/', (req, res)=>{
  res.render('index')
}) //Mensaje como json en buscador

app.use(personasRoutes);
app.use(videojuegosRoutes);

//Public files
app.use(express.static(join(__dirname, 'public'))); // carpetas dentro de public que son acceso al público con dir y nombre del archivo

//Run Server
app.listen(app.get('port'), ()=>
    console.log('Server listening on port', app.get('port'))); //clg: console.log(). Se ejecuta app.get para optener la variable port definida en setting 
//con función tipo flecha que manda mensaje por consola que dice: 'Server listening on port' 
