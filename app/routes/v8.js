const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


var version = "v8";

function clearvalidation(req) {
    req.session.data.validationErrors = {}
    req.session.data.validationError = "false"
    req.session.data.includeValidation = req.query.iv || req.session.data.includeValidation

}



// Add Heat Network - Intro
// Cancel
router.get('/' + version + '/add-heat-network/introduction/cancel', function (req, res) {
    clearvalidation(req);
    req.session.data['cancels'] = "";
    backURL = req.header('Referer')
    res.render('/' + version + '/add-heat-network/introduction/cancel', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/cancel', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/introduction/cancel', {
            data: req.session.data
        });
    }

    else {
        if (cancels == "Yes") {
            res.redirect('/' + version + '/account-information');
        } else {
            res.redirect(backURL);
        }
    }

});

// Behalf
router.get('/' + version + '/add-heat-network/introduction/behalf', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/behalf', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/behalf', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/introduction/behalf', {
            data: req.session.data
        });
    }

    else {
        if (introbehalf == "Yes") {
            res.redirect('/' + version + '/add-heat-network/introduction/role');
        } else {
            res.redirect('/' + version + '/add-heat-network/introduction/role');
        }
    }
});

// Supply
router.get('/' + version + '/add-heat-network/introduction/supply', function (req, res) {
        clearvalidation(req);
        res.render('/' + version + '/add-heat-network/introduction/supply', {
            data: req.session.data
        });
});


router.post('/' + version + '/add-heat-network/introduction/supply', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/introduction/supply', {
            data: req.session.data
        });
    }

    else {
        if (introsupply == "Yes") {
            res.redirect('/' + version + '/add-heat-network/introduction/supplywhen');
        } else {
            res.redirect('/' + version + '/add-heat-network/introduction/supplybefore');
        }
    }
});

// declaration
router.get('/' + version + '/add-heat-network/introduction/declaration', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/declaration', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/declaration', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/introduction/declaration', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/' + version + '/add-heat-network/introduction/supply');

    }

});

// Role
router.get('/' + version + '/add-heat-network/introduction/role', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/role', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/role', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/introduction/role', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/add-heat-network/introduction/declaration');
    }
});

// Supply when
router.get('/' + version + '/add-heat-network/introduction/supplywhen', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/supplywhen', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/supplywhen', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/introduction/supplywhen', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/add-heat-network/introduction/service');
    }
});


// Supply before
router.get('/' + version + '/add-heat-network/introduction/supplybefore', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/supplybefore', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/supplybefore', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/introduction/supplybefore', {
            data: req.session.data
        });
    }

    else {
        if (supplybefore == "Yes") {
            res.redirect('/' + version + '/add-heat-network/introduction/service');
        } else {
            res.redirect('/' + version + '/add-heat-network/introduction/service');
        }
    }

});

// Services
router.get('/' + version + '/add-heat-network/introduction/service', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/service', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/service', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/introduction/service', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/' + version + '/add-heat-network/introduction/building');

    }

});

// Building
router.get('/' + version + '/add-heat-network/introduction/building', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/building', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/building', function (req, res) {
    clearvalidation(req);
    req.session.data['building'] = req.body.building
    req.session.data['communalnetworks'] = req.body.communalnetworks
    var building = req.session.data['building']

    if (!building) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.building = {
            "anchor": "building",
            "message": "Error text"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction/building', {
            data: req.session.data
        });
    }

    else {
        if (building == "Yes") {
            res.redirect('/' + version + '/add-heat-network/introduction/communalnetworks');
        } else {
            res.redirect('/' + version + '/add-heat-network/introduction/sharedfacilities');
        }
    }

});

// Building
router.get('/' + version + '/add-heat-network/introduction/communalnetworks', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/communalnetworks', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/communalnetworks', function (req, res) {
    clearvalidation(req);
    var communalnetworks = req.session.data['communalnetworks']

    if (!communalnetworks) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.communalnetworks = {
            "anchor": "communalnetworks",
            "message": "Enter the number of connected communal networks"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction/communalnetworks', {
            data: req.session.data
        });
    }

    else {

            res.redirect('/' + version + '/add-heat-network/introduction/another');
    }

});

// Another
router.get('/' + version + '/add-heat-network/introduction/another', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/another', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/another', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/introduction/another', {
            data: req.session.data
        });
    }

    else {
            res.redirect('/' + version + '/add-heat-network/introduction/selfsupply');
    }

});


// Selfsupply
router.get('/' + version + '/add-heat-network/introduction/selfsupply', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/selfsupply', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/selfsupply', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/introduction/selfsupply', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/' + version + '/add-heat-network/introduction/consumertyperesidential');
    }

});


// sharedfacilities
router.get('/' + version + '/add-heat-network/introduction/sharedfacilities', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/sharedfacilities', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/sharedfacilities', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/introduction/sharedfacilities', {
            data: req.session.data
        });
    }

    else {
        if (sharedfacilities == "Yes") {
            res.redirect('/' + version + '/add-heat-network/introduction/dropout');
        } else {
            res.redirect('/' + version + '/add-heat-network/introduction/consumertyperesidential');
        }
    }

});

// Consumer Type Residential
router.get('/' + version + '/add-heat-network/introduction/consumertyperesidential', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/consumertyperesidential', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/consumertyperesidential', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/introduction/consumertyperesidential', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/' + version + '/add-heat-network/introduction/consumertypemicrobusiness');

    }
});


// Consumer Type Micro
router.get('/' + version + '/add-heat-network/introduction/consumertypemicrobusiness', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/consumertypemicrobusiness', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/consumertypemicrobusiness', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/introduction/consumertypemicrobusiness', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/' + version + '/add-heat-network/introduction/name');

    }
});

// Name
router.get('/' + version + '/add-heat-network/introduction/name', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/name', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/name', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/introduction/name', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/' + version + '/add-heat-network/introduction/cya');

    }
});

// Intro - cya
router.get('/' + version + '/add-heat-network/introduction/cya', function (req, res) {
    res.render('/' + version + '/add-heat-network/introduction/cya', {
        data: req.session.data
    });
    introcomplete = req.session.data['introcomplete']

});


router.post('/' + version + '/add-heat-network/introduction/cya', function (req, res) {
    if (introcomplete == "true") {
        res.redirect('/' + version + '/add-heat-network/confirmchange');
    } else {
        res.redirect('/' + version + '/add-heat-network/introduction/moreinfo');
    }

});


// Tasklist
router.get('/' + version + '/add-heat-network/tasklist', function (req, res) {
    res.render('/' + version + '/add-heat-network/tasklist', {
        data: req.session.data
    });
});


// Location - Address
router.get('/' + version + '/add-heat-network/location/address', function (req, res) {
    clearvalidation(req);

    res.render('/' + version + '/add-heat-network/location/address', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/location/address', function (req, res) {
    clearvalidation(req);
    var userpostcode = req.session.data['addressPostcode'].replace(/^(.*)(\d)/, "$1 $2");
    var usernumber = req.session.data['addressNumber']

    if (!userpostcode) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.addressPostcode = {
            "anchor": "addressPostcode",
            "message": "Enter a postcode",
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/location/address', {
            data: req.session.data
        });
    }

    else {
        const axios = require('axios');
        const https = require('https');

        const httpsAgent = new https.Agent({
            rejectUnauthorized: false
        })

        const apiKey = 'HDNGKBm2TGbHTt2mr4RxS2Ta0l2Gwth6';

        async function find(postcode, number) {
            axios.get('https://api.os.uk/search/places/v1/find?maxresults=1&minmatch=0.4&query=' + number + ',' + postcode + '&dataset=LPI&key=' + apiKey, { httpsAgent })
                .then(function (response) {
                    var output = JSON.stringify(response.data, null, 2);
                    let parsed = JSON.parse(output).results;
                    let locationaddresses = [];

                    if (parsed != undefined) {
                        for (var i = 0; i < parsed.length; i++) {
                            let obj = parsed[i];
                            locationaddresses.push(obj.LPI.ADDRESS);
                        }

                        req.session.data.locationAddress = locationaddresses;
                        req.session.data.locationAddressSelect = [];
                        res.redirect('/' + version + '/add-heat-network/location/addressconfirm');
                    }
                    else {
                        async function postcode(postcode) {
                            axios.get('https://api.os.uk/search/places/v1/postcode?postcode=' + postcode + '&dataset=LPI&key=' + apiKey, { httpsAgent })
                                .then(function (response) {
                                    var output = JSON.stringify(response.data, null, 2);
                                    let parsed = JSON.parse(output).results;
                                    let locationaddresses = [];

                                    for (var i = 0; i < parsed.length; i++) {
                                        let obj = parsed[i];
                                        locationaddresses.push(obj.LPI.ADDRESS);
                                    }

                                    req.session.data.locationAddressSelect = locationaddresses;
                                    res.redirect('/' + version + '/add-heat-network/location/addressselect');
                                });

                        }
                        postcode(userpostcode);

                    }
                });
        }

        find(userpostcode, usernumber)

    }
});
// Location - Address select

