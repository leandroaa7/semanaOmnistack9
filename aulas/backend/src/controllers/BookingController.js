const Booking = require('../models/Booking');
const User = require('../models/User');

module.exports = {

    async index(req, res) {
        const { user_id } = req.headers;
        const { spot_id } = req.params;

        const user = await User.findById(user_id)

        if (!user) {
            return res.status(400).json({ error: 'User does not exists' });
        }

        const books = await Booking.find({ spot: spot_id });
        return res.json(books);
    },
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

        //dono do spot
        const ownerSocket = req.connectedUsers[booking.spot.user];

        if (ownerSocket) {
            req.io.to(ownerSocket).emit('booking_request', booking);
        }

        return res.json(booking);
    }
}