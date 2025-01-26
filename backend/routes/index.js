const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const videoRouter = require('./videoRouter')

router.use('/', userRouter)
router.use('/', videoRouter)

module.exports = router