router.get('/' + version + '/add-heat-network/location/addressselect', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/location/addressselect', {
        data: req.session.data
    });
});

router.post('/' + version + '/add-heat-network/location/addressselect', function (req, res) {
    clearvalidation(req);
    var addressselect = req.session.data['locationAddressSelected']

    if (!addressselect) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.locationAddressSelected = {
            "anchor": "locationAddressSelected",
            "message": "Select an address",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/location/addressselect', {
            data: req.session.data
        });
    }

    else {
        req.session.data.locationAddress = req.session.data['locationAddressSelected']
        res.redirect('/' + version + '/add-heat-network/location/addressconfirm');

    }
});



// Location - Address manual
router.get('/' + version + '/add-heat-network/location/addressmanual', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/location/addressmanual', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/location/addressmanual', function (req, res) {
    clearvalidation(req);
    var locationaddressMLine1 = req.session.data['locationaddressMLine1']
    var locationaddressMLine2 = req.session.data['locationaddressMLine2']
    var locationaddressMTown = req.session.data['locationaddressMTown']
    var locationaddressMCounty = req.session.data['locationaddressMCounty']

    var locationaddressMPostcode = req.session.data['locationaddressMPostcode']

    if (!locationaddressMLine1) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.locationaddressMLine1 = {
            "anchor": "locationaddressMLine1",
            "message": "Enter the first line of the address",
        }
    }


    if (!locationaddressMTown) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.locationaddressMTown = {
            "anchor": "locationaddressMTown",
            "message": "Enter a town or city",
        }
    }

    if (!locationaddressMPostcode) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.locationaddressMPostcode = {
            "anchor": "locationaddressMPostcode",
            "message": "Enter a postcode",
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/location/addressmanual', {
            data: req.session.data
        });
    }

    else {
        req.session.data.locationlocationAddress = locationaddressMLine1 + ', ' + locationaddressMLine2 + ', ' + locationaddressMTown + ', ' + locationaddressMCounty + ', ' + locationaddressMPostcode
        res.redirect('/' + version + '/add-heat-network/location/addressconfirm');

    }
});

// Location  - control
router.get('/' + version + '/add-heat-network/location/control', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/location/control', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/location/control', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/location/control', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/' + version + '/add-heat-network/location/cya');
    }

});


// Location - cya
router.get('/' + version + '/add-heat-network/location/cya', function (req, res) {
    res.render('/' + version + '/add-heat-network/location/cya', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/location/cya', function (req, res) {
    res.redirect('/' + version + '/add-heat-network/tasklist');
});



// sharedfacilities
router.get('/' + version + '/add-heat-network/buildingsandconsumers/communalheating', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/buildingsandconsumers/communalheating', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers/communalheating', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/buildingsandconsumers/communalheating', {
            data: req.session.data
        });
    }

    else {
        if (communalheating == "Yes") {
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/howmanycommunal');
        } else {
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/cya');
        }
    }

});

// Buildings & consumers - Communal How Many
router.get('/' + version + '/add-heat-network/buildingsandconsumers/howmanycommunal', function (req, res) {
    clearvalidation(req);

    res.render('/' + version + '/add-heat-network/buildingsandconsumers/howmanycommunal', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers/howmanycommunal', function (req, res) {
    clearvalidation(req);

    res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/communalinfo');
});




// Buildings & consumers - Address
router.get('/' + version + '/add-heat-network/buildingsandconsumers/addresscustomers', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/buildingsandconsumers/addresscustomers', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers/addresscustomers', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/buildingsandconsumers/addresscustomers', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/communalinfo');

    }
});

// Buildings & consumers - cya
router.get('/' + version + '/add-heat-network/buildingsandconsumers/cya', function (req, res) {
    res.render('/' + version + '/add-heat-network/buildingsandconsumers/cya', {
        data: req.session.data
    });
});

router.post('/' + version + '/add-heat-network/buildingsandconsumers/cya', function (req, res) {
    res.redirect('/' + version + '/add-heat-network/tasklist');
});


// Tech - Capacity
router.get('/' + version + '/add-heat-network/technical/capacity', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/technical/capacity', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/technical/capacity', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/technical/capacity', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/add-heat-network/technical/backup');
    }
});

// Tech - Backup
router.get('/' + version + '/add-heat-network/technical/backup', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/technical/backup', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/technical/backup', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/technical/backup', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/' + version + '/add-heat-network/technical/generation');
    }

});

// Tech - generation
router.get('/' + version + '/add-heat-network/technical/generation', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/technical/generation', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/technical/generation', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/technical/generation', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/' + version + '/add-heat-network/technical/supply');
    }

});
// Tech - supply
router.get('/' + version + '/add-heat-network/technical/supply', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/technical/supply', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/technical/supply', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/technical/supply', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/' + version + '/add-heat-network/technical/storage');
    }

});

// Tech - storage
router.get('/' + version + '/add-heat-network/technical/storage', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/technical/storage', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/technical/storage', function (req, res) {
    clearvalidation(req);
    var techstorage = req.session.data['techstorage']


    if (!techstorage) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.techstorage = {
            "anchor": "techstorage",
            "message": "Select if the system is capable of thermal storage"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/technical/storage', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/' + version + '/add-heat-network/technical/electricity');
    }

});


// Tech - electricity
router.get('/' + version + '/add-heat-network/technical/electricity', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/technical/electricity', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/technical/electricity', function (req, res) {
    clearvalidation(req);
    var techelectricity = req.session.data['techelectricity']


    if (!techelectricity) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.techelectricity = {
            "anchor": "techelectricity",
            "message": "Select if the system is capable of thermal electricity"
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/technical/electricity', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/' + version + '/add-heat-network/technical/technology');
    }

});

// Tech - technology
router.get('/' + version + '/add-heat-network/technical/technology', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/technical/technology', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/technical/technology', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/technical/technology', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/add-heat-network/technical/energysource');
    }
});

// Tech - energysource
router.get('/' + version + '/add-heat-network/technical/energysource', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/technical/energysource', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/technical/energysource', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/technical/energysource', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/add-heat-network/technical/when');
    }
});

// Tech when
router.get('/' + version + '/add-heat-network/technical/when', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/technical/when', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/technical/when', function (req, res) {
    clearvalidation(req);

        res.redirect('/' + version + '/add-heat-network/technical/summary');
});

