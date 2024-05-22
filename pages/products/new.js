import Layout from "@/components/Layout";

export default function NewProduct() {
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [price,setPrice] = useState('');
    return (
        <Layout>
            <h1>New Product</h1>
            <label>Product Name</label>
            <input type="text" placeholder="product name"/>
            <label>Description</label>
            <textarea placeholder="description"></textarea>
            <label>Price (in EURO)</label>
            <input type="number" placeholder="price"></input>
            <button className="btn-primary">Save</button>
        </Layout>
    );
}