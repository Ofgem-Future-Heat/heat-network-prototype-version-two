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
// Cancel
router.get('/v7/add-heat-network/introduction/cancel', function (req, res) {
    clearvalidation(req);
    req.session.data['cancels'] = "";
    backURL = req.header('Referer')
    res.render('/v7/add-heat-network/introduction/cancel', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/introduction/cancel', function (req, res) {
    clearvalidation(req);
    var cancels = req.session.data['cancels']

    if (!cancels) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.cancels = {
            "anchor": "cancels",
            "message": "Select whether you wish to cancel"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/introduction/cancel', {
            data: req.session.data
        });
    }

    else {
        if (cancels == "Yes") {
            res.redirect('/v7/account-information');
        } else {
            res.redirect(backURL);
        }
    }

});


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


// Supply before
router.get('/v7/add-heat-network/introduction/supplybefore', function (req, res) {
    clearvalidation(req);
    res.render('/v7/add-heat-network/introduction/supplybefore', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/introduction/supplybefore', function (req, res) {
    clearvalidation(req);
    var supplybefore = req.session.data['supplybefore']

    if (!supplybefore) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.supplybefore = {
            "anchor": "supplybefore",
            "message": "Error text"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/introduction/supplybefore', {
            data: req.session.data
        });
    }

    else {
        if (supplybefore == "Yes") {
            res.redirect('/v7/add-heat-network/introduction/service');
        } else {
            res.redirect('/v7/add-heat-network/introduction/service');
        }
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

// Intro - cya
router.get('/v7/add-heat-network/introduction/cya', function (req, res) {
    res.render('/v7/add-heat-network/introduction/cya', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/introduction/cya', function (req, res) {
        res.redirect('/v7/add-heat-network/introduction/moreinfo');

});


// Tasklist
router.get('/v7/add-heat-network/tasklist', function (req, res) {
    res.render('/v7/add-heat-network/tasklist', {
        data: req.session.data
    });
});


// Location - Address
router.get('/v7/add-heat-network/location/address', function (req, res) {
    clearvalidation(req);
    res.render('/v7/add-heat-network/location/address', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/location/address', function (req, res) {
    clearvalidation(req);
    var postcode = req.session.data['addressPostcode']
    var number = req.session.data['addressNumber']

    if (!postcode) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.addressPostcode = {
            "anchor": "addressPostcode",
            "message": "Enter a postcode",
        }
    }

    if (!number) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.addressNumber = {
            "anchor": "addressNumber",
            "message": "Enter a building name or number",
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/location/address', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/v7/add-heat-network/location/addressconfirm');

    }
});

// Location - cya
router.get('/v7/add-heat-network/location/cya', function (req, res) {
    res.render('/v7/add-heat-network/location/cya', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/location/cya', function (req, res) {
    res.redirect('/v7/add-heat-network/tasklist');
});

// Buildings & consumers - How many
router.get('/v7/add-heat-network/buildingsandconsumers/howmany', function (req, res) {
    res.render('/v7/add-heat-network/buildingsandconsumers/howmany', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/buildingsandconsumers/howmany', function (req, res) {
    var building = req.session.data['building']

    if (building == "Yes") {
        res.redirect('/v7/add-heat-network/buildingsandconsumers/customers');
    } else {
        res.redirect('/v7/add-heat-network/buildingsandconsumers/cya');
    }
});

// Buildings & consumers - Customers
router.get('/v7/add-heat-network/buildingsandconsumers/customers', function (req, res) {
    res.render('/v7/add-heat-network/buildingsandconsumers/customers', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/buildingsandconsumers/customers', function (req, res) {
    res.redirect('/v7/add-heat-network/buildingsandconsumers/communalheating');
});


// sharedfacilities
router.get('/v7/add-heat-network/buildingsandconsumers/communalheating', function (req, res) {
    clearvalidation(req);
    res.render('/v7/add-heat-network/buildingsandconsumers/communalheating', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/buildingsandconsumers/communalheating', function (req, res) {
    clearvalidation(req);
    var communalheating = req.session.data['communalheating']

    if (!communalheating) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.communalheating = {
            "anchor": "communalheating",
            "message": "Error text"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/buildingsandconsumers/communalheating', {
            data: req.session.data
        });
    }

    else {
        if (communalheating == "Yes") {
            res.redirect('/v7/add-heat-network/buildingsandconsumers/howmanycommunal');
        } else {
            res.redirect('/v7/add-heat-network/buildingsandconsumers/cya');
        }
    }

});

// Buildings & consumers - Communal How Many
router.get('/v7/add-heat-network/buildingsandconsumers/howmanycommunal', function (req, res) {
    clearvalidation(req);

    res.render('/v7/add-heat-network/buildingsandconsumers/howmanycommunal', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/buildingsandconsumers/howmanycommunal', function (req, res) {
    clearvalidation(req);

    res.redirect('/v7/add-heat-network/buildingsandconsumers/communalinfo');
});


// Buildings & consumers - Communal building info
router.get('/v7/add-heat-network/buildingsandconsumers/communalinfo', function (req, res) {
    clearvalidation(req);

    res.render('/v7/add-heat-network/buildingsandconsumers/communalinfo', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/buildingsandconsumers/communalinfo', function (req, res) {
    clearvalidation(req);
    var buildingaddressPostcode = req.session.data['buildingaddressPostcode']
    var buildingaddressNumber = req.session.data['buildingaddressNumber']

    if (!buildingaddressPostcode || !buildingaddressNumber) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.communalinfo = {
            "anchor": "communalinfo",
            "message": "Fill in all address information before continuing",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/buildingsandconsumers/communalinfo', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/v7/add-heat-network/buildingsandconsumers/cya');
    }
});

// Buildings & consumers - Address
router.get('/v7/add-heat-network/buildingsandconsumers/address', function (req, res) {
    clearvalidation(req);
    res.render('/v7/add-heat-network/buildingsandconsumers/address', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/buildingsandconsumers/address', function (req, res) {
    clearvalidation(req);
    var postcode = req.session.data['buildingaddressPostcode']
    var number = req.session.data['buildingaddressPostcode']

    if (!postcode) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.buildingaddressPostcode = {
            "anchor": "buildingaddressPostcode",
            "message": "Enter a postcode",
        }
    }

    if (!number) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.buildingaddressNumber = {
            "anchor": "buildingaddressNumber",
            "message": "Enter a building name or number",
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/buildingsandconsumers/address', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/v7/add-heat-network/buildingsandconsumers/addressconfirm');

    }
});

// Buildings & consumers - Address
router.get('/v7/add-heat-network/buildingsandconsumers/addresscustomers', function (req, res) {
    clearvalidation(req);
    res.render('/v7/add-heat-network/buildingsandconsumers/addresscustomers', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/buildingsandconsumers/addresscustomers', function (req, res) {
    clearvalidation(req);
    var addresscustomers = req.session.data['buildingaddressCustomers']

    if (!addresscustomers) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.buildingaddressCustomers = {
            "anchor": "buildingaddressCustomers",
            "message": "Enter the number of final customers",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/buildingsandconsumers/addresscustomers', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/v7/add-heat-network/buildingsandconsumers/cya');

    }
});

// Buildings & consumers - cya
router.get('/v7/add-heat-network/buildingsandconsumers/cya', function (req, res) {
    res.render('/v7/add-heat-network/buildingsandconsumers/cya', {
        data: req.session.data
    });
});

router.post('/v7/add-heat-network/buildingsandconsumers/cya', function (req, res) {
    res.redirect('/v7/add-heat-network/tasklist');
});


// Tech - Capacity
router.get('/v7/add-heat-network/technical/capacity', function (req, res) {
    clearvalidation(req);
    res.render('/v7/add-heat-network/technical/capacity', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/technical/capacity', function (req, res) {
    clearvalidation(req);
    var techcapacity = req.session.data['techcapacity']

    if (!techcapacity) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.techcapacity = {
            "anchor": "techcapacity",
            "message": "Enter a capcity"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/technical/capacity', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/v7/add-heat-network/technical/backup');
    }
});

// Tech - Backup
router.get('/v7/add-heat-network/technical/backup', function (req, res) {
    clearvalidation(req);
    res.render('/v7/add-heat-network/technical/backup', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/technical/backup', function (req, res) {
    clearvalidation(req);
    var techbackup = req.session.data['techbackup']

    if (!techbackup) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.techbackup = {
            "anchor": "techbackup",
            "message": "Error text"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/technical/backup', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/v7/add-heat-network/technical/generation');
    }

});

// Tech - generation
router.get('/v7/add-heat-network/technical/generation', function (req, res) {
    clearvalidation(req);
    res.render('/v7/add-heat-network/technical/generation', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/technical/generation', function (req, res) {
    clearvalidation(req);
    var techgeneration = req.session.data['techgeneration']

    if (!techgeneration) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.techgeneration = {
            "anchor": "techgeneration",
            "message": "Error text"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/technical/generation', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/v7/add-heat-network/technical/supply');
    }

});
// Tech - supply
router.get('/v7/add-heat-network/technical/supply', function (req, res) {
    clearvalidation(req);
    res.render('/v7/add-heat-network/technical/supply', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/technical/supply', function (req, res) {
    clearvalidation(req);
    var techsupply = req.session.data['techsupply']

    if (!techsupply) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.techsupply = {
            "anchor": "techsupply",
            "message": "Error text"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/technical/supply', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/v7/add-heat-network/technical/storage');
    }

});

// Tech - storage
router.get('/v7/add-heat-network/technical/storage', function (req, res) {
    clearvalidation(req);
    res.render('/v7/add-heat-network/technical/storage', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/technical/storage', function (req, res) {
    clearvalidation(req);
    var techstorage = req.session.data['techstorage']
    var techstoragecapacity = req.session.data['techstoragecapacity']


    if (!techstorage) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.techstorage = {
            "anchor": "techstorage",
            "message": "Select if the system is capable of thermal storage"
        }
    }

    if (techstorage == "Yes" && !techstoragecapacity) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.techstoragecapacity = {
            "anchor": "techstoragecapacity",
            "message": "Enter a capacity"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/technical/storage', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/v7/add-heat-network/technical/electricity');
    }

});


// Tech - electricity
router.get('/v7/add-heat-network/technical/electricity', function (req, res) {
    clearvalidation(req);
    res.render('/v7/add-heat-network/technical/electricity', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/technical/electricity', function (req, res) {
    clearvalidation(req);
    var techelectricity = req.session.data['techelectricity']
    var techelectricitygeneration = req.session.data['techelectricitygeneration']


    if (!techelectricity) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.techelectricity = {
            "anchor": "techelectricity",
            "message": "Select if the system is capable of thermal electricity"
        }
    }

    if (techelectricity == "Yes" && !techelectricitygeneration) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.techelectricitygeneration = {
            "anchor": "techelectricitygeneration",
            "message": "Enter generation"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/technical/electricity', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/v7/add-heat-network/technical/technology');
    }

});

// Tech - technology
router.get('/v7/add-heat-network/technical/technology', function (req, res) {
    clearvalidation(req);
    res.render('/v7/add-heat-network/technical/technology', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/technical/technology', function (req, res) {
    clearvalidation(req);
    var techtechnology = req.session.data['techtechnology']
    var techtechnologyother = req.session.data['techtechnologyother']


    if (!techtechnology) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.techtechnology = {
            "anchor": "techtechnology",
            "message": "Select a technology"
        }
    }

    if (techtechnology == "Other" && !techtechnologyother) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.techtechnologyother = {
            "anchor": "techtechnologyother",
            "message": "Enter a technology name"
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/technical/technology', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/v7/add-heat-network/technical/energysource');
    }
});

// Tech - energysource
router.get('/v7/add-heat-network/technical/energysource', function (req, res) {
    clearvalidation(req);
    res.render('/v7/add-heat-network/technical/energysource', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/technical/energysource', function (req, res) {
    clearvalidation(req);
    var techenergysource = req.session.data['techenergysource']
    var techenergysourceother = req.session.data['techenergysourceother']


    if (!techenergysource) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.techenergysource = {
            "anchor": "techenergysource",
            "message": "Select an energy source"
        }
    }

    if (techenergysource == "Other" && !techenergysourceother) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.techenergysourceother = {
            "anchor": "techenergysourceother",
            "message": "Enter an energy source name"
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/technical/energysource', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/v7/add-heat-network/technical/when');
    }
});

