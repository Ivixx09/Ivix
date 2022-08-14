var fs  = require("fs")
var http  = require("http")

// Escribí acá tu servidor
http.createServer( (req, res) => {
  if (req.url === "/") {
    res.end("ShowByName APIIIIIpichi")
  } else {
    try {
      const readImage = fs.readFileSync(__dirname + `/images/${req.url}_doge.jpg`)
      res.end(readImage)

    } catch (error) {
      res.end("404 not Found")
    }
  }
}).listen(3001,'127.0.0.1' ) 