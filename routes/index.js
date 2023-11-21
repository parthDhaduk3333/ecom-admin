import express from 'express';
import { categoryController, homeController, loginController, OrderController, productController, subCategoryController, UserController } from '../controllers';
import passport from 'passport';
import auth from '../middleware/auth';
const router = express.Router();

router.get('/login', auth.loginCheck, loginController.login)
router.post('/login', passport.authenticate('local', { failureRedirect: "/login" }), loginController.loginData)
router.use(auth.authCheck)
router.get('/', homeController.home)
// ======== Products ==============
router.get('/products', productController.products)
router.get('/getCategory', productController.getCategory)
router.post('/addproduct', productController.addproduct)
router.get('/productinfo', productController.productInfo)
router.post('/updateproduct', productController.updateProduct)
router.get('/newProduct', productController.newProduct)
router.get('/soldout', productController.soldout)
router.get('/deleteProduct',productController.deleteProduct)
router.get('/populer',productController.populer)
// ======== SubCategory ==============
router.get('/subCategory', subCategoryController.subCategory)
router.post('/addsubcategory', subCategoryController.addSubCategory)
router.get('/deletesubcategory', subCategoryController.deletesubcategory)
// ======== Category ==============
router.get('/category', categoryController.category)
router.post('/addcategory', categoryController.addcategory)
router.get('/deletecategory', categoryController.deletecategory)
// ========= Order ================
router.get('/orders', OrderController.orders)
router.post('/orderstatus', OrderController.orderStatus)
router.get('/orderInfo', OrderController.orderInfo)
// ============ Users ==============
router.get('/users', UserController.users)
router.get('/country',UserController.Country)
router.post('/addCountry',UserController.addCountry)
router.get('/deleteCountry',UserController.deleteCountry)
router.post('/updateCountry',UserController.updateCountry)


export default router;