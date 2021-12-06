const { User, Thought } = require('../models');

const thoughtController = {
    getThoughts(req, res) {
        Thought.find({})
            .select('-__V')
            .then(dbData => res.json(dbData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    getThoughtId({ params }, res) {
        Thought.findOne({ thoughtId: params.id })
            .select('-__V')
            .then(dbData => {
                if (!dbData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    createThought({ body }, res) {
        Thought.create(body)
        .then((dbThoughtData) => {
            return User.findOneAndUpdate(
              { _id: body.userId },
              { $push: { thoughts: dbThoughtData._id } },
              { new: true }
            );
          })
          .then(dbData => { res.json(dbData)})
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ thoughtId: params.id }, body, { new: true, runValidators: true })
            .then(dbData => {
                if (!dbData) {
                    res.status(400).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbData);
            })
            .catch(err => res.status(400).json(err));
    },
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ thoughtId: params.id })
            .then(dbData => {
                if (!dbData) {
                    res.status(404).json({ message: 'No thought found with this id! ' });
                    return;
                }
                res.json(dbData);
            })
            .catch(err => res.status(400).json(err));
    }

};

module.exports = thoughtController;