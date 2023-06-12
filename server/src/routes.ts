const router = require('express').Router();
const apiRouter = require('express').Router();
const controller = require('./controller');

// api routes
apiRouter.get('/word', controller.word);
apiRouter.get('/rank', controller.rank);
apiRouter.get('/rank/:score', controller.rank);
apiRouter.post('/rank', controller.rank);

// link all routes
router.use('/api', apiRouter);
router.use('/', controller.heathCheck);

module.exports = router;
