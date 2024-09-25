const cred = require('../Models/Employee');
const router = require("express").Router();

router.get("/getEmployeeDetails", ( req, res ) => {
    cred.find({})
        .then( data => res.json(data))
        .catch( err => res.status(500).json({error: err.message}))
})

module.exports = router;