const multer = require('multer');
const connection  = require('../database.js');

const storage = multer.diskStorage({
    destination: 'uploads/books',
    filename: function(req, file, cb){
        cb('', Date.now() + file.originalname + '.' + mimeTyps.extension(file.mimetype));
    }
})

const upload = multer({
    storage: storage
})

let insertBook   =   (req, res)    =>{
    const {ID, NAME, DESCRIPTION, ID_AUTHOR} = req.body;
    const query = `CALL spInsertBook(?, ?, ?, ?)`;
    connection.query(query, [ID, NAME, DESCRIPTION, ID_AUTHOR], (err, rows, fields) => {
        if(err) throw err
            res.json({Status: 'Libro agregado'})
    });
}

let uploadImg   =   (req, res)  =>{
    
}

let consultBooks    =   (req, res)  =>{
    const query = `CALL spConsultBooks()`;
    connection.query(query, null, (err, rows, fields) => {
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    })
}

let consultBook =   (req, res)  =>{
    const { id } = req.params;
    const query = `CALL spConsultBook(?)`;
    connection.query(query, [id], (err, rows, fields) =>{
            if(err) throw err
                if(rows[0]){
                    res.json(rows[0]);
                }else{
                    res.json({Status: 'El libro no existe'})
                }
    })
}


let consultTags =   (req, res)  =>{
    const { id } = req.params;
    const query = `CALL spConsultTags(?)`;
    connection.query(query, [id], (err, rows, fields) => {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
}

let updateBook =   (req, res)   =>{
    try{
        const { NAME, DESCRIPTION, ID_AUTHOR} = req.body;
        const query = 'CALL spUpdateBook(?, ?, ?, ?)';
        connection.query(query, [ID, NAME, DESCRIPTION, ID_AUTHOR], (err, rows, fields) =>{
            if(!err){
                res.json({Status: 'Libro agregado'})
            }else{
                console.log(err);
            }
        });
    }catch(err){
        console.log(err);
    }
}
module.exports =    {
    uploadImg,
    insertBook,
    consultBooks,
    consultBook,
    consultTags,
    updateBook
}