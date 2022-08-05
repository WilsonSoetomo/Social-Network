const router = require("express").Router();
const { User, Thought } = require("../../models");
const filter = {};

router.get("/", (req, res) => {
  Thought.find()
    .then((thoughts) => {
      res.json(thoughts);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.post("/", (req, res) => {
  Thought.create(req.body)
    .then((thought) => {
      User.findOneAndUpdate({});
      res.json(thought);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//`GET` to get a single thought by its `_id`
router.get("/:id",(req,res) =>{
    Thought.findById(req.params.id)
    .then((thought) => {
        res.json(thought);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

//POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)
router.post("/:id", (req, res) => {
    Thought.create(req.body)
    .then((thought) => {
        User.findByIdAndUpdate(req.params.id, {$push: {thoughts: thought._id}})
        .then(() => {
            res.json(thought);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        }
        );
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    }
    );
}
);

//`PUT` to update a thought by its `_id`

router.put("/:id", (req,res) =>{
    Thought.findByIdAndUpdate(req.params.id,req.body)
    .then((thought) => {
        res.json(thought);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    }
    );
})

//`DELETE` to remove a thought by its `_id`

router.delete("/:id", (req,res) =>{
    Thought.findByIdAndRemove(req.params.id)
    .then((thought) => {
        res.json(thought);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    }
    );
});

//`/api/thoughts/:thoughtId/reactions`

router.post("/:thoughtId/reactions", (req,res) =>{
    Thought.findByIdAndUpdate(req.params.thoughtId, {$push: {reactions: req.body}})
    .then((thought) => {
        res.json(thought);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    }
    );
});

//`POST` to create a reaction stored in a single thought's `reactions` array field
router.post("/:thoughtId/reactions", (req,res) =>{
    Thought.create(req.params.thoughtId, {$push: {reactions: req.body}})
    .then((thought) => {
        res.json(thought);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    }
    );
});

//DELETE` to pull and remove a reaction by the reaction's `reactionId` value
router.delete("/:thoughtId/reactions/:reactionId", (req,res) =>{
    Thought.findByIdAndUpdate(req.params.thoughtId, {$pull: {reactions: {_id: req.params.reactionId}}}).then((thought) => {
        res.json(thought);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    }
    );
});

module.exports = router;

