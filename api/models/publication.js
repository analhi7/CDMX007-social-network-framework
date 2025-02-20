var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PublicationSchema = Schema({
    text:String,
    file: String,
    created_at: String,
    user: {
         type:Schema.Types.ObjectId, 
         ref :'User'}
});

module.exports = mongoose.model('Publication', PublicationSchema);