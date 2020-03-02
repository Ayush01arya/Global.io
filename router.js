module.exports=function(app) {
    const express = require('express');
    const router = express.Router();
    const {check, validationResult} = require('express-validator');
    const {matchedData} = require('express-validator/filter');

    router.get('/', (req, res) => {
        res.render('index', {
            data: {},
            errors: {}
        })
    });

    router.post('/enter', [
        check('username')
            .isLength({min: 1})
            .withMessage('Username is required').custom(val=>{
            for(var key in app.locals.list){
                if(app.locals.list[key].name==val)
                {
                    return false;
                }

            }
            return true;
        }).withMessage('username already taken').trim(),
        check('room')//implement personalized check
    ], (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('index', {
                data: req.body,
                errors: errors.mapped()
            })
        }
        else {
            const data = matchedData(req);

            return res.render('chat',{
                user: data.username,
                room:data.room
            })


        }
    });

    return router;

}

