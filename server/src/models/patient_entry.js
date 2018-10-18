'use strict';

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PatientEntrySchema = new Schema({
    no: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.new
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('PatientEntry', PatientEntrySchema)
