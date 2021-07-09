const express = require( 'express' );           //importing Express Module
const app = express();                      //calling the express module in app
const path = require( "path" );                //To add path in express module
const pug = require( "pug" );
app.use( express.json() );               //To access files in express modulea
app.use( express.urlencoded( { extended: false } ) );  //To access
//Adding Body Parser To take data from signup page...........................................
var bodyParser = require( 'body-parser' );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );
const hostname = '165.232.185.17';
const bcrypt = require( 'bcrypt' );
const jwt = require( "jsonwebtoken" )
const PORT = process.env.PORT || 8000;     //defining the port to connect to server
const Register = require( "./models/registers" )
require( "./db/connectdb" );                  //importing db file to connect with the server
const validators = require( "validators" );

app.use( '/static', express.static( "static" ) )   //serving the static files
app.set( 'view engine', 'pug' )
//Now set the views directory
app.set( 'views', path.join( __dirname, 'views' ) );

app.get( '/', ( req, res ) => {
    res.status( 202 ).render( 'index' )
} );

app.get( '/login', ( req, res ) => {
    res.render( 'login' )
} );

app.get( '/signup', ( req, res ) => {
    res.render( 'registration' )
} );
app.get( '/home', ( req, res ) => {
    res.render( 'index' )
} );


app.post( "/register", async ( req, res ) => {
    try {

        const pass = req.body.password;
        const conpass = req.body.conpassword;

        if ( pass === conpass ) {
            const users = new Register( {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                email: req.body.email,
                password: pass,
                conpassword: conpass,
                // token: token
            } )
            // console.log( "The suucesspart" + users );
            // const token = await users.generateAuthToken();
            // console.log( "The token part" + token )
            const registered = await users.save();
            // console.log( "The is saved data part" + registered )
            res.render( 'login' );


        } else {
            res.status( 505 ).send( "Password Not Matched || Try Again " )
        };

    } catch ( err ) {
        res.status( 404 ).send( 'You are not Registered || Try again' )
    };

} );

app.post( '/login', async ( req, res ) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await Register.findOne( { email } );
        if ( useremail.password === password ) {
            res.status( 202 ).render( 'indexHome' )
        } else {
            res.send( "Enter||Valid ||Email ||or ||Passphrase" + "||TRY ||AGAIN||" )
            console.alert( "Please enter Valid EMAIL || PASSWORD" )
        }

    } catch ( err ) { res.status( 400 ).send( "Error In Login ! Check mail and Password" ) }

} )


//calling the Port to run The server
app.listen( PORT, hostname, () => {
    console.log( `Server running at port ${ PORT }` )
} );
