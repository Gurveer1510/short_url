const express = require("express")
const {
    generateNewShortUrl,
    redirectToShortUrl,
    getAnalytics,
    getAllUrls
} = require("../controller/url")

const router = express.Router()

router.get("/", getAllUrls)

router.post("/",generateNewShortUrl)

router.get("/:id", redirectToShortUrl)

router.get("/analytics/:id", getAnalytics)

module.exports = router