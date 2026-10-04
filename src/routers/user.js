const express = require("express")
const User = require("../models/user")
const router = express.Router()


/// Post Data
router.post("/users", async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.status(200).send(user)
    }
    catch (e) {
        res.status(400).send(e)
    }
})


/// Get All users
router.get("/users", (req, res) => {
    User.find({})
        .then(users => {
            res.status(200).send(users)
        })
        .catch(error => {
            res.status(500).send(error)
        })
})

/// Get user by id
router.get("/users/:id", (req, res) => {
    const _id = req.params.id
    User.findById(_id)
        .then(user => {
            if (!user) {
                return res.status(404).send("Not Found this user")
            }
            return res.status(200).send(user)
        })
        .catch(error => {
            res.status(500).send(error)
        })
})

/// Patch user by id
router.patch("/users/:id", async (req, res) => {
    try {
        const _id = req.params.id
        const user = await User.findByIdAndUpdate(_id, req.body, {
            new: true,
            runValidators: true
        })
        if (!user) {
           return res.status(404).send("Not Found This user")
        }
        res.status(200).send(user)
    }
    catch (e) {
        res.status(500).send(e)
    }
})


/// Delete user by id
router.delete("/users/:id", async (req, res) => {
    try {
        const _id = req.params.id
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            return res.status(404).send("Not Found this user")
        }
        res.status(200).send({
            user,
            message:"Deleted Done"
        })
    }
    catch (e) {
        res.status(500).send(e)
    }
})


module.exports = router