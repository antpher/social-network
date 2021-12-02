const router = require('expresss').Router();
const userRoutes = require('./users');
const thoughtRoutes = require('./thought')

router.use('/users', userRoutes);
router.use('/thought', thoughtRoutes);

module.exports = router;
