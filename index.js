const express = require("express")
const router = require("./routes/url")
const connectToDb = require("./connection")

const app = express()
app.use(express.json())
const PORT = 8000

connectToDb("mongodb://127.0.0.1:27017/url_shortner")
.then(() => console.log(`mongodb connect`))
.catch((err) => console.error(err))

app.use("/url", router)


app.listen(PORT, () => console.log(`server started at PORT:${PORT}`))