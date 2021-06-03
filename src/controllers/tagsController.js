const jwt           = require('jsonwebtoken');
const connection    = require('../database.js');

let   insertTag     =   (req, res)  =>{
    const   {ID, TAG, ID_BOOK}  =   req.body;
    const   query   =   `CALL   spInsertTag(?,?,?)`;
    connection.query(query, [ID, TAG, ID_BOOK], (err, rows, fields) =>{
        if (!err) {
            res.json({Status: 'Tag agregado'});
        }else{
            res.json({Status: 'Error'});
            console.log(err);
        }
    })
}

let   spConsultTags =   (req, res)  =>{
    const   {ID}    =   req.params;
    const   query   =   `CALL spConsultTags(?)`;
    connection.query(query, [ID], (err, rows, fields)   =>{
        if (!err) {
            res.json(rows[0]);
        }else{
            res.json({Status: 'Error'});
            console.log(err);

        }
    })
}

module.exports  =   {
    insertTag,
    spConsultTags
}