import asyncHandler from "../middleware/asyncHandler.js";
import Category from "../models/categoryModel.js";

// @desc    Fetch all categories
// @route   GET /api/categories
// @access  Private/Admin
const getCategories = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};

  const count = await Category.countDocuments({ ...keyword });

  const categories = await Category.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ categories, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Create a Category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const categoryExists = await Category.findOne({ name });

  if (categoryExists) {
    res.status(400);
    throw new Error("Category already exists");
  }

  const category = await Category.create({ name });

  if (category) {
    res.status(201).json(category);
  } else {
    res.status(400);
    throw new Error("Something went wrong");
  }
});

// @desc    Update a Category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await Category.findById(req.params.id);

  if (category) {
    category.name = name;

    const updatedCategory = await category.save();
    res.status(200).json(updatedCategory);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc    Delete a Category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    await category.deleteOne({ _id: category._id });
    res.status(200).json({ message: "Category Deleted" });
  } else {
    req.status(404);
    throw new Error("Resource not found");
  }
});

export { getCategories, createCategory, updateCategory, deleteCategory };
