const app = require('./app')
const { APP_PORT } = require('./config')

app.listen(APP_PORT, () => {
	console.log(`server is running on
     http://localhost:${APP_PORT}`)
})

