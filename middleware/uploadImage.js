import multer from 'multer'
import path from 'path'
import fs from 'fs'
import {generateId} from '../helpers/tokens.js'

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const userId = req.user.id.toString();
        const propertyId = req.params.id;
        const uploadPath = path.resolve('uploads', userId, propertyId);
        fs.mkdirSync(uploadPath, { recursive: true });

        cb(null, uploadPath);
    },
    filename: function(req, file, cb) {
        const ext = path.extname(file.originalname);
        const filename = `${generateId()}${ext}`;
        cb(null, filename);
    }
});

const upload = multer({storage});

export default upload;