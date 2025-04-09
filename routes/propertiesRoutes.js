import express from 'express';
import {
    admin,
    createProperty,
    deleteProperty
} from '../controllers/propertyController.js'

const router = express.Router();

router.get('/my-properties', admin);
router.get('/my-properties/create', createProperty);
router.get('/my-properties/delete', deleteProperty);

export default router;