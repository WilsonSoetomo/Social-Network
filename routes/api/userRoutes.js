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
//`GET` a single user by its `_id` and populated thought and friend data
router.get("/:id", (req, res) => {
    User.findById(req.params.id)
      .populate("thought")
      .then((thought) => {
        res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  //`PUT` to update a user by its `_id`
  router.put("/:id", (req, res) => {
      User.findByIdAndUpdate(req.params.id, req.body)
      .then((user) => {
          res.json(user);
      }).catch((err) => {
          console.log(err);
          res.status(500).json(err);
      }
      );
  }
  );
  //`DELETE` to remove user by its `_id`
    router.delete("/:id", (req, res) => {
        User.findByIdAndRemove(req.params.id)
        .then((user) => {
            res.json(user);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        }
        );
    }
    );



module.exports = router;