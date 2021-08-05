const express = require('express')
const path = require('path')

const multer = require('multer')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// statics
app.use(express.static(path.join(__dirname, './images')))

// multer for file upload
const storage = multer.diskStorage({
    // destination to store the uploaded files
    destination: 'images',
    filename: function (req, file, cb) {
        cb(null, file.fieldname+ '_' + Date.now()+path.extname(file.originalname))
        // file.fieldname is the name of the field (image)
        // path.extname(file.originalname) is the extension of the file
    }
})

const imageUpload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10 MB
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
            cb(new Error('File is not an image'))
        } else {
            cb(null, file)
        }
    }
})

// models

const Property = require('./models/property.model') 

app.post('/upload', imageUpload.single('image'), async (req, res) => {

    const newProperty = new Property({
        roomTitle: req.body.roomTitle,
        roomSummary: req.body.roomSummary,
        totalBedrooms: req.body.totalBedrooms,
        totalBathrooms: req.body.totalBathrooms,
        mediaUrl: req.file.path
    })
    await newProperty.save()
                    .then(()=> res.status(200).json( {status:'success', data: newProperty}))
                    .catch(err=>res.json(err))

    
    res.send(req.file)
   // req.file.path
}, (err,req, res, next)=>{
    res.status(400).send({error: err.message})
})

// app.get('/file/:fileName', function (req, res) {
//     const {fileName}= req.params
    
//     const dirname = path.resolve()

//     const fullfilepath = path.join(dirname, 'images/' + fileName)
 
//     return res.sendFile(fullfilepath);
// })

app.listen(process.env.PORT|| 5200, ()=>console.log(`Server running PORT : 5200`))