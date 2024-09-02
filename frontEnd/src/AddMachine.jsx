import Header from "./Header";


function AddMachine(){


  return(
    <>
        <Header></Header>
  <form className="add-Machine">
  <h2>Add Machine</h2>
  <label >Name</label>
  <input type="text"  name="machine-name" required/>

  <label >Type</label>
  <select id="state" name="state" required>
    <option value="in_progress">equipment_ACTIA_ES</option>
    <option value="finished">equipment_CETIME</option>
    <option value="paused">equipment_CRT</option>
    <option value="paused">equipment_CETIBA</option>
    <option value="paused">equipment_CERT</option>
  </select>

  <button type="submit" className="submit-button">Submit</button>
</form>





    </>
  )

}
export default AddMachine