// Tech - summary
router.get('/' + version + '/add-heat-network/technical/summary', function (req, res) {
    clearvalidation(req);


    res.render('/' + version + '/add-heat-network/technical/summary', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/technical/summary', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/technical/summary', {
            data: req.session.data
        });
    }

    else {
        req.session.data.technologies = req.session.data.technologies || []
        req.session.data.technologies.push([
            req.session.data['techtechnology'] || req.session.data['technologyother'],
            req.session.data['techenergysource'] || req.session.data['techenergysourceother'],
            req.session.data['techwhenyear']]
        )

        if (techsummaryother == "No") {
            res.redirect('/' + version + '/add-heat-network/technical/cya');
        } else {
            req.session.data['techtechnology'] = "";
            req.session.data['technologyother'] = "";
            req.session.data['techenergysource'] = "";
            req.session.data['techenergysourceother'] = "";
            req.session.data['techwhenyear'] = "";

            res.redirect('/' + version + '/add-heat-network/technical/technology');
        }

    }

});

// Tech - cya
router.get('/' + version + '/add-heat-network/technical/cya', function (req, res) {
    res.render('/' + version + '/add-heat-network/technical/cya', {
        data: req.session.data
    });
});

router.post('/' + version + '/add-heat-network/technical/cya', function (req, res) {
    res.redirect('/' + version + '/add-heat-network/tasklist');
});

// Metering - cya
router.get('/' + version + '/add-heat-network/metering/cya', function (req, res) {
    res.render('/' + version + '/add-heat-network/metering/cya', {
        data: req.session.data
    });
});

router.post('/' + version + '/add-heat-network/metering/cya', function (req, res) {
    res.redirect('/' + version + '/add-heat-network/tasklist');
});

// Protections - summary
router.get('/' + version + '/add-heat-network/consumerprotections/confirm', function (req, res) {
    res.render('/' + version + '/add-heat-network/consumerprotections/confirm', {
        data: req.session.data
    });
});

router.post('/' + version + '/add-heat-network/consumerprotections/confirm', function (req, res) {
    res.redirect('/' + version + '/add-heat-network/tasklist');
});

// Final submit confirm
router.get('/' + version + '/add-heat-network/confirmsubmit', function (req, res) {
    clearvalidation(req);
    req.session.data['confirms'] = "";
    backURL = req.header('Referer')
    res.render('/' + version + '/add-heat-network/confirmsubmit', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/confirmsubmit', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/confirmsubmit', {
            data: req.session.data
        });
    }

    else {
        if (confirms == "Yes") {
            res.redirect('/' + version + '/account-information');
        } else {
            res.redirect(backURL);
        }
    }

});


// Submit are you sure
router.get('/' + version + '/add-heat-network/confirmchange', function (req, res) {
    clearvalidation(req);
    req.session.data['confirmchange'] = "";
    backURL = req.header('Referer')
    res.render('/' + version + '/add-heat-network/confirmchange', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/confirmchange', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/confirmchange', {
            data: req.session.data
        });
    }

    else {
        if (confirmchange == "Yes") {
            res.redirect('/' + version + '/add-heat-network/tasklist');
        } else {
            res.redirect(backURL);
        }
    }

});

// Buildings & consumers - Type
router.get('/' + version + '/add-heat-network/buildingsandconsumers/type', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/buildingsandconsumers/type', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers/type', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/buildingsandconsumers/type', {
            data: req.session.data
        });
    }
    else {
        if (building == "Yes") {
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/howmany');
        } else {
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/customers');
        }
    }
});


// Services
router.get('/' + version + '/add-heat-network/introduction/service', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction/service', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction/service', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/introduction/service', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/' + version + '/add-heat-network/introduction/building');

    }

});


// Buildings & consumers - How many
router.get('/' + version + '/add-heat-network/buildingsandconsumers/howmany', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/buildingsandconsumers/howmany', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers/howmany', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/buildingsandconsumers/howmany', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/customers');

    }


});


// Buildings & consumers - Customers
router.get('/' + version + '/add-heat-network/buildingsandconsumers/customers', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/buildingsandconsumers/customers', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers/customers', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/buildingsandconsumers/customers', {
            data: req.session.data
        });
    }

    else {
        if (communal > 1) {
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/communalinfo')
        }
        else {
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/cya')
        }

    }
});

// Buildings & consumers - Connections
router.get('/' + version + '/add-heat-network/buildingsandconsumers/connections', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/buildingsandconsumers/connections', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers/connections', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/buildingsandconsumers/connections', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/communalinfo');

    }

});


// Buildings & consumers - Communal building info
router.get('/' + version + '/add-heat-network/buildingsandconsumers/communalinfo', function (req, res) {
    clearvalidation(req);

    res.render('/' + version + '/add-heat-network/buildingsandconsumers/communalinfo', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers/communalinfo', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/buildingsandconsumers/communalinfo', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/cya');
    }
});

// Buildings & consumers - Communal type
router.get('/' + version + '/add-heat-network/buildingsandconsumers/communaltype', function (req, res) {
    clearvalidation(req);

    res.render('/' + version + '/add-heat-network/buildingsandconsumers/communaltype', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers/communaltype', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/buildingsandconsumers/communaltype', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/address');
    }
});

// Buildings & consumers - Address
router.get('/' + version + '/add-heat-network/buildingsandconsumers/address', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/buildingsandconsumers/address', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers/address', function (req, res) {
    clearvalidation(req);
    var userpostcode = req.session.data['buildingaddressPostcode'].replace(/^(.*)(\d)/, "$1 $2");
    var usernumber = req.session.data['buildingaddressNumber']

    if (!userpostcode) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.buildingaddressPostcode = {
            "anchor": "buildingaddressPostcode",
            "message": "Enter a postcode",
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/buildingsandconsumers/address', {
            data: req.session.data
        });
    }

    else {
        const axios = require('axios');
        const https = require('https');

        const httpsAgent = new https.Agent({
            rejectUnauthorized: false
        })

        const apiKey = 'HDNGKBm2TGbHTt2mr4RxS2Ta0l2Gwth6';

            async function find(postcode, number) {
                axios.get('https://api.os.uk/search/places/v1/find?maxresults=1&minmatch=0.4&query=' + number + ',' + postcode + '&dataset=LPI&key=' + apiKey, { httpsAgent })
                    .then(function (response) {
                        var output = JSON.stringify(response.data, null, 2);
                        let parsed = JSON.parse(output).results;
                        let locationaddresses = [];

                        if (parsed != undefined) {
                            for (var i = 0; i < parsed.length; i++) {
                                let obj = parsed[i];
                                locationaddresses.push(obj.LPI.ADDRESS);
                            }

                            req.session.data.buildinglocationAddress = locationaddresses;
                            req.session.data.buildinglocationAddressSelect = [];
                            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/addressconfirm');
                        }
                        else {
                            async function postcode(postcode) {
                                axios.get('https://api.os.uk/search/places/v1/postcode?postcode=' + postcode + '&dataset=LPI&key=' + apiKey, { httpsAgent })
                                    .then(function (response) {
                                        var output = JSON.stringify(response.data, null, 2);
                                        let parsed = JSON.parse(output).results;
                                        let locationaddresses = [];

                                        for (var i = 0; i < parsed.length; i++) {
                                            let obj = parsed[i];
                                            locationaddresses.push(obj.LPI.ADDRESS);
                                        }

                                        req.session.data.buildinglocationAddressSelect = locationaddresses;
                                        res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/addressselect');
                                    });

                            }
                            postcode(userpostcode);

                        }
                    });
            }

            find(userpostcode, usernumber)

        }


});


// Buildings & consumers - Address select
router.get('/' + version + '/add-heat-network/buildingsandconsumers/addressselect', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/buildingsandconsumers/addressselect', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers/addressselect', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/buildingsandconsumers/addressselect', {
            data: req.session.data
        });
    }

    else {
        req.session.data.buildinglocationAddress = req.session.data['buildingaddressSelect']
        res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/addressconfirm');

    }
});

// Buildings & consumers - Address confirm
router.get('/' + version + '/add-heat-network/buildingsandconsumers/addressconfirm', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/buildingsandconsumers/addressconfirm', {
        data: req.session.data
    });
});


