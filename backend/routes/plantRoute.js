import express from "express"
import { addPlant,listPlant,removePlant} from '../controllers/plantController.js';

import multer from "multer";

const plantRouter= express.Router();

// image storage Engine

const storage= multer.diskStorage({
    destination:'uploads',
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload= multer({storage:storage})               // middleware upload is used to image in the upload folder

plantRouter.post('/add',upload.single('image'),addPlant)

plantRouter.get('/list',listPlant)

plantRouter.post('/remove',removePlant)




export default plantRouter;