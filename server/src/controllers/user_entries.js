'use strict';
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const UserEntry = require('../models/user_entry')

exports.index = function(req, res) {
    UserEntry.find({}, function(err, userEntry) {
        if (err) res.send(err)
        res.json(userEntry)
    })
}

exports.create = function(req, res) {
    console.log('from create req.body: ' + JSON.stringify(req.body))
    UserEntry.find({}, function(err, userEntry) {

        const avatar = gravatar.url(req.body.email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })
        //no type name email password avatar
        const newUser = new UserEntry({
            no: req.body.no,
            type: req.body.type,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            avatar
        })

        bcrypt.genSalt(10, (err, salt) => {
            if(err) console.error('There was an error', err)
            else {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) console.error('There was an error', err)
                    else {
                        newUser.password = hash
                        newUser
                            .save()
                            if (err) res.send(err)
                            res.json(userEntry)
                    }
                })
            }
        })
    })
}

exports.find = function(req, res) {
    var params = req.params.email
    var userParams = params.split(',')

    var email = userParams[0]
    var password = userParams[1]

    UserEntry.findOne({email: email}, function(err, userEntry) {
        if (err) res.send(err)
        res.json(userEntry)

        bcrypt.compare(password, userEntry.password)
            .then(isMatch => {
                if(isMatch) {
                    //res.json(userEntry)
                    console.log('password = match')
                }
                else {
                    console.log('password != match')
                }
            })
    })
}

exports.show = function(req, res) {
    UserEntry.findById(req.params.id, function(err, userEntry) {
        if (err) res.send(err)
        res.json(userEntry)
    })
}


exports.update = function(req, res) {
    console.log('req.body: ' + JSON.stringify(req.body))
    UserEntry.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function(err, userEntry) {

        const avatar = gravatar.url(req.body.email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        const newUser = new UserEntry({
            no: req.body.no,
            type: req.body.type,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            avatar
        })

        bcrypt.genSalt(10, (err, salt) => {
            if(err) console.error('There was an error', err)
            else {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) console.error('There was an error', err)
                    else {
                        newUser.password = hash
                        newUser
                            .updateOne()
                            if (err) res.send(err)
                            res.json(userEntry)
                    }
                })
            }
        })
    })
}

exports.destroy = function(req, res) {
    UserEntry.deleteOne({ _id: req.params.id }, function(err, userEntry) {
        console.log('about to try to delete... ' + req.params.id)
        if (err) res.send(err)
        res.json({ message: `User entry (${req.params.id}) was successfully deleted.` })
    })
}
