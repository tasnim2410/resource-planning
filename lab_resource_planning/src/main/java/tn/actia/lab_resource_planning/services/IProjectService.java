package tn.actia.lab_resource_planning.services;

import tn.actia.lab_resource_planning.entities.Project;
import tn.actia.lab_resource_planning.entities.State;

import java.util.List;
import java.util.Set;

public interface IProjectService {
    Project addProject(Project project);
    Project updateProject(Project project);

    Project getProjectByRef(String ref);
    List<Project> retrieveAllProjects();
    Set<Project> retrieveProjectByState(State state);
   // Set<Leg> retrieveLegsByProjectRef(String ref);
    void deleteProject(String ref);

}
