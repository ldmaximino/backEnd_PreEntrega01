import { Router } from "express";
import { inputValidator } from "../middlewares/input_validators.js";
import ProductsManager from "../manager/products_manager.js";

const router = Router();
const productsManager = new ProductsManager("./src/data/products.json");

router.get('/', async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productsManager.getProducts();
    if (products.length > 0) {
      if (!limit) {
        return res.status(201).json(products);
      } else {
        const productsLimit = products.slice(0, limit);
        return res.status(201).json(productsLimit);
      }
    } else return res.status(201).json({ msg: "There are not products" });
  } catch (error) {
    return res.status(500).json({ status: error.code, msg: error.message });
  }
});

router.get('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productsManager.getProductById(pid);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ status: error.code, msg: error.message });
  }
});

router.post('/', inputValidator , async (req, res) => {
  try {
    const product = await productsManager.createProduct(req.body);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ status: error.code, msg: error.message });
  }
});

router.put('/:pid', inputValidator, async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productsManager.updateProduct(req.body,pid);
        return res.status(201).json(product);
    } catch (error) {
        return res.status(500).json({ status: error.code, msg: error.message });
    }
})

router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productsManager.deleteProduct(pid);
        return res.status(201).json(product);
    } catch (error) {
        return res.status(500).json({ status: error.code, msg: error.message });
    }
})

export default router;
