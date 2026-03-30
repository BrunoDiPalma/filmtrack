import app from "./app.js"

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`O servidor está rodando na porta ${PORT}`)
})