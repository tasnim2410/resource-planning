import Header from "./Header"
function ClinetPage(){
  return(
    <>
    <Header></Header>
    <form className="add-test">
      <h2>Add Client</h2>
      <label >name:</label>
      <input type="text" id="reference" name="product name" required />
      <button type="submit">Add </button>
    </form> <br />
    </>
  
  )
}
export default ClinetPage;