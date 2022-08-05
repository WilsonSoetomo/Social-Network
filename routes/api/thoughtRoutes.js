const router = require('express').Router();
const { User, Thought } = require('../../models');
const filter = {}

router.get('/', (req, res) => {
    Thought.find().then(thoughts => {
        res.json(thoughts);
    }).catch((err)=>{
        console.log(err);
        res.status(500).json(err);
    })
});
router.post('/', (req, res) => {
    Thought.create(req.body).then(thought => {
        User.findOneAndUpdate({})
        res.json(thought);
    }).catch((err)=>{
        console.log(err);
        res.status(500).json(err);
    }
    )
});



module.exports = router;
