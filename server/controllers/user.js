const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt')
const jwt = require('jsonwebtoken')
const sendMail = require('../utils/sendMail')
const crypto = require('crypto')

const register = asyncHandler(async (req, res) => {
    const { email, password, firstname, lastname } = req.body
    if(!email || !password || !firstname || !lastname) 
    return res.status(400).json({
        success: false,
        mes: 'Missing input'
    })
    const user = await User.findOne({email})
    if(user) throw new Error('User Existed')
    else {
        const newUser = await User.create(req.body)
        return res.status(200).json({
            success: newUser ? true : false,
            mes: newUser ? 'Register successfully' : 'Something wrong'
        }) 
    }
})
//Refresh token: cấp mới accessToken
//Access token: xác thực người dùng và phân quyền người dùng
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if(!email || !password ) 
    return res.status(400).json({
        success: false,
        mes: 'Missing inputs'
    })
    const response = await User.findOne({ email })
    if(response && await response.isCorrectPassword(password)) {
        // tách password và role ra khỏi reponse
        const { password, role, refreshToken, ...userData } = response.toObject()
        const accessToken = generateAccessToken(response._id, role)
        const newRefreshToken = generateRefreshToken(response._id)
        //Lưu refresh token vào DB
        await User.findByIdAndUpdate(response.id, { refreshToken: newRefreshToken }, { new: true })
        //Lưu refresh token vào cookie
        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 7*24*60*60*1000 })
        return res.status(200).json({
            success: true,
            accessToken,
            userData
        })
    }else {
        throw new Error('Invalid credentials!')
    }
})

const getCurrent = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const user = await User.findById(_id).select('-refreshToken -password -role')
    return res.status(200).json({
        success: user ? true : false,
        rs: user ? user : 'user not found'
    })
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    // const { _id } = 
    if(!cookie && !cookie.refreshToken) throw new Error('No refresh token in cookie')
    const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET)

    const response = await User.findOne({_id: rs._id, refreshToken: cookie.refreshToken})
    return res.status(200).json({
        success: response ? true : false,
        newAccessToken: response ? generateAccessToken(response._id, response.role) : 'Refresh Token not match'
    })
})

const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    if(!cookie || !cookie.refreshToken) throw new Error('Refresh token does not exist')
    // xóa refresh token ở db
    await User.findOneAndUpdate({refreshToken: cookie.refreshToken}, {refreshToke: ''}, {new: true})
    // xóa refresh token ở cookie trình duyệt
    res.clearCookie('refreshToken', {
        httpOnly: true,
        securet: true
    })
    return res.status(200).json({
        success: true,
        mes: 'Logout Done'
    })
})
// client gửi email
// server check email có hợp lệ hay không => gửi mail + kèm theo link (password change token)
// client check mail và click vào link mình đã gửi
// client gưi api kèm token 
// check token có giống với token mà server gửi mail hay không?
// change password

const forgotPassword = asyncHandler((async(req, res) => {
    const {email} = req.query
    if(!email) throw new Error('Missing Email')
    const user = await User.findOne({email})
    if(!user) throw new Error('User not found')
    const resetToken = user.createPasswordChangedToken()
    await user.save()

    const html = `Please click the link below to change your password. Link expires after 15mins from now. <a href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>Click here</a>`
    
    const data = {
        email,
        html
    }

    const rs = await sendMail(data)
    return res.status(200).json({
        success: true,
        rs
    })
}))

const resetPassword = asyncHandler(async(req, res) => {
    const { password, token } = req.body
    if(!password || !token) throw new Error('Missing inputs')
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({passwordResetToken, passwordResetExpires: {$gt: Date.now()}})
    if(!user) throw new Error('Invalid reset token')
    user.password = password
    user.passwordResetToken = undefined
    user.passwordChangedAt = Date.now()
    user.passwordResetExpires = undefined
    await user.save()
    return res.status(200).json({
        success: user ? true : false,
        mes: user ? 'Update password' : 'Something went wrong'
    })
})

const getUsers = asyncHandler(async (req, res) => {
    const response = await User.find().select('-refreshToken -password -role')
    return res.status(200).json({
        success: response ? true : false,
        users: response
    })
})

const deleteUser = asyncHandler(async (req, res) => {
    const { _id } = req.query
    if(!_id) throw new Error('Missing input')
    const response = await User.findByIdAndDelete(_id)
    return res.status(200).json({
        success: response ? true : false,
        deletedUser: response ? `User with email ${response.email} deleted` : 'No user deleted'
    })
})

const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user
    if(!_id || Object.keys(req.body).length === 0) throw new Error('Missing input')
    const response = await User.findByIdAndUpdate(_id, req.body, {new:true}).select('-password -role')
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'Something went wrong'
    })
})

const updateUserByAdmin = asyncHandler(async (req, res) => {
    const { uid } = req.params
    if(Object.keys(req.body).length === 0) throw new Error('Missing input')
    const response = await User.findByIdAndUpdate(uid, req.body, {new:true}).select('-password -role -refreshToken')
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'Something went wrong'
    })
})

module.exports = {
    register,
    login,
    getCurrent,
    refreshAccessToken,
    logout,
    forgotPassword,
    resetPassword,
    getUsers,
    deleteUser,
    updateUser,
    updateUserByAdmin
}