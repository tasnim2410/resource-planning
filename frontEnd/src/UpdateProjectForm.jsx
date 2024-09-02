// ref : text 
//priority
// desc : text 
//state : enum
// legs : add(to another page {leg})
// clinet : choose or add (to another page{})
// projectLead : choose or add(to another page)
//support : choose or add(to another page)

import { useEffect, useRef,useState } from "react";
import {  toast } from 'sonner';
import Header from "./Header"
function UpdateProjectForm() {

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
  async function fillForm(event) {
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
      
    } catch (error) {
     toast.error(error.Header)
    }
    
  }

 

  async function updateProject(event) {
    event.preventDefault();
    const url = 'http://localhost:8089/update-project'; 
    const headers = {
      'Content-Type': 'application/json'
    };
    const body = JSON.stringify(project); // convert the project object to JSON
  
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers,
        body
      });
      const data = await response.json();
      console.log(data);
     toast.success("project updated")
    } catch (error) {
      toast.error("something went wrong" + error)
      console.error(error);
    }
  }

  function onChange(event) {
    setProject({ ...project, [event.target.name]: event.target.value })
  }

  //useEffect(()=>{console.log("component rerendered")})

 



  return (<>
    <Header />
    <div className="container">
      <form onSubmit={updateProject}>
        <h2 className="title">UPDATE PROJECT</h2>
        <input type="hidden" defaultValue={project.id} />
        <div className="row">
          <div className="col-25">
            <label >Reference</label>
          </div>
          <div className="search-bar">
            <input onChange={onChange} type="text" value={project.ref} name="ref" placeholder="Search project..." />
            <button onClick={fillForm} id="search-button">Search</button>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label >Priority</label>
          </div>
          <div className="col-75">
            <input type="number" onChange={onChange}  name="priority" value={project.priority} placeholder="numberfrom 1 to 5" />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label >State</label>
          </div>
          <div className="col-75">
        <select value={project.state} onChange={onChange} name="state">
            <option value="">Select State</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="FINISHED">FINISHED </option>
              <option value="PLANNED">PLANNED </option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label >description</label>
          </div>
          <div className="col-75">
            <textarea onChange={onChange}  name="description" value={project.description} placeholder="Write something.." ></textarea>
          </div>
        </div>
        <br />
        <div className="row">
          <input type="submit" value="Submit" />
        </div>
      </form>
     
    </div>


  </>)

}
export default UpdateProjectForm