import Header from "./Header";

function AddLeg(){

  return(<>
  <Header></Header>
  <form className="add-Machine">
  <h2>Add Leg</h2>
  <label >Name</label>
  <input type="text" id="reference" name="machine-name" required/>
  <label >Project Ref</label>
  <input type="text" id="reference" name="machine-name" required/>

   <label >Tests:</label>
  <button type="button" id="add_leg">Add a test</button>
  <div className="legs-container">
    <ol id="legs_list">
      <li>Test 1</li>
      <li>Test 2</li>
    </ol>
  </div>
  <button type="submit" className="submit-button">Add Leg</button>
</form>

<form className="add-test">
      <h2>Delete Leg</h2>
      <div className="search-bar">
        <input type="search"  placeholder="Search..." />
        <button >Search</button>
      </div>
   
    <div className="machineInfo">
      <ol>
        <li>name :  </li>
        <li>project ref : </li>
      </ol>
    </div>
    <button type="submit">Delete </button>
    </form>
  
  
  
  </>)

}
export default AddLeg