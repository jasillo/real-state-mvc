import express from 'express';
import {
    admin,
    createProperty,
    deleteProperty,
    addImage,
    createValidator
} from '../controllers/propertyController.js'
import requireAuth from '../middleware/authMiddleware.js'

const router = express.Router();

router.get('/my-properties',requireAuth, admin);
router.get('/my-properties/create',requireAuth, createProperty);
router.post('/my-properties/create', requireAuth, createValidator, createProperty);
router.get('/my-properties/delete', requireAuth, deleteProperty);
router.get('/my-properties/add-image/:id', requireAuth, addImage);

export default router;