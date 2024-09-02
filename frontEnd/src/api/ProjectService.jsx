import axios from "axios";
const  ADD_URL = "http://localhost:8089/add-project";
//project
//add project
export async function addProject(project) {
  return await axios.post(ADD_URL,project);
}

//update project
export async function updateProject(project) {
  return await axios.put(API_URL+"/update-project",project)
  
}

//delete project 
export async function deleteProject(id) {
  return await axios.delete(API_URL+"/delete-project/"+ id);
  
}
