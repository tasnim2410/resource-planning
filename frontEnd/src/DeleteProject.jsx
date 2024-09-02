import Header from "./Header";
import { useEffect, useRef,useState } from "react"
import {toast } from "sonner";

function DeleteProject(){
  var projctInfoRef = useRef(null);

  const [project, setProject] = useState({
    id:0,
    ref: "",
    priority: 0,
    description: "",
    client: "",
    projectLead: "",
    support: "",
    state: ""

  })
  async function displayInfo(event){
    event.preventDefault();
    const url = 'http://localhost:8089/get-project-by-ref/'+project.ref; 
    const headers = {
      'Content-Type': 'application/json'
    };
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers,
      });
      const data = await response.json();
      console.log(data);
      //fill the form
      setProject({
        id:data.id,
        ref: data.ref,
        priority: data.priority,
        description: data.description,
        client: data.client,
        projectLead: data.projectLead,
        support: data.support,
        state: data.state
      });
      projctInfoRef.current.style.display='block';
     
     
    } catch (error) {
      toast.error("somethig went wrong , please try again " )
      console.error(error);
    }

  }


  async function deleteProject(event) {
    event.preventDefault();
    const url = 'http://localhost:8089/delete-project/'+project.ref; 
 
    try {
       await fetch(url, {
        method: 'DELETE',
        
      });
      //const data = await response.json();
     // console.log(data);
     console.log("project deleted")
     toast.success("project deleted")
    } catch (error) {
      toast.error("something went wrog , please try again")
      console.error(error);
    }
    
  }
  function onchange(event){
    setProject({ ...project, [event.target.name] : event.target.value })
  }



  return(<>
  <Header></Header>
  <form onSubmit={deleteProject} className="add-test">
        <h2>Delete Project</h2>
        <label>Reference</label>
        <div className="search-bar">
          <input value={project.ref} name="ref" onChange={onchange} type="search" id="search-input" placeholder="Search..." />
          <button onClick={displayInfo}>Search</button> <br />
        </div>
        <div ref={projctInfoRef} className="project-delete-info">
            <ol > project info: </ol>
            <li>priority : {project.priority}</li>
            <li>description : {project.description}</li>
            <li>client : {project.client}</li>
            <li>projectLead : {project.projectLead}</li>
            <li>support: {project.support}</li>
            <li>state : {project.state}</li>

          </div>
        <button type="submit">Delete </button>
      </form>
      
  </>)



}
export default DeleteProject;