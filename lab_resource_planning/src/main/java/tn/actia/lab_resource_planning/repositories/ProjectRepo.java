package tn.actia.lab_resource_planning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.actia.lab_resource_planning.entities.Project;
import tn.actia.lab_resource_planning.entities.State;

import java.util.Set;

@Repository
public interface ProjectRepo extends JpaRepository<Project , Long> {
    Set<Project> findAllByState(State state);
    Project findByRef(String ref);
    Project findProjectByRef(String ref);
    //Project findById(Long id );
}
