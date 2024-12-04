const express = require("express")
const path = require("path")

const router = require("./routes/url")
const connectToDb = require("./connection")
const staticRouter = require("./routes/staticRouter")

const app = express()

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

const PORT = 8000

connectToDb("mongodb://127.0.0.1:27017/url_shortner")
.then(() => console.log(`mongodb connect`))
.catch((err) => console.error(err))

app.use("/url", router)
app.use("/", staticRouter)


app.listen(PORT, () => console.log(`server started at PORT:${PORT}`))