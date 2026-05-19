import {useState} from "react"
import axios from "axios"
import {toast} from "react-toastify"
import "./Admin.css"

function Admin() {

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState(null)

  const addProduct = () => {

    if (
      !name ||
      !price ||
      !description ||
      !category ||
      !image
    ) {
      toast.error("Fill all fields")
      return
    }

    const formData = new FormData()

    formData.append("name", name)
    formData.append("price", price)
    formData.append("description", description)
    formData.append("category", category)
    formData.append("image", image)

    axios.post(
      "http://localhost:5000/add-product",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    )
    .then(() => {

      toast.success("Product added")

      setName("")
      setPrice("")
      setDescription("")
      setCategory("")
      setImage(null)

    })
    .catch(() => {
      toast.error("Error adding product")
    })
  }

  return (

    <div className="admin-container">

      <div className="admin-card">

        <h2>Add Product</h2>

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
        >

          <option value="">
            Select Category
          </option>

          <option value="Electronics">
            Electronics
          </option>

          <option value="Fashion">
            Fashion
          </option>

          <option value="Food">
            Food
          </option>

          <option value="Books">
            Books
          </option>

          <option value="Beauty">
            Beauty
          </option>

          <option value="Home">
            Home
          </option>

        </select>

        <input
          type="file"
          accept="image/*"
          onChange={e => setImage(e.target.files[0])}
        />

        <button onClick={addProduct}>
          Add Product
        </button>

      </div>

    </div>

  )
}

export default Admin