package tn.actia.lab_resource_planning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.actia.lab_resource_planning.entities.Machine;
import tn.actia.lab_resource_planning.entities.Project;

@Repository
public interface MachineRepo extends JpaRepository<Machine, Long> {
}
