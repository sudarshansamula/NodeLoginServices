var config = require('./index');
var mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
const dbController = {
    connect: () => {
        mongoose.connect(
            config.mongoURL,
            { useNewUrlParser: true },
            (err) => {
                if (err) {
                    console.log(err)
                    console.log('MongoDB Connection Failure');
                } else {
                    console.log('Successfully connected TO MongoDB');
                }
            }
        );
    }
};
module.exports = dbController;
