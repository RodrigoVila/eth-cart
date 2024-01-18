const express = require('express')
const db = require('./dbConnection')

const PORT = 5000

const app = express()
app.listen(PORT, () => console.log("Server listening at: ", 5000))

app.get('/products', async (_, res) => {
    try {
        const results = await db.q('select * from products', [])
        res.send(results)
    } catch (error) {
        console.log("Error getting products:", error)
        res.send({ error })
    }
})

app.get('/products/:id', async (req, res) => {
    try {
        const [results] = await db.q(`select * from Products where product_id=${req.params.id}`, [])
        res.json({ status: res.status, data: results })
    } catch (error) {
        console.log("Error getting products: ", error)
        res.send({ error })
    }
})