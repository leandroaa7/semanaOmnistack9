const Booking = require('../models/Booking');


module.exports = {
    async store(req, res) {
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date
        });

        //popula com os dados do relacionamento
        //do spot e user, ou seja,
        // cria um objeto com os dados de usuário e spot
        await booking
            .populate('spot')
            .populate('user')
            .execPopulate();

        return res.json(booking);
    }
}