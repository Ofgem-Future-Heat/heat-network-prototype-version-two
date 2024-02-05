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

// Behalf
router.get('/v7/add-heat-network/introduction/behalf', function (req, res) {
    clearvalidation(req);
    res.render('/v7/add-heat-network/introduction/behalf', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/introduction/behalf', function (req, res) {
    clearvalidation(req);
    var introbehalf = req.session.data['introbehalf']

    if (!introbehalf) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.introbehalf = {
            "anchor": "introbehalf",
            "message": "Error text"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/introduction/behalf', {
            data: req.session.data
        });
    }

    else {
        if (introbehalf == "Yes") {
            res.redirect('/v7/add-heat-network/introduction/role');
        } else {
            res.redirect('/v7/add-heat-network/introduction/role');
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
        res.redirect('/v7/add-heat-network/introduction/supply');

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
        res.redirect('/v7/add-heat-network/introduction/declaration');
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
    req.session.data['communalnetworks'] = req.body.communalnetworks
    var building = req.session.data['building']
    var communalnetworks = req.session.data['communalnetworks']

    if (!building) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.building = {
            "anchor": "building",
            "message": "Error text"
        }
    }

    if (building == "Yes" && !communalnetworks) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.communalnetworks = {
            "anchor": "communalnetworks",
            "message": "Enter the numnber of connected communal networks"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/introduction/building', {
            data: req.session.data
        });
    }

    else {
        if (building == "Yes") {
            res.redirect('/v7/add-heat-network/introduction/another');
        } else {
            res.redirect('/v7/add-heat-network/introduction/sharedfacilities');
        }
    }

});

// Another
router.get('/v7/add-heat-network/introduction/another', function (req, res) {
    clearvalidation(req);
    res.render('/v7/add-heat-network/introduction/another', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/introduction/another', function (req, res) {
    clearvalidation(req);
    req.session.data['another'] = req.body.another
    var another = req.session.data['another']

    if (!another) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.another = {
            "anchor": "another",
            "message": "Error text"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/introduction/another', {
            data: req.session.data
        });
    }

    else {
            res.redirect('/v7/add-heat-network/introduction/selfsupply');
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
        res.redirect('/v7/add-heat-network/introduction/consumertyperesidential');
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
            res.redirect('/v7/add-heat-network/introduction/consumertyperesidential');
        }
    }

});

// Consumer Type Residential
router.get('/v7/add-heat-network/introduction/consumertyperesidential', function (req, res) {
    clearvalidation(req);
    res.render('/v7/add-heat-network/introduction/consumertyperesidential', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/introduction/consumertyperesidential', function (req, res) {
    clearvalidation(req);
    var consumertyperesidential = req.session.data['consumertyperesidential']

    if (!consumertyperesidential) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.consumertyperesidential = {
            "anchor": "consumertyperesidential",
            "message": "Select whether the heat network supplies residential customers",
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/introduction/consumertyperesidential', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/v7/add-heat-network/introduction/consumertypemicrobusiness');

    }
});


