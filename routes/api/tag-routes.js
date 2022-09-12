const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../Develop/models");

// Endpoint for all the `/api/tags` requests
router.get("/", async (req, res) => {
  // respond with all tags: GET request without id
  // be sure to include its associated Product data
  await Tag.findAll({
    attributes: ["id", "tag_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
        through: "ProductTag",
      },
    ],
  })
    .then((parsedTagData) => {
      res.json(parsedTagData);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.get("/:id", (req, res) => {
  // GET request with an id: respond with all data for given id
  // Include data for associated product(s)
  Tag.findByPk(req.params.id, {
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
        through: "ProductTag",
      },
    ],
  })
    .then((retrievedTag) => {
      res.json(retrievedTag);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/", (req, res) => {
  // create a new tag
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
