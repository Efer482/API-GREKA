const jwt           = require('jsonwebtoken');
const connection    = require('../database.js');

let insertRating = (req, res) =>{
    const   {ID, ID_BOOK, ID_USER, RATING}  =   req.body;
    const   query   =   `CALL spInsertRating(?, ?, ?, ?)`;
    connection.query(query, [ID, ID_BOOK, ID_USER, RATING], (err, rows, fields) =>{
        if (!err) {
            res.json({Status: 'Rating agregado'});
        }else{
            res.json({Status: 'Error'});
            console.log(err);

        }
    })
}

let consultRating   =   (req, res) =>{
    const   {ID}    =   req.params;
    const   query   =   `CALL spConsultRating(?)`;
    connection.query(query, [ID], (err, rows, fields) =>{
        if (!err) {
            res.json(rows[0]);
        }else{
            res.json({Status: 'Error'});
            console.log(err);

        }
    })
}

let consultRatings  =   (req, res)  =>{
    const   {ID_BOOK}   =   req.params;
    const   query       =   `CALL   spConsultRatings(?)`;
    connection.query(query, [ID_BOOK],  (err, rows, fields) =>{
        if (!err) {
            res.json(rows[0]);
        }else{
            res.json({Status: 'Error'});
            console.log(err);

        }
    })
}
module.exports  =   {
    insertRating,
    consultRating,
    consultRatings
}