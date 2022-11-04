const Category = require('../models/Category');
const Bank = require('../models/Bank');
const Item = require('../models/Item');
const Image = require('../models/Image');
const Feature = require('../models/Feature');
const fs = require('fs-extra');
const path = require('path');
const { cache } = require('ejs');
const { create } = require('../models/Category');
const { title } = require('process');
const { about_app } = require('moongose/models');
//note semua module sudah terexport jadi cukup melakukan sekali export saja(?)

module.exports = {
    //Dashboard
    viewDashboard : (req, res)=>{
        res.render('admin/dashboard/view_dashboard',{
            title: "Staycation | Dashboard"
        });
    },
    //Category
    viewCategory : async(req, res)=> {
        try{
            const category = await Category.find();
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status:alertStatus};
            // console.log(category);
         res.render('admin/category/view_category', {
            category, 
            alert,
            title :"Staycation | Category"
        });
        }catch(error){
            res.redirect('/admin/category');            
        }

    },
    addCategory: async (req, res) => {
        try{
            const {name} = req.body;
            // console.log(name);
            await Category.create({ name });
            req.flash('alertMessage', 'Success Add Category');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/category');            
        }catch(error){
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/category');            
        }
    },
    editCategory: async(req, res)=>{
        try{
            const{id, name}= req.body;
            const category = await Category.findOne({_id: id}
                // , function (doc){
                // console.log(doc);
            // }
            );
            // console.log(category);
            category.name = name;
            await category.save();
            req.flash('alertMessage', 'Success Update Category');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/category');

        }catch(error){
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/category');   
        }
    },
    deleteCategory: async(req, res)=>{
        try{
            const{ id }= req.params;
            const category = await Category.findOne({_id: id});
            await category.remove();
            req.flash('alertMessage', 'Success Delete Category');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/category');
        }catch(error){
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/category');   
        }
    },
    //Bank
    viewBank : async(req, res)=>{
        try{
            // const{id, name} = req.body;
            const bank = await Bank.find();
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status:alertStatus};
            // console.log(pathToFile);
            res.render('admin/bank/view_bank', {
                bank,
                alert,
                title :"Staycation | Bank",
            });
        }catch(error){
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/admin/bank');     
        }
    },
    addBank: async (req, res) => {
        try {
            const { name, bankName, bankNumber } = req.body;
            // console.log(req.file);
            await Bank.create({ 
                name, 
                bankName, 
                bankNumber,
                imageUrl: `images/${req.file.filename}`
            });
            req.flash('alertMessage', 'Success Add Bank');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/bank');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/bank');
        }
    }, 
    editBank: async(req, res)=>{
        try{
            const{ id, name, bankName, bankNumber } = req.body;
            const bank = await Bank.findOne({ _id: id }
                // , function(doc){
                    // console.log(doc);
                    // }
                    );
            // let result = await User.findById(req.params.id);
            if(req.file == undefined){
                bank.name = name;
                bank.bankName = bankName;
                bank.bankNumber = bankNumber;
                await bank.save();
                req.flash('alertMessage', 'Success Update Bank');
                req.flash('alertStatus', 'success');
                res.redirect('/admin/bank');
            }else{
                await fs.unlink(path.join(`public/${bank.imageUrl}`));
                bank.name = name;
                bank.bankName = bankName;
                bank.bankNumber = bankNumber;
                bank.imageUrl = `images/${req.file.filename}`;
                await bank.save();
                req.flash('alertMessage', 'Success Update Bank');
                req.flash('alertStatus', 'success');
                res.redirect('/admin/bank');
            }
        }catch(error){
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/bank');   
        }
    },

    deleteBank :async (req, res)=>{
        try{
            const{ id }= req.params;
            const bank = await Bank.findOne({_id: id});
            await fs.unlink(path.join(`public/${bank.imageUrl}`));
            await bank.remove();
            req.flash('alertMessage', 'Success Delete Bank');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/bank');
        }catch(error){
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/bank');   
        }
    },
    viewItem :async (req, res) => {
        try{
            const item = await Item.find()
            .populate({path:'imageId', select:'id imageUrl'})
            .populate({path:'categoryId', select:'id name' });
            // console.log(item);

            const category = await Category.find();
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status:alertStatus};
            res.render('admin/item/view_item', {
                title :"Staycation | Item",
                category,
                item,
                action: 'ViewItem',
                alert
            });
        }catch(error){
            // console.log(error);
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/item/');      
        }
    },
    addItem :async(req,res) => {
        try{
            // ini buat nerima data dari form
            const{categoryId, title, price, city, about} = req.body;
            

            if(req.files.length > 0 ){
                const category = await Category.findOne({ _id: categoryId});
                const newItem = {
                    categoryId : category._id,
                    title,
                    description: about,
                    price,
                    city
                }
                const item = await Item.create(newItem);
                category.itemId.push({ _id: item._id});
                await category.save();
                for(let i = 0; i < req.files.length; i++){
                    const imageSave = await Image.create({imageUrl: `images/${req.files[i].filename}` });
                    item.imageId.push({ _id: imageSave._id });
                    await item.save();
                }
                req.flash('alertMessage', 'Success Add Item');
                req.flash('alertStatus', 'success');
                res.redirect('/admin/item')   
            } 
        }catch(error){
            // console.log(error);
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/item/');      
        }

    },
    showImageItem: async(req, res) => {
        try{
            const{ id } = req.params; 
            const item = await Item.findOne({_id:id})
                .populate({path:'imageId', select:'id imageUrl'});
            // console.log(item.imageId);
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status:alertStatus};
            res.render('admin/item/view_item', {
            title :"Staycation | Show Image Item",
            item,
            alert,
            action:'ShowImage'
        });
    }catch(error){
        console.log(error);
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/admin/item/');      
    }

    },

    showEditItem: async(req, res) => {
        // we gonna calling from form becouse its refresing page
        // if we use DOM object then we need to set on ejs file with DOM jequery
        try{
            const{ id } = req.params;
            const item = await Item.findOne({_id: id})
            .populate({ path:'imageId', select:'id imageUrl'})
            .populate({ path:'categoryId', select:'id name'});
            const category = await Category.find();
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status:alertStatus};
            res.render('admin/item/view_item', {
                title :"Staycation | Edit Item",
                item,
                category,
                alert,
                action:'EditItem'
            });
    }catch(error){
        // console.log(error);
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/admin/item/');      
    }

    },
    editItem: async(req, res)=>{
        try{
            const{id} = req.params;
            const{ categoryId, title, price, city, about } = req.body;
            const item = await Item.findOne({ _id: id})
            .populate({ path:'imageId', select:'id imageUrl'})
            .populate({ path:'categoryId', select:'id name'});

        if(req.files.length > 0){
            for(let i = 0; i < item.imageId.length; i++){
                const imageUpdate = await Image.findOne({_id:item.imageId[i].id});
                await fs.unlink(path.join(`public/${imageUpdate.imageUrl}`));
                // imageUpdate.imageUrl = `images/${req.files[i].filename}`;
                imageUpdate.imageUrl = `images/${req.files[i].filename}`;
                await imageUpdate.save();
            }
            item.title = title;
            item.price = price;
            item.city = city;
            item.description = about;
            item.categoryId = categoryId;
            await item.save();
            // console.log( item.categoryId);
            req.flash('alertMessage', 'Success Update Item');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/item');
        }else{
            item.title = title;
            item.price = price;
            item.city = city;
            item.description = about;
            item.categoryId = categoryId;
            await item.save();
            // console.log( item.categoryId);
            req.flash('alertMessage', 'Success Update Item');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/item');
         }
        }catch(error){
        // console.log(error);
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/admin/item/');
        }

    },

    viewDetailItem : async(req, res)=>{
        const { itemId } = req.params;
        console.log(itemId);
        try{
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status:alertStatus};
            const feature = await Feature.find({ itemId: itemId});

            res.render('admin/item/detail_item/view_detail_item',{
                title: 'Staycation | Detail Item',
                alert,
                itemId,
                feature

            })

        }catch(error){
            // console.log(error);
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect(`/admin/item/show-detail-item/${itemId}`);
        }
    },
    addFeature: async (req, res) => {
        const { name, qty, itemId } = req.body;
        try {
            if(!req.file){
                req.flash('alertMessage', 'Image not found');
                req.flash('alertStatus', 'danger');
                res.redirect(`/admin/item/show-detail-item/${itemId}`);
                
            }
            const feature = await Feature.create({ 
                name, 
                qty,
                itemId,
                imageUrl: `images/${req.file.filename}`
            });

            const item = await Item.findOne({ _id:itemId});
            item.feutureId.push({_id:feature._id});
            await item.save();
            req.flash('alertMessage', 'Success Add Feature');
            req.flash('alertStatus', 'success');
            res.redirect(`/admin/item/show-detail-item/${itemId}`);
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect(`/admin/item/show-detail-item/${itemId}`);
        }
    },
    editFeature: async(req, res)=>{
        const{ id, name, qty, itemId } = req.body;
        try{
            const feature = await Feature.findOne({ _id: id });
            if(req.file == undefined){
                feature.name = name;
                feature.qty = qty;
                await feature.save();
                req.flash('alertMessage', 'Success Update Feature');
                req.flash('alertStatus', 'success');
                res.redirect(`/admin/item/show-detail-item/${itemId}`);
            }else{
                await fs.unlink(path.join(`public/${feature.imageUrl}`));
                feature.name = name;
                feature.qty = qty;
                feature.imageUrl = `images/${req.file.filename}`;
                await feature.save();
                req.flash('alertMessage', 'Success Update Feature');
                req.flash('alertStatus', 'success');
                res.redirect(`/admin/item/show-detail-item/${itemId}`);
            }
        }catch(error){
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect(`/admin/item/show-detail-item/${itemId}`);
        }
    },
    deleteFeature :async (req, res)=>{
        const{ id, itemId}= req.params;
        // const{ itemId } = req.body;
        try{
            const feature = await Feature.findOne({_id: id});
            const item = await Item.findOne({_id: itemId})
            .populate('featureId');
            for(let i = 0; i < item.featureId.length; i++){
                if(item.featureId[i]._id.toString() === feature._id.toString()){
                    item.feature[i].pull({_id:feature._id});
                    await item.save();
                }
            }

            await fs.unlink(path.join(`public/${feature.imageUrl}`));
            await feature.remove();
            req.flash('alertMessage', 'Success Delete Feature');
            req.flash('alertStatus', 'success');
            res.redirect(`/admin/item/show-detail-item/${itemId}`);
        }catch(error){
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect(`/admin/item/show-detail-item/${itemId}`);
        }
    },
    //Booking
    viewBooking :(req, res)=>{
        res.render('admin/booking/view_booking');
    }
}