const express = require("express");
const { NotFoundError, ClientError } = require("./Error");
const app = express();
var bodyParser = require('body-parser')
var fs = require('fs');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "development") {
    console.log("in the development phase!");
}

app.post("/", async (req, res) => {
    try {
        const ImageFile = req.body.ImageUri;
        const fs = require('fs')
        await fs.writeFile('Output.txt', ImageFile, (err) => {
            if (err) throw err;
        })
        console.log('req received');

        var spawn = require('child_process').spawn;

        const python = spawn('C:/Users/BHAVIN PATEL/AppData/Local/Programs/Python/Python39/python.exe', ['./FINAL_PROJECT.py'])
        python.stdout.on('data', function (data) {
            res.send(data);
            console.log('Done!!');
        })
    } catch (err) {
        console.log(err)
    }
});


app.post("/img/", async (req, res) => {
    try {
        const ImageName = req.body.ImgName;

        function base64_encode(file) {
            var bitmap = fs.readFileSync(file);
            return Buffer.from(bitmap).toString('base64');
        }

        var base64str = 'data:image/jpeg;base64,' + base64_encode(`../WebApp/myapp/public/${ImageName}`);

        res.send(base64str);

    } catch (err) {
        console.log(err)
    }
});


app.all("*", (req, res, next) => {
    return next(new NotFoundError("This page does not exists!!!"));
});

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "Fail";
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});

module.exports = app;
