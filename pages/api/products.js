import { Product } from "@/models/Product";
import mongoose from "mongoose";
import { mongooseConnect } from "@/lib/mongoose";


export default async function handle(req, res) {
    const { method } = req;
    await mongoose.connect();
    if (method === 'POST') {
        const { title, description, price } = req.body;
        const productDoc = await Product.create({
            title, description, price,
        })
        res.json('productDoc');
    }
}