const express = require('express')
const app = express()
const bodyParser=require("body-parser");
const cors=require("cors");
const mongoose = require('mongoose');
const { type } = require('server/reply');
const { Schema } = mongoose;
require('dotenv').config()
app.use(bodyParser.json());
app.use(cors());

const PORT=process.env.PORT || 3000
const DB=process.env.DB_URL



mongoose.connect(DB)
  .then(() =>app.listen(PORT, () => {
    console.log(`Example app listening on port::http://localhost:${PORT}`)
  }) );



  const productSchema = new Schema({
    img:{type: String,required:true},
    title: {type: String,required:true},
    bio: {type: String,required:true}
   
  });

  const Product = mongoose.model('Product', productSchema);

  app.get("/products",async(req,res)=>{
    try {
        const products=await Product.find({});
        if (products.length>0) {
            res.status(200).send({
                message:"success",
                data:products
            })
        } else {
            res.status(204).send({
                message:"empty data",
                data:null
            })
        }
       
    } catch (error) {
        res.status(500).send({
            message:error.message,
            error:true
        })
    }
  })
  

  app.get("/products/:id",async(req,res)=>{
    const {id}=req.params;
    try {
        const product=await Product.findById(id);
        if (product) {
            res.status(200).send({
                message:"success",
                data:product
            })
        } else {
            res.status(204).send({
                message:"empty data",
                data:null
            })
        }
       
    } catch (error) {
        res.status(500).send({
            message:error.message,
            error:true
        })
    }
  })

  app.delete("/products/:id",async(req,res)=>{
    const {id}=req.params;
    try {
        const deleteProduct=await Product.findByIdAndDelete(id);
        res.status(200).send({
            message:"deleted",
            deleteProduct:deleteProduct
        })
    } catch (error) {
        res.status(500).send({
            message:error.message,
            error:true
        })
    }
  })

  app.post("/products",async(req,res)=>{
    try {
        const newProduct=new Product(req.body);
        await newProduct.save();
        res.status(200).send({
            message:"posted",
            newProduct:newProduct
        })

    } catch (error) {
        res.status(500).send({
            message:error.message,
            error:true
        })
    }
  })
  