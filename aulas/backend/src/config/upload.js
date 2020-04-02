const multer = require('multer');
const path = require('path');

module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, "..", "..", "uploads"), //sem barras pois nos SOs são diferentes
        filename: (req, file, cb) => { //cb = callback
            const ext = path.extname(file.originalname); //extensão
            const name = path.basename(file.originalname, ext);
            cb(null, `${name}-${Date.now()}${ext}`)
        }
    })
}