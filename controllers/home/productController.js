import Product from "../../models/Product";
import Category from "../../models/Category";
import SubCategory from "../../models/SubCategory";
import CustomErrorHandler from "../../services/customErrorHandler";
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: (req, file, done) => {
        if (file.fieldname == 'thumb') {
            return done(null, 'assets/img/products/thumbs')
        } else if (file.fieldname == 'thumb2') {
            return done(null, 'assets/img/products/thumbs2')
        } else if (file.fieldname == 'images') {
            return done(null, 'assets/img/products/images')
        }
    },
    filename: (req, file, done) => {
        const filename = `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
        return done(null, filename)
    }
})
const baseUrl = 'http://localhost:5001'
const upload = multer({ storage }).fields([{ name: "thumb" }, { name: "thumb2" }, { name: "images" }]);

class ProductController {
    async products(req, res, next) {
        try {
            const products = await Product.find({}).populate('category').populate('subCategory');
            const categories = await Category.find({});
            const subcategory = await SubCategory.find({ category: categories[0] });
            return res.render('products', { categories, products, subcategory });
        } catch (err) {
            return next(err)
        }
    }
    async getCategory(req, res, next) {
        const { category } = req.query;
        if (!category) {
            return next(CustomErrorHandler.error(400, "Please Enter Details"))
        }
        try {
            const subcategories = await SubCategory.find({ category });
            return res.json(subcategories);
        } catch (err) {
            return next(err);
        }
    }
    async addproduct(req, res, next) {
        upload(req, res, async (err) => {
            if (err) {
                return next(err)
            }
            const { name, category, subCategory, price, OriginalPrice, size, description } = req.body
            if (!name || !category || !subCategory || !price || !size || !description || !OriginalPrice) {
                return next(CustomErrorHandler.error(400, "Please fill all details"))
            }
            const { thumb, thumb2, images } = req.files
            const sizeArray = size.split(',')
            // const thumString = 
            const thumbString = `${baseUrl}/${thumb[0].path}`.replace('/assets', '')
            const thumb2String = `${baseUrl}/${thumb2[0].path}`.replace('/assets', '')
            const imagesString = [];
            images.map(item => {
                const url = `${baseUrl}/${item.path}`.replace('/assets', '')
                imagesString.push(url)
            })
            console.log(`thumbString => ${thumbString}`)
            console.log(`thumb2String => ${thumb2String}`)
            console.log(`images => ${imagesString}`)
            try {
                const create = await Product.create({ name, category, subCategory, price, OriginalPrice, size:sizeArray, description, thumb: thumbString, thumb2: thumb2String, images: imagesString });
            } catch (err) {
                return next(err)
            }

            return res.redirect('back')
        })
    }
    async productInfo(req, res, next) {
        const { product } = req.query;
        if (!product) {
            return next(CustomErrorHandler.error(400, "Please fill all details"))
        }
        try {
            const singleProduct = await Product.findById(product).populate('category').populate('subCategory');
            const categories = await Category.find({});
            const subcategories = await SubCategory.find({ category: singleProduct.category });
            return res.render('productInfo', { product: singleProduct, categories, subcategories });
        } catch (err) {
            return next(err);
        }
    }
    async updateProduct(req, res, next) {
        upload(req,res,(async err => {
            const { product } = req.query;
            if (!product) {
                return next(CustomErrorHandler.error(400, "Please fill all details"))
            }
            const { name, category, subCategory, price, OriginalPrice, size, description} = req.body;
            const {thumb, thumb2} = req.files;
            const sizeArray = size.split(',');
            let thumbString;
            const productItem = await Product.findById(product)
            if (thumb) {
                const url = `assets${productItem.thumb.split(baseUrl)[1]}`
                fs.unlink(url,(err,data) => {
                    if (err) {
                        return next(err)
                    }
                })
                thumbString = `${baseUrl}/${thumb[0].path}`.replace('/assets', '')
            }
            try {
                await Product.findByIdAndUpdate(product, { name, category, subCategory, price, OriginalPrice, size:sizeArray, description,thumb:thumbString });
            } catch (err) {
                return next(err);
            }
            return res.redirect('/products');
        }))
    }

    async newProduct (req,res,next) {
        const {product} = req.query;
        try {
            const productDetails=await Product.findById(product);
            productDetails.new = !productDetails.new;
            await productDetails.save();
            return res.redirect('back')
        } catch (err) {
            return next(err)    
        }
    }
    async deleteProduct(req,res,next) {
        const {product} = req.query;
        try {
            await Product.findByIdAndDelete(product);
            return res.redirect('back')
        } catch (err) {
            return next(err)
        }
    }
    async soldout (req,res,next) {
        const {product} = req.query;
        try {
            const productDetails=await Product.findById(product);
            productDetails.soldout = !productDetails.soldout;
            await productDetails.save();
            return res.redirect('back')
        } catch (err) {
            return next(err)
        }
    }
    async populer (req,res,next) {
        const {product} = req.query
        if (!product) {
            return next(CustomErrorHandler.error(400,"Please fill all details"))
        }
        try {
            const toggle = await Product.findById(product)
            toggle.populer = !toggle.populer;
            toggle.save();
            return res.redirect('back')
        } catch (err) {
            return next(err)
        }
    }
}

export default new ProductController();