// Buildings & consumers - Address manual
router.get('/' + version + '/add-heat-network/buildingsandconsumers/addressmanual', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/buildingsandconsumers/addressmanual', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers/addressmanual', function (req, res) {
    clearvalidation(req);
    var buildingaddressMLine1 = req.session.data['buildingaddressMLine1']
    var buildingaddressMLine2 = req.session.data['buildingaddressMLine2']
    var buildingaddressMTown = req.session.data['buildingaddressMTown']
    var buildingaddressMCounty = req.session.data['buildingaddressMCounty']

    var buildingaddressMPostcode = req.session.data['buildingaddressMPostcode']

    if (!buildingaddressMLine1) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.buildingaddressMLine1 = {
            "anchor": "buildingaddressMLine1",
            "message": "Enter the first line of the address",
        }
    }


    if (!buildingaddressMTown) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.buildingaddressMTown = {
            "anchor": "buildingaddressMTown",
            "message": "Enter a town or city",
        }
    }

    if (!buildingaddressMPostcode) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.buildingaddressMPostcode = {
            "anchor": "buildingaddressMPostcode",
            "message": "Enter a postcode",
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/buildingsandconsumers/addressmanual', {
            data: req.session.data
        });
    }

    else {
        req.session.data.buildinglocationAddress = buildingaddressMLine1 + ', ' + buildingaddressMLine2 + ', ' + buildingaddressMTown + ', ' + buildingaddressMCounty + ', ' + buildingaddressMPostcode
        res.redirect('/' + version + '/add-heat-network/buildingsandconsumers/addressconfirm');

    }
});





// Metering - Class
router.get('/' + version + '/add-heat-network/metering/classes', function (req, res) {
    clearvalidation(req);

    res.render('/' + version + '/add-heat-network/metering/classes', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/metering/classes', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/metering/classes', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/add-heat-network/metering/howmanybuildings');
    }
});


// Metering - Buildings
router.get('/' + version + '/add-heat-network/metering/howmanybuildings', function (req, res) {
    clearvalidation(req);

    res.render('/' + version + '/add-heat-network/metering/howmanybuildings', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/metering/howmanybuildings', function (req, res) {
    clearvalidation(req);
    var meteringtypes = req.session.data['meteringclass']

    if (meteringtypes.includes("Viable")) {
        res.redirect('/' + version + '/add-heat-network/metering/viable');
    }

    else if (meteringtypes.includes("Open")) {
        res.redirect('/' + version + '/add-heat-network/metering/open');
    }

    else if (meteringtypes.includes("Exempt")) {
        res.redirect('/' + version + '/add-heat-network/metering/exempt');
    }

    else {
        res.redirect('/' + version + '/add-heat-network/metering/agent');
    }

});

// Metering - Viable
router.get('/' + version + '/add-heat-network/metering/viable', function (req, res) {
    clearvalidation(req);

        res.render('/' + version + '/add-heat-network/metering/viable', {
            data: req.session.data
        });

});


router.post('/' + version + '/add-heat-network/metering/viable', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/metering/viable', {
            data: req.session.data
        });
    }
    else { 

        if (meteringtypes.includes("Open")) {
            res.redirect('/' + version + '/add-heat-network/metering/open');
        }

        else if (meteringtypes.includes("Exempt")) {
            res.redirect('/' + version + '/add-heat-network/metering/exempt');
        }

        else {
            res.redirect('/' + version + '/add-heat-network/metering/agent');
        }
    }
});


// Metering - Open
router.get('/' + version + '/add-heat-network/metering/open', function (req, res) {
    clearvalidation(req);

    res.render('/' + version + '/add-heat-network/metering/open', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/metering/open', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/metering/open', {
            data: req.session.data
        });
    }
    else {

        if (meteringtypes.includes("Exempt")) {
            res.redirect('/' + version + '/add-heat-network/metering/exempt');
        }

        else {
            res.redirect('/' + version + '/add-heat-network/metering/agent');
        }
    }
});


// Metering - Exempt
router.get('/' + version + '/add-heat-network/metering/exempt', function (req, res) {
    clearvalidation(req);

    res.render('/' + version + '/add-heat-network/metering/exempt', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/metering/exempt', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/metering/exempt', {
            data: req.session.data
        });
    }
    else {
            res.redirect('/' + version + '/add-heat-network/metering/agent');
    }
});

// Metering - Smart
router.get('/' + version + '/add-heat-network/metering/smart', function (req, res) {
    clearvalidation(req);

    res.render('/' + version + '/add-heat-network/metering/smart', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/metering/smart', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/metering/smart', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/add-heat-network/metering/electrical');
    }
});

// Metering - electrical
router.get('/' + version + '/add-heat-network/metering/electrical', function (req, res) {
    clearvalidation(req);

    res.render('/' + version + '/add-heat-network/metering/electrical', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/metering/electrical', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/metering/electrical', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/add-heat-network/metering/cya');
    }
});


// Metering - type
router.get('/' + version + '/add-heat-network/metering/type-check', function (req, res) {
    clearvalidation(req);

    res.render('/' + version + '/add-heat-network/metering/type-check', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/metering/type-check', function (req, res) {
    clearvalidation(req);
    var metertype = req.session.data['metertype']


    if (metertype.includes("Building level meters")) {
        res.redirect('/' + version + '/add-heat-network/metering/level');
    }

    else if (metertype.includes("Final consumer meters")) {
        res.redirect('/' + version + '/add-heat-network/metering/consumer');
    }

    else if (metertype.includes("Final consumer heat cost allocators")) {
        res.redirect('/' + version + '/add-heat-network/metering/cost');
    }
    else {
        res.redirect('/' + version + '/add-heat-network/metering/smart');
    }
});

// Metering - level
router.get('/' + version + '/add-heat-network/metering/level', function (req, res) {
    clearvalidation(req);

    res.render('/' + version + '/add-heat-network/metering/level', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/metering/level', function (req, res) {
    clearvalidation(req);
    var metertype = req.session.data['metertype']

    if (metertype.includes("Final consumer meters")) {
        res.redirect('/' + version + '/add-heat-network/metering/consumer');
    }

    else if (metertype.includes("Final consumer heat cost allocators")) {
        res.redirect('/' + version + '/add-heat-network/metering/cost');
    }
    else {
        res.redirect('/' + version + '/add-heat-network/metering/smart');
    }
});


// Metering - consumer
router.get('/' + version + '/add-heat-network/metering/consumer', function (req, res) {
    clearvalidation(req);

    res.render('/' + version + '/add-heat-network/metering/consumer', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/metering/consumer', function (req, res) {
    clearvalidation(req);
    var metertype = req.session.data['metertype']

    if (metertype.includes("Final consumer heat cost allocators")) {
        res.redirect('/' + version + '/add-heat-network/metering/cost');
    }
    else {
        res.redirect('/' + version + '/add-heat-network/metering/smart');
    }
});

// Metering - cost
router.get('/' + version + '/add-heat-network/metering/cost', function (req, res) {
    clearvalidation(req);

    res.render('/' + version + '/add-heat-network/metering/cost', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/metering/cost', function (req, res) {
    clearvalidation(req);

        res.redirect('/' + version + '/add-heat-network/metering/smart');
});

// Metering - agent
router.get('/' + version + '/add-heat-network/metering/agent', function (req, res) {
    clearvalidation(req);

    res.render('/' + version + '/add-heat-network/metering/agent', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/metering/agent', function (req, res) {
    clearvalidation(req);
    var meteringagent = req.session.data['meteringagent']

    if (!meteringagent) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.meteringagent = {
            "anchor": "meteringagent",
            "message": "Select whether you use a metering agent",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/metering/agent', {
            data: req.session.data
        });
    }
    else {
        if (meteringagent == "Yes") {
            res.redirect('/' + version + '/add-heat-network/metering/agent-name');
        }
        else {
            res.redirect('/' + version + '/add-heat-network/metering/type-check');
        }

    }
});

// Metering - agent name
router.get('/' + version + '/add-heat-network/metering/agent-name', function (req, res) {
    clearvalidation(req);

    res.render('/' + version + '/add-heat-network/metering/agent-name', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/metering/agent-name', function (req, res) {
    clearvalidation(req);
    var meteringagentname = req.session.data['meteringagentname']

    if (!meteringagentname) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.meteringagentname = {
            "anchor": "meteringagentname",
            "message": "Enter a metering agent name",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/metering/agent-name', {
            data: req.session.data
        });
    }
    else {

            res.redirect('/' + version + '/add-heat-network/metering/type-check');


    }
});




// Billing - often
router.get('/' + version + '/add-heat-network/billing/often', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/billing/often', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/billing/often', function (req, res) {
    clearvalidation(req);
    var billingoften = req.session.data['billingoften']

    if (!billingoften) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.billingoften = {
            "anchor": "billingoften",
            "message": "Select how often you send bills",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/billing/often', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/add-heat-network/billing/calculated');
    }
});


// Billing - calculated
router.get('/' + version + '/add-heat-network/billing/calculated', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/billing/calculated', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/billing/calculated', function (req, res) {
    clearvalidation(req);
    var billingcalculated = req.session.data['billingcalculated']

    if (!billingcalculated) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.billingcalculated = {
            "anchor": "billingcalculated",
            "message": "Select how calculated you send bills",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/billing/calculated', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/add-heat-network/billing/compare');
    }
});


