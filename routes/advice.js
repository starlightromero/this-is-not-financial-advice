const express = require('express')

const router = express.Router()

const adviceController = require('../controllers/advice')

router.get('/new', adviceController.getNewAdviceForm)

router.get('/:id/edit', adviceController.getUpdateAdviceForm)

router.get('/', adviceController.getAllAdvice)

router.post('/', adviceController.createAdvice)

router.get('/:id', adviceController.getAdvice)

router.put('/:id', adviceController.updateAdvice)

router.delete('/:id', adviceController.deleteAdvice)

module.exports = router
