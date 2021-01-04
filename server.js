import express from 'express';
import bodyParser from 'body-parser';

const app = express();

// Body Parser
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );

// Bring in the routes
import homeRouter from './app/routes/home.routes.js';
import todoRouter from './app/routes/todo.routes.js'

app.use( '/', homeRouter );
app.use( '/todos', todoRouter );

// Define PORT
const PORT = process.env.PORT || 5000;

// Listen to the defined PORT
app.listen( PORT, () => {
	console.log( `Server is running on port ${ PORT }` );
} );
