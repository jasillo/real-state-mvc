import { check, validationResult } from 'express-validator'
import { Category, Contract, Property } from '../models/index.js'
import upload from '../middleware/uploadImage.js'

const admin = (req, res) => {
    res.render('properties/admin-panel', {
        page: 'Mis propiedades'
    });
};

const createProperty = async (req, res) => {
    // render create property view
    const renderView = async (errors) => {
        const [categoryOpts, contractOpts] = await Promise.all([
            Category.findAll(),
            Contract.findAll()
        ]);
        const roomsOpts = Array.from({ length: 10 }, (_, i) => String(i + 1));
        const parkingOpts = Array.from({ length: 5 }, (_, i) => String(i));
        const toiletOpts = Array.from({ length: 5 }, (_, i) => String(i));

        return res.render('properties/create', {
            page: 'Crear Propiedad',
            csrfToken: req.csrfToken(),
            categoryOpts,
            contractOpts,
            roomsOpts,
            parkingOpts,
            toiletOpts,
            errors: errors?.length ? errors : null,
            save: req.body
        });
    };

    // render Get method
    if (req.method === "GET") {
        return renderView();
    }

    // check fields' errors
    let valErrors = validationResult(req);
    if (!valErrors.isEmpty()) {
        return renderView(valErrors.array());
    }

    // create property
    const {
        title,
        description,
        rooms,
        parking,
        toilet,
        area,
        pet,
        price,
        furnished,
        lat,
        lng,
        category: categoryId,
        contract: contractId,
    } = req.body;
    const { id: userId } = req.user;


    try {
        const property = await Property.create({
            title,
            description,
            rooms,
            parking,
            toilet,
            area,
            pet,
            price,
            furnished,
            lat,
            lng,
            categoryId,
            contractId,
            userId
        });

        const { id } = property;
        res.redirect(`my-properties/add-image/${id}`);
    } catch (error) {
        console.log(error);
    }
};

const deleteProperty = (req, res) => {
    res.render('properties/admin-panel', {
        page: 'Mis propiedades'
    });
};

const createValidator = [
    check('title').notEmpty().withMessage('El Titulo no puede estar en blanco'),
    check('description')
        .notEmpty().withMessage('La descripcion no puede ir vacia.')
        .isLength({ max: 250 }).withMessage('La descripcion es muy larga.'),
    check('category').isNumeric().withMessage('Seleccione una categoria.'),
    check('rooms').isNumeric().withMessage('Seleccione una cantidad de habitaciones.'),
    check('parking').isNumeric().withMessage('Seleccione una cantidad de estacionamientos.'),
    check('toilet').isNumeric().withMessage('Seleccione la cantidad de baños.'),
    check('pet').isBoolean().withMessage('Seleccione si se permiten mascotas.'),
    check('furnished').isBoolean().withMessage('Seleccione si esta amoblado.'),
    check('area').isFloat({ min: 1 }).withMessage('debe establecer un area.'),
    check('address').notEmpty().withMessage('Debe ingresar una direccion.'),
    check('lat').notEmpty().withMessage('ubica la propiedad en el mapa'),
    check('price').isFloat({ min: 1 }).withMessage('ingrese un precio.'),
    check('contract').isNumeric().withMessage('seleccione el tipo de contrato.')
];

const addImage = async (req, res) => {
    const { id } = req.params;

    // validate property exist, is not published and owner
    const property = await Property.findByPk(id);
    if (!property ||
        property.published ||
        property.userId.toString() !== req.user.id.toString()
    ) {
        return res.redirect('/my-properties');
    }

    // render Get method
    if (req.method === "GET") {
        return res.render('properties/add-image', {
            page: 'Agregar Imagen',
            csrfToken: req.csrfToken(),
            property
        });
    }

    // update database
    try {
        property.published = true;
        await property.save();
    } catch (error) {
        console.log(error);
    }

    res.redirect('/my-properties');
}

export {
    admin,
    createProperty,
    deleteProperty,
    addImage,
    createValidator
};