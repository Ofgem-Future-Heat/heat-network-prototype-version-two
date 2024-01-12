//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

module.exports = function (router, _data) {

    router.all('/*', function (req) {
        req.session.data = JSON.parse(JSON.stringify(_data))

    });
}
    function clearvalidation(req) {
        req.session.data.validationErrors = {}
        req.session.data.validationError = "false"
        req.session.data.includeValidation = req.query.iv || req.session.data.includeValidation

    }





// Add Heat Network - Intro
// Supply
router.get('/v7/add-heat-network/introduction/supply', function (req, res) {
        clearvalidation(req);
        res.render('/v7/add-heat-network/introduction/supply', {
            data: req.session.data
        });
});


router.post('/v7/add-heat-network/introduction/supply', function (req, res) {
    clearvalidation(req);
    var introsupply = req.session.data['introsupply']

    if (!introsupply) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.introsupply = {
            "anchor": "introsupply",
            "message": "Error text"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/introduction/supply', {
            data: req.session.data
        });
    }

    else {
        if (introsupply == "Yes") {
            res.redirect('/v7/add-heat-network/introduction/supplywhen');
        } else {
            res.redirect('/v7/add-heat-network/introduction/supplybefore');
        }
    }

});

// declaration
router.get('/v7/add-heat-network/introduction/declaration', function (req, res) {
    clearvalidation(req);
    res.render('/v7/add-heat-network/introduction/declaration', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/introduction/declaration', function (req, res) {
    clearvalidation(req);
    var declaration = req.session.data['declaration']

    if (declaration != "declaration1,declaration2") {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.declaration = {
            "anchor": "declaration",
            "message": "Check declaration"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/introduction/declaration', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/v7/add-heat-network/introduction/role');

    }

});

// Role
router.get('/v7/add-heat-network/introduction/role', function (req, res) {
    clearvalidation(req);
    res.render('/v7/add-heat-network/introduction/role', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/introduction/role', function (req, res) {
    clearvalidation(req);
    var role = req.session.data['role']

    if (!role) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.role = {
            "anchor": "role",
            "message": "Select a role"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/introduction/role', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/v7/add-heat-network/introduction/supply');
    }
});

// Supply when
router.get('/v7/add-heat-network/introduction/supplywhen', function (req, res) {
    clearvalidation(req);
    res.render('/v7/add-heat-network/introduction/supplywhen', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/introduction/supplywhen', function (req, res) {
    clearvalidation(req);
    var supplywhen = req.session.data['supplywhen']

    if (!supplywhen) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.supplywhen = {
            "anchor": "supplywhen",
            "message": "Enter a year"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/introduction/supplywhen', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/v7/add-heat-network/introduction/service');
    }
});

// Services
router.get('/v7/add-heat-network/introduction/service', function (req, res) {
    clearvalidation(req);
    res.render('/v7/add-heat-network/introduction/service', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/introduction/service', function (req, res) {
    clearvalidation(req);
    var services = req.session.data['service']

    if (!services) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.services = {
            "anchor": "services",
            "message": "Select a service",
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/introduction/service', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/v7/add-heat-network/introduction/building');

    }

});

// Building
router.get('/v7/add-heat-network/introduction/building', function (req, res) {
    clearvalidation(req);
    res.render('/v7/add-heat-network/introduction/building', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/introduction/building', function (req, res) {
    clearvalidation(req);
    req.session.data['building'] = req.body.building
    var building = req.session.data['building']

    if (!building) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.building = {
            "anchor": "building",
            "message": "Error text"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/introduction/building', {
            data: req.session.data
        });
    }

    else {
        if (building == "Yes") {
            res.redirect('/v7/add-heat-network/introduction/selfsupply');
        } else {
            res.redirect('/v7/add-heat-network/introduction/sharedfacilities');
        }
    }

});


// Selfsupply
router.get('/v7/add-heat-network/introduction/selfsupply', function (req, res) {
    clearvalidation(req);
    res.render('/v7/add-heat-network/introduction/selfsupply', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/introduction/selfsupply', function (req, res) {
    clearvalidation(req);
    var selfsupply = req.session.data['selfsupply']

    if (!selfsupply) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.selfsupply = {
            "anchor": "selfsupply",
            "message": "Error text"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/introduction/selfsupply', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/v7/add-heat-network/introduction/consumertype');
    }

});


// sharedfacilities
router.get('/v7/add-heat-network/introduction/sharedfacilities', function (req, res) {
    clearvalidation(req);
    res.render('/v7/add-heat-network/introduction/sharedfacilities', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/introduction/sharedfacilities', function (req, res) {
    clearvalidation(req);
    var sharedfacilities = req.session.data['sharedfacilities']

    if (!sharedfacilities) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.sharedfacilities = {
            "anchor": "sharedfacilities",
            "message": "Error text"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/introduction/sharedfacilities', {
            data: req.session.data
        });
    }

    else {
        if (sharedfacilities == "Yes") {
            res.redirect('/v7/add-heat-network/introduction/dropout');
        } else {
            res.redirect('/v7/add-heat-network/introduction/consumertype');
        }
    }

});

// Consumer Type
router.get('/v7/add-heat-network/introduction/consumertype', function (req, res) {
    clearvalidation(req);
    res.render('/v7/add-heat-network/introduction/consumertype', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/introduction/consumertype', function (req, res) {
    clearvalidation(req);
    var consumertypes = req.session.data['consumertype']

    if (consumertypes == "_unchecked") {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.consumertypes = {
            "anchor": "consumertypes",
            "message": "Select a consumertype",
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/introduction/consumertype', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/v7/add-heat-network/introduction/name');

    }
});

// Name
router.get('/v7/add-heat-network/introduction/name', function (req, res) {
    clearvalidation(req);
    res.render('/v7/add-heat-network/introduction/name', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/introduction/name', function (req, res) {
    clearvalidation(req);
    req.session.data['name'] = req.body.name
    var name = req.session.data['name']

    if (!name) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.name = {
            "anchor": "name",
            "message": "Enter a name",
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/introduction/name', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/v7/add-heat-network/introduction/cya');

    }
});