'use strict';

module.exports = function(app) {
    const controller = require('../controllers/patient_entries')

    app.route('/patient-entries')
        .get(controller.index)
        .post(controller.create)
    
    app.route('/patient-entries/:id')
        .get(controller.show)
        .put(controller.update) 
        .delete(controller.destroy)
}

