const Advice = require('../models/advice')

exports.getNewAdviceForm = (req, res) => {
  res.status(200).render('advice-new')
}

exports.getUpdateAdviceForm = async (req, res) => {
  try {
    const advice = await Advice.findById(req.params.id)
    res.status(200).render('advice-edit', { advice: advice })
  } catch (err) {
    throw new Error(err)
  }
}

exports.getAllAdvice = async (req, res) => {
  try {
    const advice = await Advice.find().lean()
    res.status(200).render('advice-index', { advice: advice })
  } catch (err) {
    throw new Error(err)
  }
}

exports.getAdvice = async (req, res) => {
  try {
    const advice = await Advice.findById(req.params.id).lean()
    res.status(200).render('advice-detail', { advice: advice })
  } catch (err) {
    throw new Error(err)
  }
}

exports.createAdvice = async (req, res) => {
  try {
    const advice = new Advice(req.body)
    await advice.save()
    res.redirect(`/${advice._id}`)
  } catch (err) {
    throw new Error(err)
  }
}

exports.updateAdvice = async (req, res) => {
  try {
    const advice = await Advice.findByIdAndUpdate(req.params.id, req.body)
    res.redirect(`/${advice._id}`)
  } catch (err) {
    throw new Error(err)
  }
}

exports.deleteAdvice = async (req, res) => {
  try {
    await Advice.findByIdAndRemove(req.params.id)
    res.redirect('/')
  } catch (err) {
    throw new Error(err)
  }
}