// Tech when
router.get('/v7/add-heat-network/technical/when', function (req, res) {
    clearvalidation(req);
    res.render('/v7/add-heat-network/technical/when', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/technical/when', function (req, res) {
    clearvalidation(req);
    var techwhenmonth = req.session.data['techwhenmonth']
    var techwhenyear = req.session.data['techwhenyear']

    if (!techwhenmonth || !techwhenyear) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.techwhen = {
            "anchor": "techwhen",
            "message": "Enter a month and year"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/technical/when', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/v7/add-heat-network/technical/summary');
    }
});

// Tech - summary
router.get('/v7/add-heat-network/technical/summary', function (req, res) {
    clearvalidation(req);
    res.render('/v7/add-heat-network/technical/summary', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/technical/summary', function (req, res) {
    clearvalidation(req);
    var techsummaryother = req.session.data['techsummaryother']


    if (!techsummaryother) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.techsummaryother = {
            "anchor": "techsummaryother",
            "message": "Select an option"
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/technical/summary', {
            data: req.session.data
        });
    }

    else {
        if (techsummaryother == "No") {
            res.redirect('/v7/add-heat-network/technical/cya');
        } else {
            req.session.data['techtechnology'] = "";
            req.session.data['technologyother'] = "";
            req.session.data['techenergysource'] = "";
            req.session.data['techenergysourceother'] = "";
            req.session.data['techwhenmonth'] = "";
            req.session.data['techwhenyear'] = "";
            res.redirect('/v7/add-heat-network/technical/technology');
        }

    }

});

