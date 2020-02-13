const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tvSchema = new Schema({
    title: String,
    overview: String,
    poster_path: String,
    popularity: Number,
    tags: [{ 
        type: Schema.Types.ObjectId, ref: 'Tags'
    }]
})

const Tv = mongoose.model('Tvs', tvSchema);

module.exports = Tv;