// Database
import dbConfig from '../config/db.config.js';
import pg from 'pg';
const { Client } = pg;
import { v4 as uuidv4 } from 'uuid';

export default class TodoController {
	// Connection to db
	static client;

	static async connectToDB() {
		this.client = new Client( dbConfig );
		await this.client.connect();
	}

	// Get all todos
	static findAll = async ( req, res ) => {
		try {
			await this.connectToDB();
			const stmt = 'SELECT * FROM public.todos'
			const { rows } = await this.client.query( stmt );
			res.status( 200 ).send( rows );
		} catch ( err ) {
			res.status( 500 ).send( err );
		} finally {
			await this.client.end();
		}
	}

	// Get single todo
	static findOne = async ( req, res ) => {
		try {
			const id = req.params.id;
			await this.connectToDB();
			const stmt = `SELECT * FROM public.todos WHERE uuid = '${ id }'`;
			const { rows } = await this.client.query( stmt );
			res.status( 200 ).send( rows );
		} catch ( err ) {
			res.status( 500 ).send( err );
		} finally {
			await this.client.end();
		}
	}

	// Create a new record
	static create = async ( req, res ) => {
		try {
			const uuid = uuidv4();
			const title = req.body.title;
			const description = req.body.description;
			const done =  req.body.done;
			await this.connectToDB();
			const stmt = `INSERT INTO public.todos VALUES ( '${ uuid }', '${ title }', '${ description }',  ${ done } )`;
			await this.client.query( stmt );
			res.status( 200 ).send( { message: `Added ${ title }`} );
		} catch ( err ) {
			res.status( 500 ).send( err );
		} finally {
			await this.client.end();
		}
	}

	// Update a record
	static update = async ( req, res ) => {
		try {
			const id = req.params.id;
			const title = req.body.title;
			const description = req.body.description;
			const done =  req.body.done;
			await this.connectToDB();
			const stmt = `UPDATE public.todos SET title = '${ title }', description = '${ description }', done = ${ done } WHERE uuid = '${ id }'`;
			await this.client.query( stmt );
			res.status( 200 ).send( { message: `Updated uuid: ${ id }` } );
		} catch ( err ) {
			res.status( 500 ).send( { message: `Update failed: ${ err }` } );
		} finally {
			await this.client.end();
		}
	}

	// delete completed records
	static deleteAll = async ( req, res ) => {
		try {
			const id = req.params.id;
			await this.connectToDB();
			const stmt = 'DELETE FROM public.todos WHERE done = true';
			await this.client.query( stmt );
			res.status( 200 ).send( { message: 'Deleted all completed todos' } );
		} catch ( err ) {
			res.status( 500 ).send( { message: `Delete all failed: ${ err }` } );
		} finally {
			await this.client.end();
		}
	}

	// delete a single record
	static deleteOne = async ( req, res ) => {
		try {
			const id = req.params.id;
			await this.connectToDB();
			const stmt = `DELETE FROM public.todos WHERE uuid = '${ id }'`;
			await this.client.query( stmt );
			res.status( 200 ).send( { message: `Deleted uuid: ${ id }` } );
		} catch ( err ) {
			res.status( 500 ).send( { message: `Delete failed: ${ err }` } );
		} finally {
			await this.client.end();
		}
	}
}
