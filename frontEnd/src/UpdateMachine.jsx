import Header from "./Header";

function UpdateMachine() {

  return (<>
    <Header></Header>
    <div className="container">
      <form >
        <h2 className="title">UPDATE MACHINE</h2>
        <div className="row">
          <div className="col-25">
            <label >ID</label>
          </div>
          <div className="search-bar">
            <input type="search"  placeholder="Search..." />
            <button >Search</button>
          </div>
        </div><br />
        <div className="machineInfo">
         <ol>
          <li>name :  </li>
          <li>type : </li>
          <li>number of planned tests : </li>
         </ol>

        </div>

        <div className="row">
          <div className="col-25">
            <label >assign test</label>
          </div>
          <div className="search-bar">
            <input type="search"  placeholder="Search..." /><br />
            <button >Search</button>
          </div>
        </div>
        <br />
        <label >Tests:</label>
        <div className="legs-container">
          <ol >
            <div className="col-50"> 
              <li>test 1</li>
            <button>assign</button>
            </div><br />
           <div className="col-50">
           <li>test 2</li>
           <button>assign</button>
           </div>
        
           
        
          </ol>
        </div>
        <div className="row">
          <input type="submit" value="Submit" />
        </div>
      </form>
      <form className="add-test">
      <h2>Delete Machine</h2>
      <div className="search-bar">
        <input type="search"  placeholder="Search..." />
        <button >Search</button>
      </div>
   
    <div className="machineInfo">
      <ol>
        <li>name :  </li>
      </ol>
    </div>
    <button type="submit">Delete </button>
    </form>

    </div>
  </>)

}
export default UpdateMachine