const router = require("express").Router();
const { Category, Product } = require("../../Develop/models");

// The `/api/categories` endpoint

// GET request without id: retrieves all exisiting category
// Also retrieves all associated products
router.get("/", async (req, res) => {
  await Category.findAll({
    attributes: ["id", "category_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  }).then((categories) => {
    res.json(categories);
  });
});

router.get("/:id", async (req, res) => {
  await Category.findByPk(req.params.id, {
    attributes: ["id", "category_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((category) => {
      res.json(category);
    })
    .catch((err) => {
      res.json(err);
    });
});

// POST request: creates a new Category with the  request body data
router.post('/', async (req, res) => {
  await Category.create(req.body)
		.then((newCategory) => res.status(200).json(newCategory))
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
});

// PUT request with an id: updates this category with the request body data
router.put('/:id', async (req, res) => {
  await Category.update(req.body, {
		where: {
			id: req.params.id,
		},
	})
  .then(cat => Category.findByPk(req.params.id))
  .then((updatedCategory) => res.status(200).json(updatedCategory))
  .catch((err) => {res.json(err);});
});


router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
