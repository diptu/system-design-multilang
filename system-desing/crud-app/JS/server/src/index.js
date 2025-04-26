const app = require('./app.js');
const {PORT} = require('./secret.js');
const connectDB = require('./config/db.js');
// responible for instantiating the server
app.listen(PORT, async()=>{
    console.log(`server running on http://localhost:${PORT}`);
    await connectDB();
})