// Billing - compare
router.get('/' + version + '/add-heat-network/billing/compare', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/billing/compare', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/billing/compare', function (req, res) {
    clearvalidation(req);
    var billingcompare = req.session.data['billingcompare']

    if (!billingcompare) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.billingcompare = {
            "anchor": "billingcompare",
            "message": "Select how compare you send bills",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/billing/compare', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/add-heat-network/billing/otherinfo');
    }
});

// Billing - available
router.get('/' + version + '/add-heat-network/billing/available', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/billing/available', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/billing/available', function (req, res) {
    clearvalidation(req);
    var billingavailable = req.session.data['billingavailable']

    if (!billingavailable) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.billingavailable = {
            "anchor": "billingavailable",
            "message": "Select at least one option",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/billing/available', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/add-heat-network/billing/cya');
    }
});

// Billing - other info
router.get('/' + version + '/add-heat-network/billing/otherinfo', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/billing/otherinfo', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/billing/otherinfo', function (req, res) {
    clearvalidation(req);
    var billinginfo = req.session.data['billinginfo']

    //if (!billinginfo) {
    //    req.session.data.validationError = "true"
    //    req.session.data.validationErrors.billinginfo = {
    //        "anchor": "billinginfo",
    //        "message": "Select how otherinfo you send bills",
    //    }
    //}


    //if (req.session.data.validationError == "true") {
    //    res.render('/' + version + '/add-heat-network/billing/otherinfo', {
    //        data: req.session.data
    //    });
    //}
    //else {
        res.redirect('/' + version + '/add-heat-network/billing/available');
//    }
});


// Billing - cya
router.get('/' + version + '/add-heat-network/billing/cya', function (req, res) {
    res.render('/' + version + '/add-heat-network/billing/cya', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/billing/cya', function (req, res) {
    res.redirect('/' + version + '/add-heat-network/tasklist');
});



// Financial - plan
router.get('/' + version + '/add-heat-network/financial/plan', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/financial/plan', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/financial/plan', function (req, res) {
    clearvalidation(req);
    var financialplan = req.session.data['financialplan']

    if (!financialplan) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.financialplan = {
            "anchor": "financialplan",
            "message": "Tell us whether you have a continuity plan in place",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/financial/plan', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/add-heat-network/financial/arrangement');
    }
});

// Financial - arrangement
router.get('/' + version + '/add-heat-network/financial/arrangement', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/financial/arrangement', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/financial/arrangement', function (req, res) {
    clearvalidation(req);
    var financialarrangement = req.session.data['financialarrangement']

    if (!financialarrangement) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.financialarrangement = {
            "anchor": "financialarrangement",
            "message": "Tell us whether you have a continuity arrangement in place",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/financial/arrangement', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/add-heat-network/financial/cya');
    }
});

// Financial - cya
router.get('/' + version + '/add-heat-network/financial/cya', function (req, res) {
    res.render('/' + version + '/add-heat-network/financial/cya', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/financial/cya', function (req, res) {
    res.redirect('/' + version + '/add-heat-network/tasklist');
});


// Consumer - vulnerable
router.get('/' + version + '/add-heat-network/consumerprotections/vulnerable', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/consumerprotections/vulnerable', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/consumerprotections/vulnerable', function (req, res) {
    clearvalidation(req);
    var consumervulnerable = req.session.data['consumervulnerable']
    var consumervulnerableammount = req.session.data['consumervulnerableammount']

    if (!consumervulnerable) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.consumervulnerable = {
            "anchor": "consumervulnerable",
            "message": "Tell us whether the heat network supply vulnerable customers",
        }
    }

    if (consumervulnerable == "Yes" && !consumervulnerableammount) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.consumervulnerableammount = {
            "anchor": "consumervulnerableammount",
            "message": "Enter the total number of vulnerable customer",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/consumerprotections/vulnerable', {
            data: req.session.data
        });
    }
    else {
        if (consumervulnerable == "Yes") {
            res.redirect('/' + version + '/add-heat-network/consumerprotections/psr');
        }

        else {
            res.redirect('/' + version + '/add-heat-network/consumerprotections/confirm');
        }
    }
});


// Consumer - psr
router.get('/' + version + '/add-heat-network/consumerprotections/psr', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/consumerprotections/psr', {
        data: req.session.data
    });

});


router.post('/' + version + '/add-heat-network/consumerprotections/psr', function (req, res) {
    clearvalidation(req);
    var consumerpsr = req.session.data['consumerpsr']

    if (!consumerpsr) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.consumerpsr = {
            "anchor": "consumerpsr",
            "message": "Tell us whether you have a Priority Service Register (PSR)",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/consumerprotections/psr', {
            data: req.session.data
        });
    }
    else {
            res.redirect('/' + version + '/add-heat-network/consumerprotections/confirm');

    }
});

// Salesforce demo flow


// Building
router.get('/' + version + '/salesforce/building', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/salesforce/building', {
        data: req.session.data
    });
});


router.post('/' + version + '/salesforce/building', function (req, res) {
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
        res.render('/' + version + '/salesforce/building', {
            data: req.session.data
        });
    }

    else {
        if (building == "Yes") {
            res.redirect('/' + version + '/salesforce/communalnetworks');
        } else {
            res.redirect('/' + version + '/salesforce/name');
        }
    }

});


// Communal networks
router.get('/' + version + '/salesforce/communalnetworks', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/salesforce/communalnetworks', {
        data: req.session.data
    });
});


router.post('/' + version + '/salesforce/communalnetworks', function (req, res) {
    clearvalidation(req);
    var communalnetworks = req.session.data['communalnetworks']

    if (!communalnetworks) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.communalnetworks = {
            "anchor": "communalnetworks",
            "message": "Enter the number of connected communal networks"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/salesforce/communalnetworks', {
            data: req.session.data
        });
    }

    else {

        res.redirect('/' + version + '/salesforce/name');
    }

});


// Name
router.get('/' + version + '/salesforce/name', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/salesforce/name', {
        data: req.session.data
    });
});


router.post('/' + version + '/salesforce/name', function (req, res) {
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
        res.render('/' + version + '/salesforce/name', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/' + version + '/salesforce/cya');

    }
});

// Intro - cya
router.get('/' + version + '/salesforce/cya', function (req, res) {
    res.render('/' + version + '/salesforce/cya', {
        data: req.session.data
    });
    introcomplete = req.session.data['introcomplete']

});


router.post('/' + version + '/salesforce/cya', function (req, res) {

        res.redirect('/' + version + '/salesforce/tasklist');

});

