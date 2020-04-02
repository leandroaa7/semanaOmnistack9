const User = require('../models/User');

// index, show, store, update, destroy
module.exports = {

    async index(req, res) {
        const users = await User.find();
        return res.json(users);
    },
    show() {},
    async store(req, res) {
        const { email } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({ email })
        } else {
            return res.json(user);
        }
    },
    update() {},
    destroy() {},

}