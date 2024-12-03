// const {nanoid} = require("nanoid")
const ids = require('short-id');
const URL = require("../model/urls")

const generateNewShortUrl = async (req, res) => {
    const body = req.body
    if (!body.url) {
        return res.status(400).json({
            error: "url is required"
        })
    }
    const shortId = ids.generate()

    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: []
    })

    return res.json({
        id: shortId
    })

}

const redirectToShortUrl = async (req, res) => {
    const shortId = req.params.id

    if(!shortId) {
        return res.status(400).json({
            error: "id is required"
        })
    }

    const url = await URL.findOneAndUpdate(
        {
            shortId
        },
        {
            $push: {
                visitHistory: {
                    timestamp: new Date().toLocaleString()
                }
            }
        }
    )

    if(!url || !url.redirectUrl){
        return res.status(404).json({
            error: "no url found"
        })
    }

    return res.redirect(url.redirectUrl)

}


const getAnalytics = async(req, res) => {
    const shortId = req.params.id
    const url = await URL.findOne({
        shortId
    })

    if(!url) {
        return res.status(400).json({
            error: "No url found"
        })
    }

    return res.status(200).json({
        status: "success",
        number_of_clicks: url.visitHistory.length
    })
}

module.exports = {
    generateNewShortUrl,
    redirectToShortUrl,
    getAnalytics
}