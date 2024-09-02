import Header from "./Header";

function AddProduct() {


  return (<>
    <Header></Header>
    <form className="add-test">
      <h2>Add Product</h2>
      <label >name:</label>
      <input type="text"  name="product name" required />
      <button type="submit">Add </button>
    </form> <br />
    <form className="add-test">
      <h2>Delete Product</h2>
      <div className="search-bar">
        <input type="search" placeholder="Search..." />
        <button id="search-button">Search</button>
      </div>
   
    <div className="machineInfo">
      <ol>
        <li>name : </li>
      </ol>
    </div>
    <button type="submit">Delete </button>
    </form>
  </>)
}
export default AddProduct