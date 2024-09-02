import Header from "./Header";
import {useRef} from "react"
function AddTech(){

  var techInfoRef = useRef(null);

  function toggleTechInfo(){
    techInfoRef.current.style.display = "block";
    
  }


return(<>
<Header></Header>
<div className="container">
      <form className="project-form">
        <h2 className="title">ADD tech</h2>
        <div>
        <label >Name:</label>
        <input type="text"  name="reference" required/>
        <label >job title:</label>
        <input type="text"  name="reference" required/>
        </div><br />
        <div className="row">
          <input type="submit" value="Submit" />
        </div>
      </form>
      <form className="add-test">
      <h2>Delete tech</h2>
      <div className="search-bar">
        <input type="search"  placeholder="Search..." />
        <button onClick={toggleTechInfo}>Search</button>
      </div>
   
    <div ref={techInfoRef } className="tech-info">
      <ol>
        <li>name :  </li>
      </ol>
    </div>
    <button type="submit">Delete </button>
    </form>

    </div>
</>)
}
export default AddTech