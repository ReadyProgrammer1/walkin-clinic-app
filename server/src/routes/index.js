'use strict';

module.exports = function(app) {
    const patientEntries = require('./patient_entries')
    patientEntries(app)

    const userEntries = require('./user_entries')
    userEntries(app)
}

