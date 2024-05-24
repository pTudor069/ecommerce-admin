import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function ProductForm({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    images,
}) {
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [goToProducts, setGoToProducts] = useState(false);
    const router = useRouter();
    async function saveProduct(ev) {
        ev.preventDefault();
        const data = { title, description, price };
        if (_id) {
            //update
            await axios.put('/api/products', { ...data, _id });
        } else {
            //create
            await axios.post('/api/products', data);
        }
        setGoToProducts(true);
    }
    if (goToProducts) {
        router.push('/products');
    }
    async function uploadImages(ev) {
        const files = ev.target?.files;
        if (files?.lenght > 0) {
            const data = new FormData();
            for (const file of files) {
                data.append('file', file)
            }
            const res = await axios.post('/api/upload', data);
            console.log(res.data);
        }
    }
    return (
        <form onSubmit={saveProduct}>
            <label>Product Name</label>
            <input
                type="text"
                placeholder="product name"
                value={title} onChange={ev => setTitle(ev.target.value)} />
            <label>
                Photos
            </label>
            <div className="mb-2">
                <label className="w-24 h-24 cursor-pointer text-sm gap-1 text-gray-500 rounded-lg bg-gray-200 flex flex-col items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                    <div>
                        Upload
                    </div>
                    <input type="file" onChange={uploadImages} className="hidden"></input>
                </label>
                {!images?.lenght && (
                    <div>No photos in this product</div>
                )}
            </div>
            <label>Description</label>
            <textarea
                placeholder="description"
                value={description}
                onChange={ev => setDescription(ev.target.value)}
            />
            <label>Price (in EURO)</label>
            <input
                type="number"
                placeholder="price"
                value={price}
                onChange={ev => setPrice(ev.target.value)}
            />
            <button
                type="submit"
                className="btn-primary">
                Save
            </button>
        </form>
    );
}