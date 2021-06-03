const jwt           = require('jsonwebtoken');
const connection    = require('../database.js');

let insertView  =   (req, res) =>{
    const   {ID, ID_BOOK, ID_USER}  =   req.body;
    const   query   =   `CALL spInsertViews(?, ?, ?)`;
    connection.query(query, [ID, ID_BOOK, ID_USER], (err, rows, fields) =>{
        if (!err) {
            res.json({Status: 'View agregada'});
        }else{
            res.json({Status: 'Error'});
            console.log(err);

        }
    })
}

let consultViews    =   (req, res) =>{
    const { ID } = req.params;
    const   query   =   `CALL spConsultViews(?)`;
    connection.query(query, [ID], (err, rows, fields) =>{
        if (!err) {
            res.json(rows[0]);
        }else{
            res.json({Status: 'Error'});
            console.log(err);

        }
    })
}
module.exports  =   {
    insertView,
    consultViews
}