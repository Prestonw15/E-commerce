const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    attributes: [
      'id',
      'tag_name'
    ],
  // be sure to include its associated Product data
    include: [{
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  ]
  })
  .then(tagData => {
    if (!tagData) {
      res.status(404).json({ message: "No data found" });
      return;
    }
    res.json(tagData);
  })
  .catch(err => {
    res.status(500).json({ message: "There has been an error "})
  });

});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'tag_name'
    ],
  // be sure to include its associated Product data
    include: [{
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  ]
  })
  .then(tagData => {
    if (!tagData) {
      res.status(404).json({ message: "No tag with that id found" });
      return;
    }
    res.json(tagData);
  })
  .catch(err => {
    res.status(500).json({ message: "There has been an error "})
  });
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
