'use strict';

module.exports = function(app) {
    const controller = require('../controllers/user_entries')

    app.route('/user-entries')
        .get(controller.index)
        .post(controller.create)
    
    app.route('/user-entries/:id')
        .delete(controller.destroy)
    
    app.route('/user-entries/email/:email')
        .get(controller.find)

    app.route('/user-entries/userID/:id')
        .get(controller.show)
        .put(controller.update) 
        

    
}

