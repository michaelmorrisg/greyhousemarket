module.exports = {
    addUser: (req,res)=>{
        const db = req.app.get('db')
        db.check_user({email: req.body.email})
            .then(response=>{
                console.log(response)
                if(response[0]){
                    res.status(200).send('User already exists')
                }else{
                var bcrypt = require('bcryptjs');
        
                var salt = bcrypt.genSaltSync(10)
                var hash = bcrypt.hashSync(req.body.password, salt)
        
                db.add_user({firstName: req.body.firstName, lastName: req.body.lastName,password: hash,email: req.body.email})
                .then(response =>{
                    req.session.userid = response[0].id
                    res.status(200).send({sessionId:req.session.userid,response:response})
                })
            }})

    },
    addGuest: (req,res)=>{
        const db = req.app.get('db')

        db.add_user({firstName: "Guest", lastName: "Guest", password: "Guest", email: "Guest"})
        .then(response=>{
            req.session.userid = response[0].id
            console.log(req.session.userid,response)
            res.status(200).send(response)
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
                    res.status(200).send('Wrong username or password')
                }
            })
        }
            else{
                res.status(200).send('Wrong username or password')
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

        db.add_product({productId: req.body.productId, userId: req.session.userid, quantity: req.body.quantity,color: req.body.color})
        .then(response=>{
            res.status(200).send(response)
        })} else {
            res.status(200).send("Gotta log in!")
        }
    },
    getCart: (req,res)=>{
        const db = req.app.get('db')

        db.get_cart({id:req.session.userid})
        .then(response=>{
            res.status(200).send(response)
        })
    },
    deleteProduct: (req,res)=>{
        const db = req.app.get('db')

        db.delete_from_cart({id:req.params.id,userId:req.session.userid,color:req.params.color})
        .then(response=>{
            res.status(200).send(response)
        })
    },
    refreshUser: (req,res)=>{
        const db = req.app.get('db')
        console.log(req.session.userid)
        if(req.session.userid){

        db.refresh_user({id:req.session.userid})
        .then(response=>{
            res.status(200).send(response)
        })
    } else{
        res.sendStatus(200)
    }
    },
    totalCart: (req,res)=>{
        const db = req.app.get('db')

        db.total_cart({id:req.session.userid})
            .then(response =>{
                console.log(response)
                res.status(200).send(response)
            })
    },
    updateQuantity: (req,res)=>{
        const db = req.app.get('db')

        db.update_quantity({productId:req.params.id,quantity:req.params.quantity,userId:req.session.userid,color:req.params.color})
            .then(response=>{
                res.status(200).send(response)
            })
    },
    clearCart: (req,res)=>{
        const db = req.app.get('db')

        db.clear_cart({id:req.session.userid})
        .then(response=>{
            res.status(200).send(response)
        })
    },
    sendTanninEmail: (req,res)=>{
        require('dotenv').config()
        const nodemailer = require('nodemailer')
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        })
        
        var mailOptions = {
            from: 'michaelmorrisg@gmail.com',
            to: 'michaelmorrisg@gmail.com',
            subject: 'New Order, Tannin!',
            text: `New order from ${req.body.firstName} ${req.body.lastName}
            Shipping Details:
            Email Address: ${req.body.email}
            Full Name: ${req.body.firstName} ${req.body.lastName}
            Address: ${req.body.address1}
            ${req.body.address2}
            Zip: ${req.body.zip}
            City: ${req.body.city}
            State: ${req.body.state}
            
            Products:
            ${req.body.products.map(element=>{
                return (
                    `Product: ${element.product_name}
                    ID: ${element.product_id}
                    Quantity: ${element.quantity}
                    Color: ${element.color}`
                )
            })}`
        }
        transporter.sendMail(mailOptions, function(error, info){
            if (error){
                console.log(error)
            } else {
                console.log('Email sent: ' + info.response)
            }
        })
    },
    addPurchase: (req,res)=>{
        const db = req.app.get('db')

        db.add_purchase({amount:req.body.amount,date:req.body.date})
        .then(response=>{
            res.status(200).send(response)
        })
    },
    addPurchaseCart: (req,res)=>{
        const db = req.app.get('db')
        console.log(req.body.cart)
        req.body.cart.map(element=>{
            db.add_purchase_cart({userId:element.user_id,productId:element.products_id,quantity:element.quantity,purchaseId:req.body.purchaseId,color:element.color})
    //         .then(response=>{
    //             res.status(200).send(response)
    // })
        })

    },
    getOrders: (req,res)=>{
        const db = req.app.get('db')

        db.get_orders({id:req.session.userid})
        .then(response=>{
            res.status(200).send(response)
        })
    },
    sendContactEmail: (req,res)=>{
        require('dotenv').config()
        const nodemailer = require('nodemailer')
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        })
        
        var mailOptions = {
            from: 'michaelmorrisg@gmail.com',
            to: 'michaelmorrisg@gmail.com',
            subject: 'Someone Has a question',
            text: `Sender: ${req.body.email}
            Message: ${req.body.message}`
        }

        transporter.sendMail(mailOptions, function(error, info){
            if (error){
                console.log(error)
            } else {
                console.log('Email sent: ' + info.response)
            }
        }) 
    },
    addToDb: (req,res)=>{
        const db = req.app.get('db')

        db.add_to_db({name:req.body.name,price:req.body.price,image:req.body.image,description:req.body.description,colors:req.body.colors})
        .then(response=>{
            res.status(200).send(response)
        })
    },
    addCategory: (req,res)=>{
        const db = req.app.get('db')
        if(req.body.category === 'Seasonal'){
            let myCategory = 1
            db.add_category({productId: req.body.productId, category:myCategory})
            .then(response=>{
                res.status(200).send('Woo!')
            })
        } else if(req.body.category === 'Nails'){
            let myCategory = 2
            db.add_category({productId: req.body.productId, category:myCategory})
            .then(response=>{
                res.status(200).send('Woo!')
            })
        } else if(req.body.category === 'Kids') {
            let myCategory = 3
            db.add_category({productId: req.body.productId, category:myCategory})
            .then(response=>{
                res.status(200).send('Woo!')
            })
        } else if (req.body.category === 'car') {
            let myCategory = 4
            db.add_category({productId: req.body.productId, category:myCategory})
            .then(response=>{
                res.status(200).send('Woo!')
            })
        } else if (req.body.category === 'walls') {
            let myCategory = 5
            db.add_category({productId: req.body.productId, category:myCategory})
            .then(response=>{
                res.status(200).send('Woo!')
            })
        }

    },
    getAdminOrders: (req,res)=>{
        const db = req.app.get('db')

        db.get_admin_orders()
            .then(response=>{
                res.status(200).send(response)
            })
    },
    fulfillOrder: (req,res)=>{
        const db = req.app.get('db')

        db.fulfill_order({purchaseId:req.params.id})
            .then(response=>{
                res.status(200).send(response)
            })
    },
    getReviews: (req,res)=>{
        const db = req.app.get('db')

        db.get_reviews({productId:req.params.id})
            .then(response=>{
                res.status(200).send(response)
            })
    },
    averageReviews: (req,res)=>{
        const db = req.app.get('db')

        db.get_average_reviews({productId: req.params.id})
            .then(response=>{
                res.status(200).send(response)
            })
    }
}