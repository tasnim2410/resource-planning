package tn.actia.lab_resource_planning.services;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import tn.actia.lab_resource_planning.entities.Project;
import tn.actia.lab_resource_planning.entities.State;
import tn.actia.lab_resource_planning.entities.Test;
import tn.actia.lab_resource_planning.repositories.ProjectRepo;
import tn.actia.lab_resource_planning.repositories.TestRepo;

import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
@Slf4j
public class ProjectServiceImpl implements IProjectService{
    ProjectRepo projectRepo;
    TestRepo testRepo;

    @Override
    public Project addProject(Project project) {
      log.info("adding new project");
        return projectRepo.save(project);
    }

    @Override
    public Project updateProject(Project project) {
        log.info("updating project");
        return projectRepo.save(project);
    }

    @Override
    public Project getProjectByRef(String ref) {
        return projectRepo.findByRef(ref);
    }

    @Override
    public List<Project> retrieveAllProjects() {
        List<Project> projects = projectRepo.findAll(Sort.by("ref").ascending());
        return projects ;
    }

    @Override
    public Set<Project> retrieveProjectByState(State state) {
        Set<Project> projects = projectRepo.findAllByState(state);
        return projects;
    }

//    @Override
//    public Set<Leg> retrieveLegsByProjectRef(String ref) {
//        Project p = projectRepo.findByRef(ref);
//        return p.getLegs();
//    }

    @Override
    public void deleteProject(String ref) {
        try{
            Project p = projectRepo.findByRef(ref);
            List<Test> tests = testRepo.findByProject(p);
            for(Test test : tests){
                testRepo.delete(test);
            }

            projectRepo.delete(p);
        }catch (Error e){e.getMessage();}

    }


}