// Buildings & consumers - Type
router.get('/' + version + '/salesforce/type', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/salesforce/type', {
        data: req.session.data
    });
});


router.post('/' + version + '/salesforce/type', function (req, res) {
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
        res.render('/' + version + '/salesforce/type', {
            data: req.session.data
        });
    }
    else {
        if (building == "Yes") {
            res.redirect('/' + version + '/salesforce/howmany');
        } else {
            res.redirect('/' + version + '/salesforce/customers');
        }
    }
});


// Buildings & consumers - How many
router.get('/' + version + '/salesforce/howmany', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/salesforce/howmany', {
        data: req.session.data
    });
});


router.post('/' + version + '/salesforce/howmany', function (req, res) {
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
        res.render('/' + version + '/salesforce/howmany', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/salesforce/customers');

    }


});

// Buildings & consumers - Customers
router.get('/' + version + '/salesforce/customers', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/salesforce/customers', {
        data: req.session.data
    });
});


router.post('/' + version + '/salesforce/customers', function (req, res) {
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
        res.render('/' + version + '/salesforce/customers', {
            data: req.session.data
        });
    }

    else {
        if (communal > 1) {
            var totalsummed = 0;
            for (const type of buildingtypes) {
                var typenumber = parseInt(req.session.data['customers' + type])
                totalsummed += typenumber
            }
            req.session.data['customerstotal'] = totalsummed
            res.redirect('/' + version + '/salesforce/communalinfo')
        }
        else {
            res.redirect('/' + version + '/salesforce/cya2')
        }

    }
});


// Buildings & consumers - Communal type
router.get('/' + version + '/salesforce/communaltype', function (req, res) {
    clearvalidation(req);

    res.render('/' + version + '/salesforce/communaltype', {
        data: req.session.data
    });
});


router.post('/' + version + '/salesforce/communaltype', function (req, res) {
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
        res.render('/' + version + '/salesforce/communaltype', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/salesforce/address');
    }
});


// Buildings & consumers - Communal building info
router.get('/' + version + '/salesforce/communalinfo', function (req, res) {
    clearvalidation(req);

    res.render('/' + version + '/salesforce/communalinfo', {
        data: req.session.data
    });
});


router.post('/' + version + '/salesforce/communalinfo', function (req, res) {
    clearvalidation(req);
    var buildingaddressPostcode = req.session.data['buildingaddressPostcode']
    var buildingaddressNumber = req.session.data['buildingaddressNumber']

    if (!buildingaddressPostcode || !buildingaddressNumber) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.communalinfo = {
            "anchor": "communalinfo",
            "message": "You must add information about all connected communal networks before you can continue",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/salesforce/communalinfo', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/salesforce/cya2');
    }
});


// Buildings & consumers - Address
router.get('/' + version + '/salesforce/address', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/salesforce/address', {
        data: req.session.data
    });
});


router.post('/' + version + '/salesforce/address', function (req, res) {
    clearvalidation(req);
    var userpostcode = req.session.data['buildingaddressPostcode'].replace(/^(.*)(\d)/, "$1 $2");
    var usernumber = req.session.data['buildingaddressNumber']

    if (!userpostcode) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.buildingaddressPostcode = {
            "anchor": "buildingaddressPostcode",
            "message": "Enter a postcode",
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/salesforce/address', {
            data: req.session.data
        });
    }

    else {
        const axios = require('axios');
        const https = require('https');

        const httpsAgent = new https.Agent({
            rejectUnauthorized: false
        })

        const apiKey = 'HDNGKBm2TGbHTt2mr4RxS2Ta0l2Gwth6';

        async function find(postcode, number) {
            axios.get('https://api.os.uk/search/places/v1/find?maxresults=1&minmatch=0.4&query=' + number + ',' + postcode + '&dataset=LPI&key=' + apiKey, { httpsAgent })
                .then(function (response) {
                    var output = JSON.stringify(response.data, null, 2);
                    let parsed = JSON.parse(output).results;
                    let locationaddresses = [];

                    if (parsed != undefined) {
                        for (var i = 0; i < parsed.length; i++) {
                            let obj = parsed[i];
                            locationaddresses.push(obj.LPI.ADDRESS);
                        }

                        req.session.data.buildinglocationAddress = locationaddresses;
                        req.session.data.buildinglocationAddressSelect = [];
                        res.redirect('/' + version + '/salesforce/addressconfirm');
                    }
                    else {
                        async function postcode(postcode) {
                            axios.get('https://api.os.uk/search/places/v1/postcode?postcode=' + postcode + '&dataset=LPI&key=' + apiKey, { httpsAgent })
                                .then(function (response) {
                                    var output = JSON.stringify(response.data, null, 2);
                                    let parsed = JSON.parse(output).results;
                                    let locationaddresses = [];

                                    for (var i = 0; i < parsed.length; i++) {
                                        let obj = parsed[i];
                                        locationaddresses.push(obj.LPI.ADDRESS);
                                    }

                                    req.session.data.buildinglocationAddressSelect = locationaddresses;
                                    res.redirect('/' + version + '/salesforce/addressselect');
                                });

                        }
                        postcode(userpostcode);

                    }
                });
        }

        find(userpostcode, usernumber)

    }


});


// Buildings & consumers - Address select
router.get('/' + version + '/salesforce/addressselect', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/salesforce/addressselect', {
        data: req.session.data
    });
});


router.post('/' + version + '/salesforce/addressselect', function (req, res) {
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
        res.render('/' + version + '/salesforce/addressselect', {
            data: req.session.data
        });
    }

    else {
        req.session.data.buildinglocationAddress = req.session.data['buildingaddressSelect']
        res.redirect('/' + version + '/salesforce/addressconfirm');

    }
});

// Buildings & consumers - Address confirm
router.get('/' + version + '/salesforce/addressconfirm', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/salesforce/addressconfirm', {
        data: req.session.data
    });
});


// Buildings & consumers - Address manual
router.get('/' + version + '/salesforce/addressmanual', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/salesforce/addressmanual', {
        data: req.session.data
    });
});


router.post('/' + version + '/salesforce/addressmanual', function (req, res) {
    clearvalidation(req);
    var buildingaddressMLine1 = req.session.data['buildingaddressMLine1']
    var buildingaddressMLine2 = req.session.data['buildingaddressMLine2']
    var buildingaddressMTown = req.session.data['buildingaddressMTown']
    var buildingaddressMCounty = req.session.data['buildingaddressMCounty']

    var buildingaddressMPostcode = req.session.data['buildingaddressMPostcode']

    if (!buildingaddressMLine1) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.buildingaddressMLine1 = {
            "anchor": "buildingaddressMLine1",
            "message": "Enter the first line of the address",
        }
    }


    if (!buildingaddressMTown) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.buildingaddressMTown = {
            "anchor": "buildingaddressMTown",
            "message": "Enter a town or city",
        }
    }

    if (!buildingaddressMPostcode) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.buildingaddressMPostcode = {
            "anchor": "buildingaddressMPostcode",
            "message": "Enter a postcode",
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/salesforce/addressmanual', {
            data: req.session.data
        });
    }

    else {
        req.session.data.buildinglocationAddress = buildingaddressMLine1 + ', ' + buildingaddressMLine2 + ', ' + buildingaddressMTown + ', ' + buildingaddressMCounty + ', ' + buildingaddressMPostcode
        res.redirect('/' + version + '/salesforce/addressconfirm');

    }
});

// Buildings & consumers - Address customers
router.get('/' + version + '/salesforce/addresscustomers', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/salesforce/addresscustomers', {
        data: req.session.data
    });
});


