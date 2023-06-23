const Students = require('../models/models');
const databaseConfig = require('../../config/database.config');

exports.create = (req, res) =>{
    
    

    if(!req.body.major){
        return res.status(400).send({
            'message': 'Major cannot be empty'
        })
    }

    const students = new Students({
        name : req.body.name || 'Untitled',
        age : req.body.age,
        major : req.body.major,
        createdDate : req.body.createdDate,
        updatedDate : req.body.updatedDate
    })


    students.save()
        .then(data=> res.send(data))
        .catch(err =>{
            res.status(500).send({
                'message': 'Something went wrong!!',
                'error' : err
            })
        });
}

exports.findAll = (req,res) =>{

    //Retrieve all the data
    Students.find().then(
        students =>{
            res.send(students)
        }
    ).catch(err =>{
        res.status(500).send({
            'message': 'Something went wrong!!',
            'error' : err
        })
    })
}

exports.findOne = (req, res)=>{
    console.log(req.params);

    Students.findById(req.params.id).then(
        students =>{

            if(!students){
                res.status(404).send({
                    'message' : 'ID not found'
                })
            }

            res.send(students)
        }
    ).catch(err =>{
        res.status(500).send({
            'message': 'Something went wrong!!',
            'error' : err
        })
    })
}

exports.update = (req,res) =>{
    const id = req.params.id;

    if(!req.body.name){
        return res.status(400).send({
            'message': 'Name cannot be empty'
        })
    }

    Students.findByIdAndUpdate(id, {
        name : req.body.name || 'Untitled',
        age : req.body.age,
        major : req.body.major,
        createdDate : req.body.createdDate,
        updatedDate : req.body.updatedDate
    }, {new:true}).then(students =>{
        res.send(students)
    }).catch(err =>{
        res.status(500).send({
            'message': 'Something went wrong!!',
            'error' : err
        })
    })
}

exports.delete = (req, res)=>{
    Students.findByIdAndRemove(req.params.id,).then(
        students =>{
        if(!students){
            res.status(404).send({
                "message": "Student not found"
            })
        }
        res.send({
            'message': 'Student got deleted!!'
        })
    }
    ).catch(err =>{
        res.status(500).send({
            'message': 'Something went wrong!!',
            'error' : err
        })
    })
}