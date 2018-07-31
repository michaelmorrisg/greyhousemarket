module.exports = {
    addUser: (req,res)=>{
        const db = req.app.get('db')

        var bcrypt = require('bcryptjs');

        var salt = bcrypt.genSaltSync(10)
        var hash = bcrypt.hashSync(req.body.password, salt)

        db.add_user({firstName: req.body.firstName, lastName: req.body.lastName,password: hash,email: req.body.email})
        .then(response =>{
            req.session.userid = response[0].id
            res.status(200).send({sessionId:req.session.userid,response:response})
        })
    },
    getUser: (req,res)=>{
        const db = req.app.get('db')

        db.get_user({email:req.params.email})
        .then(response =>{

            if(response[0]){
            var bcrypt = require('bcryptjs')
            var salt = bcrypt.genSaltSync(10)
            var hash = bcrypt.hashSync(req.params.password, salt)

            bcrypt.compare(req.params.password, response[0].password).then(hashRes=>{

                if(hashRes===true){
                    if(!req.session.userid){
                    req.session.userid = response[0].id
                    res.status(200).send({sessionId:req.session.userid,response:response})
                    } else {
                        res.status(200).send({sessionId:req.session.userid, response:response})
                    }
               
                } else {
                    res.status(401).send('Wrong username or password')
                }
            })
        }
            else{
                res.status(401).send('Wrong username or password')
    }})
    },
    getProducts: (req,res)=>{
        const db = req.app.get('db')

        db.get_products({category: req.params.category})
        .then(response=>{
            res.status(200).send(response)
        })
    },
    getProduct: (req,res)=>{
        const db = req.app.get('db')

        db.get_product({id: req.params.id})
        .then(response=>{
            res.status(200).send(response)
        })
    },
    addProduct: (req,res)=>{
        if(req.session.userid){
        const db = req.app.get('db')

        db.add_product({productId: req.body.productId, userId: req.session.userid})
        .then(response=>{
            res.status(200).send(response)
        })} else {
            res.status(200).send('Gotta log in!')
        }
    },
    getCart: (req,res)=>{
        const db = req.app.get('db')

        db.get_cart({id:req.session.userid})
        .then(response=>{
            res.status(200).send(response)
        })
    }
}