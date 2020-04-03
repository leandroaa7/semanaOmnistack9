const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' //referencia do model User
    }
}, {
    timestamps: true,
    toJSON: { // toda vez que um Spot for convertido em json irá calcular os virtuals
        virtuals: true
    }
});

//virtual elementos que não estão no banco mas podem ser gerados
SpotSchema.virtual('thumbnail_url').get(function () {
    // return `http://localhost:3333/files/${this.thumbnail}`
    //192.168.1.39
    return `http://192.168.1.39:3333/files/${this.thumbnail}`

});

module.exports = mongoose.model('Spot', SpotSchema);