// Consumer Type Micro
router.get('/v7/add-heat-network/introduction/consumertypemicrobusiness', function (req, res) {
    clearvalidation(req);
    res.render('/v7/add-heat-network/introduction/consumertypemicrobusiness', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/introduction/consumertypemicrobusiness', function (req, res) {
    clearvalidation(req);
    var consumertypemicrobusiness = req.session.data['consumertypemicrobusiness']

    if (!consumertypemicrobusiness) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.consumertypemicrobusiness = {
            "anchor": "consumertypemicrobusiness",
            "message": "Select whether the heat network supplies microbusinesses",
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/introduction/consumertypemicrobusiness', {
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
    introcomplete = req.session.data['introcomplete']

});


router.post('/v7/add-heat-network/introduction/cya', function (req, res) {
    if (introcomplete == "true") {
        res.redirect('/v7/add-heat-network/confirmchange');
    } else {
        res.redirect('/v7/add-heat-network/introduction/moreinfo');
    }

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

// Location  - control
router.get('/v7/add-heat-network/location/control', function (req, res) {
    clearvalidation(req);
    res.render('/v7/add-heat-network/location/control', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/location/control', function (req, res) {
    clearvalidation(req);
    req.session.data['addresscontrol'] = req.body.addresscontrol
    var addresscontrol = req.session.data['addresscontrol']

    if (!addresscontrol) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.addresscontrol = {
            "anchor": "addresscontrol",
            "message": "Error text"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/location/control', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/v7/add-heat-network/location/cya');
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
        res.redirect('/v7/add-heat-network/buildingsandconsumers/addressselect');

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
        res.redirect('/v7/add-heat-network/buildingsandconsumers/communalinfo');

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


// Submit are you sure
router.get('/v7/add-heat-network/confirmchange', function (req, res) {
    clearvalidation(req);
    req.session.data['confirmchange'] = "";
    backURL = req.header('Referer')
    res.render('/v7/add-heat-network/confirmchange', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/confirmchange', function (req, res) {
    clearvalidation(req);
    var confirmchange = req.session.data['confirmchange']

    if (!confirmchange) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.confirmchange = {
            "anchor": "confirmchange",
            "message": "Confirm whether you wish to make these changes"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/confirmchange', {
            data: req.session.data
        });
    }

    else {
        if (confirmchange == "Yes") {
            res.redirect('/v7/add-heat-network/tasklist');
        } else {
            res.redirect(backURL);
        }
    }

});

// Buildings & consumers - Type
router.get('/v7/add-heat-network/buildingsandconsumers/type', function (req, res) {
    clearvalidation(req);
    res.render('/v7/add-heat-network/buildingsandconsumers/type', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/buildingsandconsumers/type', function (req, res) {
    clearvalidation(req);

    var buildingtype = req.session.data['buildingtype']
    var building = req.session.data['building']
    req.session.data['buildingtypealt'] = req.session.data['buildingtype']

    if (!buildingtype) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.buildingtype = {
            "anchor": "buildingtype",
            "message": "Select a type of building"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/buildingsandconsumers/type', {
            data: req.session.data
        });
    }
    else {
        if (building == "Yes") {
            res.redirect('/v7/add-heat-network/buildingsandconsumers/howmany');
        } else {
            res.redirect('/v7/add-heat-network/buildingsandconsumers/customers');
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


// Buildings & consumers - How many
router.get('/v7/add-heat-network/buildingsandconsumers/howmany', function (req, res) {
    clearvalidation(req);
    res.render('/v7/add-heat-network/buildingsandconsumers/howmany', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/buildingsandconsumers/howmany', function (req, res) {
    clearvalidation(req);
    var buildingtypes = req.session.data['buildingtype']

    for (const type of buildingtypes) {
        req.session.data['howmany' + type] = req.body["howmany" + type]
        let howmany = req.session.data['howmany' + type]
        if (!howmany) {
            req.session.data.validationError = "true"
            req.session.data.validationErrors[type] = {
                "anchor": "howmany" + type,
                "message": "Enter the number of " + type.toLowerCase() + " buildings"
            }
        }

    }


    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/buildingsandconsumers/howmany', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/v7/add-heat-network/buildingsandconsumers/customers');

    }


});


// Buildings & consumers - Customers
router.get('/v7/add-heat-network/buildingsandconsumers/customers', function (req, res) {
    clearvalidation(req);
    res.render('/v7/add-heat-network/buildingsandconsumers/customers', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/buildingsandconsumers/customers', function (req, res) {
    clearvalidation(req);
    req.session.data['customerstotal'] = req.body.customerstotal
    var customerstotal = req.session.data['customerstotal']
    var building = req.session.data['building']
    var communal = req.session.data['communalnetworks']



    if (building != "Yes") {
        if (!customerstotal) {
            req.session.data.validationError = "true"
            req.session.data.validationErrors.customerstotal = {
                "anchor": "customerstotal",
                "message": "Enter the number of customers"
            }
        }


    }

    var buildingtypes = req.session.data['buildingtype']

    if (building == "Yes") {
        for (const type of buildingtypes) {
            if (type != "Mixed0use") {
                req.session.data['customers' + type] = req.body["customers" + type]
                let customers = req.session.data['customers' + type]
                console.log(customers)
                if (!customers) {
                    req.session.data.validationError = "true"
                    req.session.data.validationErrors[type] = {
                        "anchor": "customers" + type,
                        "message": "Enter the number of " + type.toLowerCase() + " customers"
                    }
                }
            }
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/buildingsandconsumers/customers', {
            data: req.session.data
        });
    }

    else {
        if (communal > 1) {
            res.redirect('/v7/add-heat-network/buildingsandconsumers/connections')
        }
        else {
            res.redirect('/v7/add-heat-network/buildingsandconsumers/cya')
        }

    }
});

// Buildings & consumers - Connections
router.get('/v7/add-heat-network/buildingsandconsumers/connections', function (req, res) {
    clearvalidation(req);
    res.render('/v7/add-heat-network/buildingsandconsumers/connections', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/buildingsandconsumers/connections', function (req, res) {
    clearvalidation(req);
    var services = req.session.data['buildingconnections']

    if (!services) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.buildingconnections = {
            "anchor": "buildingconnections",
            "message": "Enter the number of connections",
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/buildingsandconsumers/connections', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/v7/add-heat-network/buildingsandconsumers/communalinfo');

    }

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

// Buildings & consumers - Communal type
router.get('/v7/add-heat-network/buildingsandconsumers/communaltype', function (req, res) {
    clearvalidation(req);

    res.render('/v7/add-heat-network/buildingsandconsumers/communaltype', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/buildingsandconsumers/communaltype', function (req, res) {
    clearvalidation(req);
    var buildingcommunaltype = req.session.data['buildingcommunaltype']

    if (!buildingcommunaltype) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.buildingcommunaltype = {
            "anchor": "buildingcommunaltype",
            "message": "Select the type of building",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/buildingsandconsumers/communaltype', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/v7/add-heat-network/buildingsandconsumers/address');
    }
});

// Buildings & consumers - Address select
router.get('/v7/add-heat-network/buildingsandconsumers/addressselect', function (req, res) {
    clearvalidation(req);
    res.render('/v7/add-heat-network/buildingsandconsumers/addressselect', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/buildingsandconsumers/addressselect', function (req, res) {
    clearvalidation(req);
    var addressselect = req.session.data['buildingaddressSelect']

    if (!addressselect) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.buildingaddressSelect = {
            "anchor": "buildingaddressSelect",
            "message": "Select an address",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/buildingsandconsumers/addressselect', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/v7/add-heat-network/buildingsandconsumers/addressconfirm');

    }
});


// Metering - Class
router.get('/v7/add-heat-network/metering/classes', function (req, res) {
    clearvalidation(req);

    res.render('/v7/add-heat-network/metering/classes', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/metering/classes', function (req, res) {
    clearvalidation(req);
    var meteringclass = req.session.data['meteringclass']

    if (!meteringclass) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.meteringclass = {
            "anchor": "meteringclass-Viable",
            "message": "Select a class of buiulding",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/metering/classes', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/v7/add-heat-network/metering/howmanybuildings');
    }
});


// Metering - Buildings
router.get('/v7/add-heat-network/metering/howmanybuildings', function (req, res) {
    clearvalidation(req);

    res.render('/v7/add-heat-network/metering/howmanybuildings', {
        data: req.session.data
    });
});


router.post('/v7/add-heat-network/metering/howmanybuildings', function (req, res) {
    clearvalidation(req);
    var meteringtypes = req.session.data['meteringclass']

    if (meteringtypes.includes("Viable")) {
        res.redirect('/v7/add-heat-network/metering/viable');
    }

    else if (meteringtypes.includes("Open")) {
        res.redirect('/v7/add-heat-network/metering/open');
    }

    else if (meteringtypes.includes("Exempt")) {
        res.redirect('/v7/add-heat-network/metering/exempt');
    }

    else {
        res.redirect('/v7/add-heat-network/metering/agent');
    }

});

// Metering - Viable
router.get('/v7/add-heat-network/metering/viable', function (req, res) {
    clearvalidation(req);

        res.render('/v7/add-heat-network/metering/viable', {
            data: req.session.data
        });

});


router.post('/v7/add-heat-network/metering/viable', function (req, res) {
    clearvalidation(req);
    var meteringmeters = req.session.data['meteringmeters']
    var meteringtypes = req.session.data['meteringclass']

    if (!meteringmeters) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.meteringmeters = {
            "anchor": "meteringmeters",
            "message": "Enter the number of meters",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/metering/viable', {
            data: req.session.data
        });
    }
    else { 

        if (meteringtypes.includes("Open")) {
            res.redirect('/v7/add-heat-network/metering/open');
        }

        else if (meteringtypes.includes("Exempt")) {
            res.redirect('/v7/add-heat-network/metering/exempt');
        }

        else {
            res.redirect('/v7/add-heat-network/metering/agent');
        }
    }
});


// Metering - Open
router.get('/v7/add-heat-network/metering/open', function (req, res) {
    clearvalidation(req);

    res.render('/v7/add-heat-network/metering/open', {
        data: req.session.data
    });

});


router.post('/v7/add-heat-network/metering/open', function (req, res) {
    clearvalidation(req);
    var meteringtypes = req.session.data['meteringclass']
    var meteringopen1 = req.session.data['meteringopen1']
    var meteringopen2 = req.session.data['meteringopen2']
    var meteringopen3 = req.session.data['meteringopen3']

    if (!meteringopen1 | !meteringopen2 | !meteringopen3) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.meteringopen = {
            "anchor": "meteringopen",
            "message": "Enter all information about open class buildings",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/metering/open', {
            data: req.session.data
        });
    }
    else {

        if (meteringtypes.includes("Exempt")) {
            res.redirect('/v7/add-heat-network/metering/exempt');
        }

        else {
            res.redirect('/v7/add-heat-network/metering/agent');
        }
    }
});


// Metering - Exempt
router.get('/v7/add-heat-network/metering/exempt', function (req, res) {
    clearvalidation(req);

    res.render('/v7/add-heat-network/metering/exempt', {
        data: req.session.data
    });

});


router.post('/v7/add-heat-network/metering/exempt', function (req, res) {
    clearvalidation(req);
    var meteringexempt = req.session.data['meteringexempt']

    if (!meteringexempt) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.meteringexempt = {
            "anchor": "meteringexempt",
            "message": "Enter why some buildings on the heat network are in the exempt class",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/metering/exempt', {
            data: req.session.data
        });
    }
    else {
            res.redirect('/v7/add-heat-network/metering/agent');
    }
});

// Metering - Smart
router.get('/v7/add-heat-network/metering/smart', function (req, res) {
    clearvalidation(req);

    res.render('/v7/add-heat-network/metering/smart', {
        data: req.session.data
    });

});


router.post('/v7/add-heat-network/metering/smart', function (req, res) {
    clearvalidation(req);
    var meteringsmart = req.session.data['meteringsmart']

    if (!meteringsmart) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.meteringsmart = {
            "anchor": "meteringsmart",
            "message": "Select whether smart pre-payment meters are available",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/metering/smart', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/v7/add-heat-network/metering/electrical');
    }
});

// Metering - electrical
router.get('/v7/add-heat-network/metering/electrical', function (req, res) {
    clearvalidation(req);

    res.render('/v7/add-heat-network/metering/electrical', {
        data: req.session.data
    });

});


router.post('/v7/add-heat-network/metering/electrical', function (req, res) {
    clearvalidation(req);
    var meteringelectrical = req.session.data['meteringelectrical']

    if (!meteringelectrical) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.meteringelectrical = {
            "anchor": "meteringelectrical",
            "message": "Select whether electrical sub-metering is available",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/v7/add-heat-network/metering/electrical', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/v7/add-heat-network/metering/check');
    }
});