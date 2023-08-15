const router = require('express').Router()
const ctrls = require('../controllers/insertData')

router.post('/',  ctrls.insertProductData)
router.post('/cate',  ctrls.insertCategory)



module.exports = router
