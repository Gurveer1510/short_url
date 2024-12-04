const express = require("express")
const URL = require("../model/urls")

const router = express.Router()

router.get("/", async (req, res) => {
    const urls = await URL.find()
    
    return res.render("home",{
        allUrl: urls
    })
})

module.exports = router