import express from 'express';
import products_router from './routes/products_router.js';
import carts_router from './routes/carts_router.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req,res) => {
    res.send('PreEntrega 01 - Back End NodeJS + Express - Leandro Daniel Maximino 🔥🔥🔥🔥');
})

app.use('/api/products', products_router);
app.use('/api/carts', carts_router);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT} 🚀🚀🚀🚀`);
});
