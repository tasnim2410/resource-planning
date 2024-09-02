//import { Link, useParams } from "react-router-dom";
import Header from "./Header";
import React, { useState } from "react";
import { toastSuccess } from "./api/toastService.jsx";
//import axios from "axios";
import {  toast } from 'sonner';
//import { addProject, updateProject, deleteProject } from "./api/ProjectService.jsx";
//import { useRef } from "react"
function AddProjectForm() {
  const [project, setProject] = useState({
    ref: "",
    priority: 0,
    description: "",
    client: "",
    projectLead: "",
    support: "",
    state: ""

  })

  async function saveProject(event) {
    event.preventDefault();
    const url = 'http://localhost:8089/add-project'; 
    const headers = {
      'Content-Type': 'application/json'
    };
    const body = JSON.stringify(project); // convert the project object to JSON
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body
      });
      const data = await response.json();
      console.log(data);
      console.log("project saved")
     toast.success( "project saved")
    } catch (error) {
      console.log(error)
     toast.error("somethig went wrong "+error.Header)
    }
  }
  



  /*async function saveProject(event) {
    try {
      event.preventDefault();
      console.log('Project object:', project);
      const result = await axios.post("http://localhost:8089/add-project",project)
      console.log(result);
      toastSuccess("project saved");

    } catch (error) { error.message }
  };*/
  function onChange(event) {
    setProject({ ...project, [event.target.name]: event.target.value })
  }



  return (<>
    <Header></Header>
    <form onSubmit={saveProject} className="project-form">
      <h2 className="title">ADD PROJECT</h2>
      <input type="hidden" defaultValue={project.id} />
      <label >Reference:</label>
      <input type="text" name="ref" value={project.ref} onChange={onChange} required />

      <label >Priority:</label>
      <input type="number" value={project.priority} name="priority" onChange={onChange} required />

      <label >Description:</label>
      <input type="text" name="description" value={project.description} onChange={onChange} ></input>

      <label >State:</label>
      <select value={project.state} name="state" onChange={onChange} required>
        <option value="">Select state</option>
        <option value="IN_PROGRESS">IN_PROGRESS</option>
        <option value="FINISHED">FINISHED </option>
        <option value="PLANNED">PLANNED </option>
      </select>

      <label >Client:</label>
      <input type="text" value={project.client} name="client" onChange={onChange} required />

      <label >Project Lead:</label>
      <input type="text" value={project.projectLead} name="projectLead" onChange={onChange} required />

      <label >Support:</label>
      <input type="text" value={project.support} name="support" onChange={onChange} required />

      <button type="submit" className="submit-button">submit</button>
    </form>



  </>)

}
export default AddProjectForm