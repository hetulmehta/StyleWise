const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const PORT = process.env.PORT || 4000;
var cors = require('cors')

app.use(cors({
    origin: '*'
}));

app.listen(PORT, () => {
    console.log(`Serving @${PORT}`);
});
