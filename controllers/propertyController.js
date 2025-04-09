
const admin = (req, res) => {
    res.render('properties/admin', {
        page: 'Mis propiedades',
        logged: true
    });
};

const createProperty = (req, res) => {
    res.render('properties/create', {
        page: 'Crear Propiedad',
        logged: true
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