router.post('/' + version + '/salesforce/addresscustomers', function (req, res) {
    clearvalidation(req);
    var addresscustomers = req.session.data['buildingaddressCustomers']
    var totalcustomers = req.session.data['customerstotal']

    if (!addresscustomers) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.buildingaddressCustomers = {
            "anchor": "buildingaddressCustomers",
            "message": "Enter the number of final customers",
        }
    }

    if (addresscustomers > totalcustomers) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.buildingaddressCustomers = {
            "anchor": "buildingaddressCustomers",
            "message": "Number of customers in this building cannot be more than the number of customers on the whole network",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/salesforce/addresscustomers', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/' + version + '/salesforce/communalinfo');

    }
});


// Buildings & consumers - cya
router.get('/' + version + '/salesforce/cya2', function (req, res) {
    res.render('/' + version + '/salesforce/cya2', {
        data: req.session.data
    });
});

router.post('/' + version + '/salesforce/cya2', function (req, res) {
    res.redirect('/' + version + '/salesforce/tasklist');
});


// Tasklist
router.get('/' + version + '/salesforce/tasklist', function (req, res) {
    res.render('/' + version + '/salesforce/tasklist', {
        data: req.session.data
    });
});

router.post('/' + version + '/salesforce/tasklist', function (req, res) {
    res.redirect('/' + version + '/salesforce/account-information');
});

// Account information
router.get('/' + version + '/salesforce/account-information', function (req, res) {
    res.render('/' + version + '/salesforce/account-information', {
        data: req.session.data
    });
});

router.post('/' + version + '/salesforce/account-information', function (req, res) {
    req.session.destroy();
    res.redirect('/' + version + '/salesforce/building');
});


// Introduction Flow Version 2 //

// Behalf
router.get('/' + version + '/add-heat-network/introduction-2/behalf', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction-2/behalf', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction-2/behalf', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/introduction-2/behalf', {
            data: req.session.data
        });
    }

    else {
            res.redirect('/' + version + '/add-heat-network/introduction-2/declaration');
    }
});


// declaration
router.get('/' + version + '/add-heat-network/introduction-2/declaration', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction-2/declaration', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction-2/declaration', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/introduction-2/declaration', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/' + version + '/add-heat-network/introduction-2/role');

    }

});

// Role
router.get('/' + version + '/add-heat-network/introduction-2/role', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction-2/role', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction-2/role', function (req, res) {
    clearvalidation(req);
    var role = req.session.data['role']

    if (!role) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.role = {
            "anchor": "role",
            "message": "Select an activity"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction-2/role', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/add-heat-network/introduction-2/supply');
    }
});

// Supply
router.get('/' + version + '/add-heat-network/introduction-2/supply', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction-2/supply', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction-2/supply', function (req, res) {
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
    res.render('/' + version + '/add-heat-network/introduction-2/supply', {
        data: req.session.data
    });
}

else {
        res.redirect('/' + version + '/add-heat-network/introduction-2/supply20');
}
});


// Supply 20 years
router.get('/' + version + '/add-heat-network/introduction-2/supply20', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction-2/supply20', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction-2/supply20', function (req, res) {
clearvalidation(req);
var introsupply20 = req.session.data['introsupply20']

if (!introsupply20) {
    req.session.data.validationError = "true"
    req.session.data.validationErrors.introsupply20 = {
        "anchor": "introsupply20",
        "message": "Select an option"
    }
}

if (req.session.data.validationError == "true") {
    res.render('/' + version + '/add-heat-network/introduction-2/supply20', {
        data: req.session.data
    });
}

else {
    if (introsupply20 == "Yes") {
        res.redirect('/' + version + '/add-heat-network/introduction-2/supplywhen');
    }
    else {
        res.redirect('/' + version + '/add-heat-network/introduction-2/supplydecade');
    }
}
});

// Supply when
router.get('/' + version + '/add-heat-network/introduction-2/supplywhen', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction-2/supplywhen', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction-2/supplywhen', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/introduction-2/supplywhen', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/add-heat-network/introduction-2/changes');
    }
});


// Supply decade
router.get('/' + version + '/add-heat-network/introduction-2/supplydecade', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction-2/supplydecade', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction-2/supplydecade', function (req, res) {
    clearvalidation(req);
    var introsupplydecade = req.session.data['introsupplydecade']

    if (!introsupplydecade) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.introsupplydecade = {
            "anchor": "introsupplydecade",
            "message": "Select a decade"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction-2/supplydecade', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/add-heat-network/introduction-2/changes');
    }
});


// How many
router.get('/' + version + '/add-heat-network/introduction-2/howmany', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction-2/howmany', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction-2/howmany', function (req, res) {
    clearvalidation(req);
    var buildings = req.session.data['buildings2']


    if (!buildings) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.buildings = {
            "anchor": "buildings",
            "message": "Enter the number of connected communal networks"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction-2/howmany', {
            data: req.session.data
        });
    }

    else {
        if (buildings > 1) {
            res.redirect('/' + version + '/add-heat-network/introduction-2/communalnetworks');
        }
        else {
            res.redirect('/' + version + '/add-heat-network/introduction/sharedfacilities');
        }
    }

});



// Communal networks
router.get('/' + version + '/add-heat-network/introduction-2/communalnetworks', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction-2/communalnetworks', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction-2/communalnetworks', function (req, res) {
    clearvalidation(req);
    var communalnetworks = req.session.data['communalnetworks']

    if (!communalnetworks) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.communalnetworks = {
            "anchor": "communalnetworks",
            "message": "Enter the number of connected communal networks"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/introduction-2/communalnetworks', {
            data: req.session.data
        });
    }

    else {

            res.redirect('/' + version + '/add-heat-network/introduction-2/sharedfacilities');
    }

});

// Shared facilities
router.get('/' + version + '/add-heat-network/introduction-2/sharedfacilities', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/introduction-2/sharedfacilities', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/introduction-2/sharedfacilities', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/introduction-2/sharedfacilities', {
            data: req.session.data
        });
    }

    else {
        res.redirect('/' + version + '/add-heat-network/introduction/another');
    }

});


//Intro flow 3 - Alternate for UR (THROWAWAY)

// How many
router.get('/' + version + '/add-heat-network/buildingsandconsumers-2/howmany', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/buildingsandconsumers-2/howmany', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers-2/howmany', function (req, res) {
    clearvalidation(req);
    var buildings = req.session.data['buildings']


    if (!buildings) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.buildings = {
            "anchor": "buildings",
            "message": "Enter the number of connected communal networks"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/buildingsandconsumers-2/howmany', {
            data: req.session.data
        });
    }

    else {
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers-2/buildings');
    }

});

// Buildings & consumers - Communal building info
router.get('/' + version + '/add-heat-network/buildingsandconsumers-2/buildings', function (req, res) {
    clearvalidation(req);

    res.render('/' + version + '/add-heat-network/buildingsandconsumers-2/buildings', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers-2/buildings', function (req, res) {
    clearvalidation(req);
    var buildingaddressPostcode = req.session.data['buildingaddressPostcode']
    var buildingaddressNumber = req.session.data['buildingaddressNumber']

    if (!buildingaddressPostcode || !buildingaddressNumber) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.buildings = {
            "anchor": "buildings",
            "message": "Fill in all address information before continuing",
        }
    }


    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/buildingsandconsumers-2/buildings', {
            data: req.session.data
        });
    }
    else {
        res.redirect('/' + version + '/add-heat-network/buildingsandconsumers-2/cya');
    }
});


