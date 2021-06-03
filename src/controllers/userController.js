const jwt           = require('jsonwebtoken');
const connection    = require('../database.js');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: 'uploads/users',
    filename: function(req, file, cb){
        cb('', Date.now() + file.originalname + '.' + mimeTyps.extension(file.mimetype));
    }
})
const upload = multer({
    storage: storage
})

let signUp = (req, res) =>{
    const query = `CALL spInsertUser(?, ?, ?, ?, ?, ?, ?)`;
    const {CLAVE, EMAIL, NICKNAME, NAME, APELLIDO, DATA, ROL } = req.body;
    var USER_ID;
    connection.query(query, [CLAVE, EMAIL, NICKNAME, NAME, APELLIDO, DATA, ROL], (err, rows, fields) => {
        if(!err){
            USER_ID = rows[0]
            res.json({Status: 'Usuario agregado'})

        }else{
            if(err.sqlMessage == `Duplicate entry '${EMAIL}' for key 'EMAIL'`){
                res.json({Status: 'Correo existente'})
            }else if(err.sqlMessage == `Duplicate entry '${NICKNAME}' for key 'NICKNAME'`){
                res.json({Status: 'Usuario existente'})
            }
            console.log(err);
        }
    })
    return USER_ID;
}

let signUpIMG   = (req, res) =>{
    const {ID}  = req.body
    let PROFILE_IMG
    if(!PROFILE_IMG){
        PROFILE_IMG =   "PROFILE_DEFAULT.jpg";
    }
    const query = `CALL 	spInsertIMG(?, ?,)`;
    connection.query(query, [ID, PROFILE_IMG], (err, rows, fields) =>{
        if(!err){
            res.json({Status: 'Imagen agregada'})
        }else{
            res.json({Status: 'error'})
        }
        console.log(err);
    })
    upload.single('file')
    
    res.json(req.file)
}
let login = (req, res) =>{
    let user;
    const query = `CALL spLoginUser(?, ?)`;
    const { email, clave } = req.params;
    connection.query(query, [email, clave], (err, rows, fields) => {
        if(!err){
            user = rows[0]
        }else{
            console.log(err);
        }
    })
    jwt.sign({user: user}, 'secretkey', /*{expiresIn: '32s'},*/ (err, token) =>{
        res.json({
            token:  token
        }
)
    })
}

let update = (req, res) =>{
    const query = `CALL spUpdateUser(?, ?, ?, ?, ?, ?, ?, ?)`;
    const { ID, CLAVE, EMAIL, NICKNAME, NAME, APELLIDO, DATA, ROL } = req.body;
    connection.query(query, [ID, CLAVE, EMAIL, NICKNAME, NAME, APELLIDO, DATA, ROL], (err, rows, fields) => {
        if(!err){
            res.json({Status: 'Usuario actualizado'})
        }else{
            if(err.sqlMessage == `Duplicate entry '${EMAIL}' for key 'EMAIL'`){
                res.json({Status: 'Correo existente'})
            }else if(err.sqlMessage == `Duplicate entry '${NICKNAME}' for key 'NICKNAME'`){
                res.json({Status: 'Usuario existente'})
            }
            console.log(err);
        }
    })
}
// Authorization: Bearer <token>

function verifyToken(req, res, next){
    const bearerHeader  =   req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){
        const token  =   bearerHeader.split(" ")[1];
        req.token = token;
        next();
    }else{
        res.sendStatus(403);
    }
}

module.exports = {
    signUp,
    signUpIMG,
    login,
    update,
    verifyToken
}