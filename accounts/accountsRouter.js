const express = require('express')
const db = require('../data/dbConfig')

const router = express.Router()

//GET all accounts
router.get('/', async (req, res) => {
    try {
        const accounts = await db('accounts');
        res.json(accounts);
    } catch(err) {
        res.status(500).json({ message: 'Failed to get accounts' });
    }
})

//GET account by id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const accounts = await db('accounts').where({ id });
        res.json(accounts);
    } catch(err) {
        res.status(500).json({ message: 'Failed to find account with specified id' });
    }
})

// INSERT new account 
router.post('/', async (req, res) => {
    try {
        const payload = {
            name: req.body.name,
            budget: req.body.budget,
        }

        const [id] = await db('accounts').insert(payload)
        return res.json(await db('accounts').where('id', id).first())
    } catch(err) {
        res.status(500).json({ message: "Failed to insert new account info" });
    }
})

//UPDATE account by id
router.put('/:id', async (req, res) => {
    try {
        await db('accounts').where('id', req.params.id).update(req.body)
        return res.json(await db('accounts').where('id', req.params.id).first())
    } catch(err) {
        res.status(500).json({ message: "Failed to update account info" });
    }
})

//DELETE account by id
router.delete('/:id', async (req, res) => {
    try {
        const accountDeleted = await db('accounts').where('id', req.params.id).del();
        res.status(200).json({ message: accountDeleted})
    } catch(err) {
        res.status(500).json({ message: "Failed to delete this account" });
    }
})

module.exports = router 