// Buildings & consumers 2 - Address
router.get('/' + version + '/add-heat-network/buildingsandconsumers-2/address', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/buildingsandconsumers-2/address', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers-2/address', function (req, res) {
    clearvalidation(req);
    var userpostcode = req.session.data['buildingaddressPostcode'].replace(/^(.*)(\d)/, "$1 $2");
    var usernumber = req.session.data['buildingaddressNumber']

    if (!userpostcode) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.buildingaddressPostcode = {
            "anchor": "buildingaddressPostcode",
            "message": "Enter a postcode",
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/buildingsandconsumers-2/address', {
            data: req.session.data
        });
    }

    else {
        const axios = require('axios');
        const https = require('https');

        const httpsAgent = new https.Agent({
            rejectUnauthorized: false
        })

        const apiKey = 'HDNGKBm2TGbHTt2mr4RxS2Ta0l2Gwth6';

            async function find(postcode, number) {
                axios.get('https://api.os.uk/search/places/v1/find?maxresults=1&minmatch=0.4&query=' + number + ',' + postcode + '&dataset=LPI&key=' + apiKey, { httpsAgent })
                    .then(function (response) {
                        var output = JSON.stringify(response.data, null, 2);
                        let parsed = JSON.parse(output).results;
                        let locationaddresses = [];

                        if (parsed != undefined) {
                            for (var i = 0; i < parsed.length; i++) {
                                let obj = parsed[i];
                                locationaddresses.push(obj.LPI.ADDRESS);
                            }

                            req.session.data.buildinglocationAddress = locationaddresses;
                            req.session.data.buildinglocationAddressSelect = [];
                            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers-2/addressconfirm');
                        }
                        else {
                            async function postcode(postcode) {
                                axios.get('https://api.os.uk/search/places/v1/postcode?postcode=' + postcode + '&dataset=LPI&key=' + apiKey, { httpsAgent })
                                    .then(function (response) {
                                        var output = JSON.stringify(response.data, null, 2);
                                        let parsed = JSON.parse(output).results;
                                        let locationaddresses = [];

                                        for (var i = 0; i < parsed.length; i++) {
                                            let obj = parsed[i];
                                            locationaddresses.push(obj.LPI.ADDRESS);
                                        }

                                        req.session.data.buildinglocationAddressSelect = locationaddresses;
                                        res.redirect('/' + version + '/add-heat-network/buildingsandconsumers-2/addressselect');
                                    });

                            }
                            postcode(userpostcode);

                        }
                    });
            }

            find(userpostcode, usernumber)

        }


});


// Buildings & consumers 2 - Address select
router.get('/' + version + '/add-heat-network/buildingsandconsumers-2/addressselect', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/buildingsandconsumers-2/addressselect', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers-2/addressselect', function (req, res) {
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
        res.render('/' + version + '/add-heat-network/buildingsandconsumers-2/addressselect', {
            data: req.session.data
        });
    }

    else {
        req.session.data.buildinglocationAddress = req.session.data['buildingaddressSelect']
        res.redirect('/' + version + '/add-heat-network/buildingsandconsumers-2/addressconfirm');

    }
});

// Buildings & consumers 2 - Address confirm
router.get('/' + version + '/add-heat-network/buildingsandconsumers-2/addressconfirm', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/buildingsandconsumers-2/addressconfirm', {
        data: req.session.data
    });
});


// Buildings & consumers 2 - Address manual
router.get('/' + version + '/add-heat-network/buildingsandconsumers-2/addressmanual', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/buildingsandconsumers-2/addressmanual', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers-2/addressmanual', function (req, res) {
    clearvalidation(req);
    var buildingaddressMLine1 = req.session.data['buildingaddressMLine1']
    var buildingaddressMLine2 = req.session.data['buildingaddressMLine2']
    var buildingaddressMTown = req.session.data['buildingaddressMTown']
    var buildingaddressMCounty = req.session.data['buildingaddressMCounty']

    var buildingaddressMPostcode = req.session.data['buildingaddressMPostcode']

    if (!buildingaddressMLine1) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.buildingaddressMLine1 = {
            "anchor": "buildingaddressMLine1",
            "message": "Enter the first line of the address",
        }
    }


    if (!buildingaddressMTown) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.buildingaddressMTown = {
            "anchor": "buildingaddressMTown",
            "message": "Enter a town or city",
        }
    }

    if (!buildingaddressMPostcode) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.buildingaddressMPostcode = {
            "anchor": "buildingaddressMPostcode",
            "message": "Enter a postcode",
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/buildingsandconsumers-2/addressmanual', {
            data: req.session.data
        });
    }

    else {
        req.session.data.buildinglocationAddress = buildingaddressMLine1 + ', ' + buildingaddressMLine2 + ', ' + buildingaddressMTown + ', ' + buildingaddressMCounty + ', ' + buildingaddressMPostcode
        res.redirect('/' + version + '/add-heat-network/buildingsandconsumers-2/addressconfirm');

    }
});


// Buildings & consumers 2 - Type
router.get('/' + version + '/add-heat-network/buildingsandconsumers-2/type', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/buildingsandconsumers-2/type', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers-2/type', function (req, res) {
    clearvalidation(req);

    var buildingtype = req.session.data['buildingtype']
    req.session.data['buildingtypealt'] = req.session.data['buildingtype']

    if (!buildingtype) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.buildingtype = {
            "anchor": "buildingtype",
            "message": "Select a type of building"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/buildingsandconsumers-2/type', {
            data: req.session.data
        });
    }
    else {
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers-2/class');
    }
});


// Buildings & consumers 2 - Class
router.get('/' + version + '/add-heat-network/buildingsandconsumers-2/class', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/buildingsandconsumers-2/class', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers-2/class', function (req, res) {
    clearvalidation(req);

    var buildingclass = req.session.data['buildingclass']

    if (!buildingclass) {
        req.session.data.validationError = "true"
        req.session.data.validationErrors.buildingclass = {
            "anchor": "buildingclass",
            "message": "Select a class of building"
        }
    }

    if (req.session.data.validationError == "true") {
        res.render('/' + version + '/add-heat-network/buildingsandconsumers-2/class', {
            data: req.session.data
        });
    }
    else {
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers-2/addresscustomers');
    }
});


// Buildings & consumers - Address customers
router.get('/' + version + '/add-heat-network/buildingsandconsumers-2/addresscustomers', function (req, res) {
    clearvalidation(req);
    res.render('/' + version + '/add-heat-network/buildingsandconsumers-2/addresscustomers', {
        data: req.session.data
    });
});


router.post('/' + version + '/add-heat-network/buildingsandconsumers-2/addresscustomers', function (req, res) {
    clearvalidation(req);
    var addresscustomers = req.session.data['buildingaddressCustomers']
    var addresscustomersResidential = req.session.data['buildingaddressCustomersResidential']
    var addresscustomersCommercial = req.session.data['buildingaddressCustomersCommercial']

    var buildingtype = req.session.data['buildingtype']

    if (buildingtype == "Mixed0use") {
        if (!addresscustomersResidential) {
            req.session.data.validationError = "true"
            req.session.data.validationErrors.buildingaddressCustomersResidential = {
                "anchor": "buildingaddressCustomersResidential",
                "message": "Enter the number of residential customers",
            }
        }

        if (!addresscustomersCommercial) {
            req.session.data.validationError = "true"
            req.session.data.validationErrors.buildingaddressCustomersCommercial = {
                "anchor": "buildingaddressCustomersCommercial",
                "message": "Enter the number of Commercial customers",
            }
        }
    
    
        if (req.session.data.validationError == "true") {
            res.render('/' + version + '/add-heat-network/buildingsandconsumers-2/addresscustomers', {
                data: req.session.data
            });
        }
    
        else {
            req.session.data['buildingaddressCustomers'] = Number(addresscustomersResidential) + Number(addresscustomersCommercial)
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers-2/buildings');
    
        }
    }
    else {
        if (!addresscustomers) {
            req.session.data.validationError = "true"
            req.session.data.validationErrors.buildingaddressCustomers = {
                "anchor": "buildingaddressCustomers",
                "message": "Enter the number of final customers",
            }
        }
    
    
        if (req.session.data.validationError == "true") {
            res.render('/' + version + '/add-heat-network/buildingsandconsumers-2/addresscustomers', {
                data: req.session.data
            });
        }
    
        else {
            res.redirect('/' + version + '/add-heat-network/buildingsandconsumers-2/buildings');
    
        }
    
    }


});
