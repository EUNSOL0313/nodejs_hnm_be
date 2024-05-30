const User = require('../model/User')
const bcrypt = require('bcryptjs')

const userController = {}

//회원가입 기능
userController.createUser = async (req, res) => {
   try {
      const { email, name, password, level } = req.body

      const user = await User.findOne({ email })
      if (user) {
         throw new Error('이미 가입이 된 유저 입니다.')
      }

      // password 암호화(10회)
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, salt) //hash 변수선언
      console.log('hash', hash) //암호화 확인

      //회원 권한 level
      const userLevel = level ? level : 'customer'

      //유저 생성
      const newUser = new User({ email, name, password: hash, level: userLevel })

      //회원정보 저장
      await newUser.save()
      console.log('### newUser', newUser)

      return res.status(200).json({ status: 'success' })
   } catch (error) {
      res.status(400).json({ status: 'fail', error: error.message })
   }
}
module.exports = userController
