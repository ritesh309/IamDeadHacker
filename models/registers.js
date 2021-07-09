const mongoose = require( 'mongoose' );
const validators = require( 'validators' );
const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' )

const userSchema = mongoose.Schema( {

    firstname: {
        required: true,
        type: String,
    },
    lastname: {

        type: String,
    },
    username: {
        required: true,
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        required: true,
        type: String,

    },
    conpassword: {

        type: String,

    },
    // tokens: [{

    //     type: String
    // }]

} )

// userSchema.pre( "save", async function ( next ) {
//     if(this.isModified("password") ) {

//      this.password= await bcrypt.hash( this.password, 10 );
//       cosole.log(this.password)
//     }
//     next();
// } )
//generating tokens

// userSchema.methods.generateAuthToken = async function () {
//     try {
//         console.log( this._id );
//         const token = jwt.sign( { _id: this._id.toString() }, "mynameisriteshihavecreatedthiswebsiteonmyowngdgsd" );
//         this.tokens = this.tokens.concat( { token: token } );
//         await this.save();
//         return token;


//     } catch ( error ) {
//         res.send( "The error part" + error );
//         console.log( error );
//     }

// }

const Register = new mongoose.model( "Register", userSchema );

module.exports = Register;