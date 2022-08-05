const router = require('express').Router();
const { User, Thought } = require('../../models');

router.get('/', (req, res) => {
    User.find().then(thoughts => {
        res.json(thoughts);
    }).catch((err)=>{
        console.log(err);
        res.status(500).json(err);
    })
});
router.post('/', (req, res) => {
    User.create(req.body).then(thought => {
        res.json(thought);
    }).catch((err)=>{
        console.log(err);
        res.status(500).json(err);
    }
    )
});



module.exports = router;