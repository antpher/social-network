const router = require('express').Router();

const {
    getThoughts,
    getThoughtId,
    createThought,
    updateThought,
    deleteThought,

} = require('../../controllers/thought-controller');

router
    .route('/')
    .get(getThoughts)
    .post(createThought)

router
    .route('/:thoughtId')
    .get(getThoughtId)
    .put(updateThought)
    .delete(deleteThought)

module.exports = router;
