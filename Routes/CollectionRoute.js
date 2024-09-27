const cred = require('../Models/Employee');
const router = require("express").Router();

router.get("/get", ( req, res ) => {
    cred.find({})
        .then( data => res.json(data))
        .catch( err => res.status(500).json({error: err.message}))
})

router.delete('/delete', async ( req, res ) => {
    try{
        cred.deleteMany({});
        res.status(200).send({ message: 'All records deleted successfully.' });
    } catch ( error ) {
        res.status(500).send({ message: 'Error deleting records.', error: error.message });
    }
})

module.exports = router;