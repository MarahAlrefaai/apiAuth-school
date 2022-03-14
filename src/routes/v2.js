'use strict'
const express = require('express');
const router = express.Router();
const models = require('../models');
const acl = require('../middleware/acl');
const bearer = require('../middleware/bearerAuth')

router.param('model', (req, res, next) => {
    const dataModel = req.params.model
    if (models[dataModel]) {
        
        req.model =models[dataModel];
        next();
    } else {
        next('model not found')
    }
})

router.get('/:model', bearer, acl('read'), getAll);
router.get('/:model/:id', bearer, acl('read'), getOne);
router.post('/:model', bearer, acl('create'), create);
router.put('/:model/:id', bearer, acl('update'), update);
router.delete('/:model/:id', bearer, acl('delete'), deleteID);

async function getAll(req, res) {
    

    let allRecords = await req.model.get();
    res.status(200).json(allRecords);
}

async function getOne(req, res) {
    const id = req.params.id;
    let theRecord = await req.model.get(id)
    res.status(200).json(theRecord);
}

async function create(req, res) {
    let obj = req.body;
    let newRecord = await req.model.create(obj);
    res.status(201).json(newRecord);
}

async function update(req, res) {
    const id = req.params.id;
    const obj = req.body;
    let updatedRecord = await req.model.update(id, obj)
    res.status(201).json(updatedRecord);
}

async function deleteID(req, res) {
    let id = req.params.id;
    let deletedRecord = await req.model.delete(id);
    res.status(204).json(deletedRecord);
}


module.exports = router;


