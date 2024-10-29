const user = require('./mongoos/modules/user_acc')
const Userlogin = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json('username and password requireded.....')
    }
    try {

        const existinguser = await user.findOne({ username })
        if (!existinguser) {
            return res.status(400).json("User name not found create the account...")
        }

        const userpassword = await existinguser.password
        if (userpassword === password) {
            return res.status(200).json("Login Success full...")
        } else {
            return res.status(404).json("Incorrect password...")
        }

    }
    catch (error) {
        res.status(500).json("Refresh the page...")
    }

}

module.exports = Userlogin;
