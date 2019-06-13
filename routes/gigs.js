const express = require('express')
const route = express.Router()
const db = require('../config/database')
const Op = require('sequelize').Op
const Gig = require('../models/Gig')

route.get('/', (req, res)=>{
    const { search } = req.query
    if (!search) {
        Gig.findAll()
        .then( gigs => {
            res.render('gigs', { gigs })

        })
        .catch( err => console.log(err))
    } else {
        Gig.findAll({
            where: {
                [Op.or]: [
                    db.where(
                        db.fn('lower', db.col('title')),
                        {
                            [Op.like]: '%' + search +'%'
                        }
                    ),
                    db.where(
                        db.fn('lower', db.col('description')),
                        {
                            [Op.like]: '%' + search +'%'
                        }
                    ),
                    db.where(
                        db.fn('lower', db.col('technologies')),
                        {
                            [Op.like]: '%' + search +'%'
                        }
                    ),
                ]
            }
        })
        .then( gigs => {
            res.render('gigs', { gigs })

        })
        .catch( err => console.log(err))
    }

})

route.get('/add', (req, res)=>{

    res.render('add')

})

route.post('/add', (req, res)=> {
    const { title, description, budget, technologies, email } = req.body
    const errors = []
    
    if (!title || !description.trim() || !technologies || !email) {
        errors.push('please fill in all the fields')
    }

    if (errors.length === 0) {
        const newGig = { title, description, budget, technologies, contact_email: email }
        Gig.create(newGig)
            .then( ()=>{
                res.render('add', { successMsg: 'gig added successfully' })
            })
            .catch( err=>{
                console.log(err)
                errors.push('failed to add gig, please try later')
                res.render('add', {
                    errors, 
                    title,
                    description,
                    budget,
                    technologies,
                    email
                })
            })
    } else {
        res.render('add', {
            errors, 
            title,
            description,
            budget,
            technologies,
            email
        })
    }

})

module.exports = route