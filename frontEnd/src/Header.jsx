import React, {  useRef } from "react";
import { Link } from "react-router-dom";

function Header() {

  var sideBarRef = useRef(null);
  var projectOptRef = useRef(null);
  var testOptRef = useRef(null);
 // var machineOptRef = useRef(null);
//  var productOptRef = useRef(null);


  function toggleSidebar() {
    if (sideBarRef.current.style.display === "block") {
      sideBarRef.current.style.display = "none";
      console.log("hide sidebar ")
    }
    else {
      sideBarRef.current.style.display = "block";
      console.log("show sidebar")
    }

  }
  function toggleprojectOptions(){
    if (projectOptRef.current.style.display === "block") {
      projectOptRef.current.style.display = "none";
      
    }
    else {
      projectOptRef.current.style.display = "block";
     
    }

  }
  function toggletestOptions(){
    if (testOptRef.current.style.display === "block") {
      testOptRef.current.style.display = "none";
      
    }
    else {
      testOptRef.current.style.display = "block";
     
    }

  }
 /* function togglemachineOptions(){
    if (machineOptRef.current.style.display === "block") {
      machineOptRef.current.style.display = "none";
      
    }
    else {
      machineOptRef.current.style.display = "block";
     
    }

  }*/

 /* function toggleproductOptions(){
    if (productOptRef .current.style.display === "block") {
      productOptRef .current.style.display = "none";
      
    }
    else {
      productOptRef .current.style.display = "block";
     
    }
  }*/


  return (<>

      <div className="header-container">
        <button onClick={toggleSidebar} className="side-bar-button">
          &#9776;
        </button>
        <Link to="https://lab-engineering.actia.tn/en/actia-engineering-services-en/">
        <img className="logo-image" src="./src/assets/actia-logo.png" alt="actia logo" />
        </Link>
        
        
      </div>
    

    <div ref={sideBarRef} className="sidebar" >
      <Link to="/">Home</Link>
      <Link onClick={toggleprojectOptions}>Projects</Link>
      <div ref={projectOptRef} className="options">
      <Link to="/projects">Add</Link>
      <Link to="/updateProject">Update</Link>
      <Link to="/deleteProject">Delete</Link>
      
      </div>
      <Link onClick={toggletestOptions} >tests</Link>
      <div ref={testOptRef} className="options">
      <Link to="/addTest">Add</Link>
      <Link to="/updateTest">Update</Link>
      <Link to="/deleteTest">Delete</Link>
      </div>
 

    </div>
  </>
  )


}
export default Header;

/*   
<Link to="/addLeg"> Leg</Link>
  <Link onClick={togglemachineOptions} >machine</Link>
      <div ref={machineOptRef} className="options">
      <Link to="/addMachine">Add</Link>
      <Link to="/updateMachine">Update/Delete</Link>
      </div>
      <Link onClick={toggleproductOptions} >Product</Link>
      <div ref={productOptRef} className="options">
      <Link to="/addProduct">Add/Delete</Link>
      </div>
      <Link to="/client">Client</Link>
      <Link to="/addTech">Technicians</Link>*/ 