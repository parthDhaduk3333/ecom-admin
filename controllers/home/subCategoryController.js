import Category from "../../models/Category";
import SubCategory from "../../models/SubCategory";
import CustomErrorHandler from "../../services/customErrorHandler";

class subCategoryController {
    async subCategory(req, res, next) {
        try {
            const subcategories = await SubCategory.find({}).populate('category');
            const categories = await Category.find({});
            return res.render('subCategory', { subcategories, categories })
        } catch (err) {
            return next(err)
        }
    }
    async addSubCategory(req, res, next) {
        const { category, subcategory } = req.body
        if (!category || !subcategory) {
            return next(CustomErrorHandler.error(400, "Please Enter All Details"))
        }
        try {
            await SubCategory.create({ category, name: subcategory });
        } catch (err) {
            return next(err)
        }
        return res.redirect('back')
    }
    async deletesubcategory(req, res, next) {
        const { subcategory } = req.query;
        if (!subcategory) {
            return next(CustomErrorHandler.error(400, "Please enter subcategory"))
        }
        try {
            await SubCategory.findByIdAndDelete(subcategory)
        } catch (err) {
            return next(err)
        }
        return res.redirect('back')
    }
    
}
export default new subCategoryController();