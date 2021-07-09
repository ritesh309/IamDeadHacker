//Connecting Mongo Db With the server using Mongoose ----------------------------------------------------------------
const mongoose = require( 'mongoose' );
//mongodb://localhost:27017/HackerUsers
mongoose.connect( "mongodb://localhost:27017/HackerUsers", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
} ).then( () => {
    console.log( ` Connected to MongoDB---` )
} ).catch( ( err ) => {
    console.log( `MongoDB Error!!! connection` )
} )