import express from 'express';
const homeRouter = express.Router();

homeRouter.get( '/', ( req, res ) => {
	res.send( 'Hello from Home route' );
} );

export default homeRouter;
