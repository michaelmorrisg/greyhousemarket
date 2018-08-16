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
    getColors: (req,res)=>{
        const db = req.app.get('db')

        db.get_colors({id: req.params.id})
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
            from: 'grayhousemarket@gmail.com',
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
    sendClientEmail: (req,res)=>{
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
            from: 'grayhousemarket@gmail.com',
            to: req.body.email,
            subject: 'Thanks for the order!',
            text: `Hey there ${req.body.firstName},

            Thanks for your recent order! Here's a list of what you got as a reference:
            
            Products:
            ${req.body.products.map(element=>{
                return (
                    `Product: ${element.product_name}
                    Quantity: ${element.quantity}
                    Color: ${element.color}`
                )
            })}
            
            We typically ship within 2 business days, so you should be getting a shipping confirmation email soon!
            
            Thanks again!
            
            Gray House Market`
        }
        transporter.sendMail(mailOptions, function(error, info){
            if (error){
                console.log(error)
            } else {
                console.log('Email sent: ' + info.response)
            }
        })
    },
    shippingConfirmationEmail: (req,res)=>{

        const db = req.app.get('db')
        db.get_product_info_for_confirmation({id:req.params.id})
        .then(res=>{
            console.log(res)
            
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
                from: 'grayhousemarket@gmail.com',
                to: res[0].email,
                subject: 'Your order has shipped!',
                text: `Hey there ${res[0].first_name === "Guest" ? '': res[0].first_name},
    
                Your recent purchase has shipped!
                
                Products:
                ${res.map(element=>{
                    return (
                        `Product: ${element.product_name}
                        Quantity: ${element.quantity}
                        Color: ${element.color}`
                    )
                })}

                Be sure the check your mailbox within the next couple of days :)
                
                Thanks!
                
                Gray House Market`
            }
            transporter.sendMail(mailOptions, function(error, info){
                if (error){
                    console.log(error)
                } else {
                    console.log('Email sent: ' + info.response)
                }
            })
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
        console.log(req.body)

        db.add_to_db({product_name:req.body.name,price:Number(req.body.price),image:req.body.image,description:req.body.description,measurement:req.body.measurement})
        .then(response=>{
            
            console.log(response,"the response")
            req.body.colors.map(element =>{
                db.add_colors_to_product({colorId: element.color, productId: response[0].products_id,productQuantity: element.quantity})

            })
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
    },
    updateMaxQuantity: (req,res)=>{
        const db = req.app.get('db')

        req.body.cart.map(element =>{
            let remainder = element.product_quantity - element.quantity
            db.update_max_quantity({remainder:remainder,colorId:element.color_id,productsId:element.product_id})
            .then(response=>{
                res.status(200).send(response)
            })
        })
    },
    submitReview: (req,res)=>{
        const db = req.app.get('db')
        let date = Date()

        db.submit_review({productId:req.params.id,message:req.body.message,rating:req.body.rating, userName: req.body.name,date:date})
        .then(response=>{
            res.status(200).send(response)
        })
    },
    updateGuestEmail: (req,res)=>{
        const db = req.app.get('db')
        
        db.update_guest_email({email: req.body.email, id: req.session.userid})
        .then(response => {
            res.status(200).send(response)
        })
    },
    checkUser: (req,res)=>{
        !req.session.userid ? res.status(200).send('not logged in') : res.status(200).send('')
    },
    getFilterProducts: (req,res)=>{
        const db = req.app.get('db')
        // console.log(req.body.search)

        db.get_filter_products({search:req.body.search})
        .then(response=>{
            res.status(200).send(response)
        })
    }
}