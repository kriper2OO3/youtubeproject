const ApiError = require('../error/ApiError')
const {Video} = require('../models/Video')
const Uuid = require('uuid')
const fs = require('fs')
const {User} = require('../models/User')
const pathlib = require('path')

class VideoController {
    async getVideos(req, res, next){
        try {
            const videos = await Video.findAll({
                attributes: ['name', 'path'],
                include: [{
                    model: User,
                    as: 'creator',
                    attributes: ['login']
                }]
            })
            return res.json(videos)
        } catch (e) {
            console.log(e)
        }
    }
    async getVideo(req, res, next){
        try {
            const link = req.params.link
            console.log(link)
            const videoData = await Video.findOne({
                attributes: ['name', 'description', 'path'],
                where: {path: link},
                include: [{
                    model: User,
                    as: 'creator',
                    attributes: ['login']
                }]
            });
            return res.json(videoData)
        } catch (e) {
            return next(ApiError.internal('Такое видео не найдено'))
        }
    }
    async getYourVideos(req, res, next){
        try {
            const login = req.user.id
            const videos = await Video.findAll({
                attributes: ['name', 'path'],
                where: {idCreator: login},
                include: [{
                    model: User,
                    as: 'creator',
                    attributes: ['login']
                }]
            })
            return res.json(videos)
        } catch (e) {
            console.log(e)
            return next(ApiError.internal('Ошибка загрузки видео'))
        }
    }
    async uploadVideo(req, res, next){
        try {
            const idCreator = req.user.id
            const {name, description} = req.body
            const videoFile = req.files.video
            const previewFile = req.files.preview
            const path = Uuid.v4()
            const video = await Video.create({name, description, path, idCreator})
            const videoPath = pathlib.join(process.env.VIDEOSPATH, `${path}.mp4`)
            const previewPath = pathlib.join(process.env.PREVIEWPATH, `${path}.png`)
            await videoFile.mv(videoPath)
            await previewFile.mv(previewPath)
            return res.json({message: "Видео было успешно загружено"})
        } catch (e) {
            console.log(e)
            return next(ApiError.internal('Ошибка загрузки видео'))
        }
    }
}

module.exports = new VideoController()
