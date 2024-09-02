package tn.actia.lab_resource_planning.restController;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.actia.lab_resource_planning.entities.Project;
import tn.actia.lab_resource_planning.entities.State;
import tn.actia.lab_resource_planning.services.IProjectService;

import java.util.List;
import java.util.Set;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173" )
public class ProjectRestController {
IProjectService iProjectService;
    // add form

    @PostMapping(path = "/add-project") //works
    Project addProject(@RequestBody Project project){return iProjectService.addProject(project);}
    //update form
   // @CrossOrigin(origins = "http://localhost:5173/updateProject",methods = PUT)
    @PutMapping(path = "/update-project") //works
    Project updateProject(@RequestBody Project project){return iProjectService.updateProject(project);}
    //update project form
    @GetMapping(path = "/get-project-by-ref/{ref}")//works
    Project getProjectByRef(@PathVariable("ref") String ref){return iProjectService.getProjectByRef(ref);}


    // page projectList
    @GetMapping(path = "/retrieve-all-projects") //works
    List<Project> retrieveAllProjects(){return iProjectService.retrieveAllProjects();}
    // page projectList
    @GetMapping(path = "/retrieve-project-by-state/{state}")//works
    Set<Project> retrieveProjectByState(@PathVariable("state") State state){return iProjectService.retrieveProjectByState(state);}
    //page projectList
  //  @GetMapping(path = "/retrieve-legs-by-project-reference/{ref}") //works
    //Set<Leg> retrieveLegsByProjectRef(@PathVariable("ref") String ref){return iProjectService.retrieveLegsByProjectRef(ref);}
   //@CrossOrigin(origins = "http://localhost:5173/updateProject",methods = DELETE)
    @DeleteMapping(path = "/delete-project/{ref}")//works
    void deleteProject(@PathVariable("ref") String ref){
        iProjectService.deleteProject(ref);
    }


}
