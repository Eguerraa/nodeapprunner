var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({    
    prod_name: String,
    server_address: String,
    prod_desc: String,
    prod_user: String,
    server_mem: Number,
    server_cpu: String,
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', ProductSchema);