// Tech - cya
router.get('/v7/add-heat-network/technical/cya', function (req, res) {
    res.render('/v7/add-heat-network/technical/cya', {
        data: req.session.data
    });
});

router.post('/v7/add-heat-network/technical/cya', function (req, res) {
    res.redirect('/v7/add-heat-network/tasklist');
});

// Metering - cya
router.get('/v7/add-heat-network/metering/check', function (req, res) {
    res.render('/v7/add-heat-network/metering/check', {
        data: req.session.data
    });
});

router.post('/v7/add-heat-network/metering/check', function (req, res) {
    res.redirect('/v7/add-heat-network/tasklist');
});

// Protections - summary
router.get('/v7/add-heat-network/consumerprotections/confirm', function (req, res) {
    res.render('/v7/add-heat-network/consumerprotections/confirm', {
        data: req.session.data
    });
});

router.post('/v7/add-heat-network/consumerprotections/confirm', function (req, res) {
    res.redirect('/v7/add-heat-network/tasklist');
});

// Final submit confirm
router.get('/v7/add-heat-network/confirmsubmit', function (req, res) {
    clearvalidation(req);
    req.session.data['confirms'] = "";
    backURL = req.header('Referer')
    res.render('/v7/add-heat-network/confirmsubmit', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/confirmsubmit', function (req, res) {
    clearvalidation(req);
    var confirms = req.session.data['confirms']

    if (!confirms) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.confirms = {
            "anchor": "confirms",
            "message": "Select whether you wish to submit your application"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/confirmsubmit', {
            data: req.session.data
        });
    }

    else {
        if (confirms == "Yes") {
            res.redirect('/v7/account-information');
        } else {
            res.redirect(backURL);
        }
    }

});
