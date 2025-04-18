import Category from '../models/Category.js'
import Contract from '../models/Contract.js'

const admin = (req, res) => {
    res.render('properties/admin', {
        page: 'Mis propiedades',
        logged: true
    });
};

const createProperty = async (req, res) => {
    // consult categories and contract types
    const [categoryOpts, contractOpts] = await Promise.all([
        Category.findAll(),
        Contract.findAll()
    ]);
    const roomsOpts = Array.from({ length: 10 }, (_, i) => String(i + 1));
    const parkingOpts = Array.from({ length: 5 }, (_, i) => String(i));
    const toiletOpts = Array.from({ length: 5 }, (_, i) => String(i));

    res.render('properties/create', {
        page: 'Crear Propiedad',
        logged: true,
        categoryOpts,
        contractOpts,
        roomsOpts,
        parkingOpts,
        toiletOpts
    });
};

const deleteProperty = (req, res) => {
    res.render('properties/admin', {
        page: 'Mis propiedades',
        logged: true
    });
};

export {
    admin,
    createProperty,
    deleteProperty
};