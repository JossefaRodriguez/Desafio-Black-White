const http = require('http')
const fs = require('fs')
const url = require('url')
const Jimp = require('jimp')

http.createServer((req, res) => {
    
    // Parámetros extraídos de index.html
    const parametros = url.parse(req.url, true).query
    const imagenProcesada = parametros.imagen
    console.log(imagenProcesada)
    // Ruta para procesar la imagen
    if(req.url.includes('/procesar')) {
        Jimp.read(`${imagenProcesada}`, (err, imagen) => {
            imagen
            .resize(350, Jimp.AUTO)
            .greyscale()
            .quality(60)
            .writeAsync('newImg.jpg')
            .then(() => {
                fs.readFile('newImg.jpg', (err, Imagen) => {
                    res.writeHead(200, {'Content-type': 'image/jpeg'})
                    res.end(Imagen)
                })
            })
        })
    }
    

    // Ruta para HTML
    if(req.url === '/') {
        res.writeHead(200, {'Content-type': 'text/html; charset=UTF-8'})
        fs.readFile('index.html', (err, html) => {
            res.end(html)
        })
    }

    // Ruta para css
    if(req.url.includes('/style')) {
        res.writeHead(200, {'Content-type': 'text/css'})
        fs.readFile('style.css', 'utf-8', (err, css) => {
            res.end(css)
        })
    }
    // levanta servidor en puerto 3000
}).listen(3000, () => console.log('Se inicia el Servidor en puerto 3000'))

