const user = require('./mongoos/modules/user_acc')
const User = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.json('username and password required...')
    }

    try {
        const existinguser = await user.findOne({ username })
        if (existinguser) {
            return res.status(400).json("You have a account OR This user name already Taken...")
        }
        const useracc = new user({ username, password })
        const saved = await useracc.save()
        return res.status(201).json('Sucessfully created...')
    } catch (error) {
        return res.status(500).json("please refresh the app...")
        console.log(error.message);

    }

}

module.exports = User;