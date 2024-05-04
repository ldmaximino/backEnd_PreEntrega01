import { Router } from "express";
import CartsManager from "../manager/carts_manager.js";

const router = Router();
const cartsManager = new CartsManager("./src/data/carts.json");

//este router no lo solicitaba el ejercicio pero lo agregué para mostrar todos los carritos
router.get('/', async (req,res) => {
    try {
        const carts = await cartsManager.getCarts();
        return res.status(201).json(carts);
    } catch (error) {
        return res.status(500).json({ status: error.code, msg: error.message });
    }
})

router.get('/:cid', async (req,res) => {
    try {
        const { cid } = req.params;
        const cart = await cartsManager.getCartById(cid);
        if (!cart) return res.status(404).json({ msg: "Cart not found" });
        return res.status(201).json(cart);
      } catch (error) {
        return res.status(500).json({ status: error.code, msg: error.message });
      }
})

router.post('/', async (req,res) => {
    try {
        const cart = await cartsManager.createCart(req.body);
        return res.status(201).json(cart);
      } catch (error) {
        return res.status(500).json({ status: error.code, msg: error.message });
      }
})

router.post('/:cid/product/:pid', async (req,res) => {
    try {
        const addProductCart = await cartsManager.addToCart(req.params);
        return res.status(201).json(addProductCart);
      } catch (error) {
        return res.status(500).json({ status: error.code, msg: error.message });
      }
})

export default router;
