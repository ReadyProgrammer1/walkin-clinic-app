'use strict';

const PatientEntry = require('../models/patient_entry')

exports.index = function(req, res) {
    PatientEntry.find({}, function(err, patientEntry) {
        if (err) res.send(err)
        res.json(patientEntry)
    })
}

exports.create = function(req, res) {
    const newPatientEntry = new PatientEntry(req.body)
    newPatientEntry.save(function(err, patientEntry) {
        if (err) res.send(err)
        res.json(patientEntry)
    })
}

exports.show = function(req, res) {
    PatientEntry.findById(req.params.id, function(err, patientEntry) {
        if (err) res.send(err)
        res.json(patientEntry)
    })
}

exports.update = function(req, res) {
    PatientEntry.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function(err, patientEntry) {
        if (err) res.send(err)
        res.json(patientEntry)
    })
}

exports.destroy = function(req, res) {
    PatientEntry.deleteOne({ _id: req.params.id }, function(err, patientEntry) {
        if (err) res.send(err)
        res.json({ message: `Patient entry (${req.params.id}) was successfully deleted.` })
    })
}
