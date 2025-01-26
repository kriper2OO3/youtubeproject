const Router = require('express')
const router = new Router()
const videoController = require('../controllers/videoController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/videos', videoController.getVideos)
router.get('/video/:link', videoController.getVideo)
router.get('/yourvideos', authMiddleware, videoController.getYourVideos)
router.post('/newvideo', authMiddleware, videoController.uploadVideo)

module.exports = router