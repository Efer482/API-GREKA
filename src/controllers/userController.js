const jwt           = require('jsonwebtoken');
const connection    = require('../database.js');
const multer = require('multer');
let user;
const storage = multer.diskStorage({
    destination: 'uploads/users',
    filename: function(req, file, cb){
        cb('', Date.now() + file.originalname + '.' + mimeTyps.extension(file.mimetype));
    }
})
const upload = multer({
    storage: storage
})

//Consultar un usuario especifico con la ID de este.
let consultUser = (req, res) => {
    const query = `CALL spConsultUser(?)`;      //Procedimiento almacenado.
    const {ID}  = req.params;                   //Request el parametro ID.

    //Obtener JSON de el usuario especificado
    connection.query(query, [ID], (err, rows, fields) =>{
            if(err) throw err
                if(rows[0]){
                    res.json(rows[0]);
                }else{
                    res.json({Status: 'El usuario no existe'})
                }
    })

}

let signUp = (req, res) =>{
    const query = `CALL spInsertUser(?, ?, ?, ?, ?)`;
    const {CLAVE, EMAIL, NICKNAME, ENTRYDATE, ROL } = req.body;
    var USER_ID;
    connection.query(query, [CLAVE, EMAIL, NICKNAME, ENTRYDATE, ROL], (err, rows, fields) => {
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
    const query = 'CALL spInsertIMG(?, ?,)';
    connection.query(query, [ID, PROFILE_IMG], (err, rows, fields) =>{
        if(!err){
            res.json({Status: 'Imagen agregada'});
        }else{
            res.json({Status: 'error'});
        }
        console.log(err);
    });
    upload.single('file')
    
    res.json(req.file)
};

let login = (req, res) =>{
    let user;
    const query = `CALL spLoginUser(?, ?)`;
    const { email, clave } = req.params;
    connection.query(query, [email, clave], (err, rows, fields) => {
        if(!err){
            login.user = (rows);
            
        }else{
            console.log(err);
        }
    });
    setTimeout(() =>{
            jwt.sign({user: login.user}, 'secretkey', /*{expiresIn: '32s'},*/ (err, token) =>{
        res.json({
            token
        });
    });
    }, 1000)
};

let update = (req, res) =>{
    const query = `CALL spUpdateUser(?, ?, ?, ?)`;
    const { ID, NICKNAME, EMAIL, CLAVE } = req.body;
    connection.query(query, [ID, NICKNAME, EMAIL, CLAVE], (err, rows, fields) => {
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
    const bearerHeader  =  req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){
        const token  =   bearerHeader.split(" ")[0];
        req.token = token;
        next();
    }else{
        res.sendStatus(403);
    }
}

module.exports = {
    consultUser,
    signUp,
    signUpIMG,
    login,
    update,
    verifyToken
}