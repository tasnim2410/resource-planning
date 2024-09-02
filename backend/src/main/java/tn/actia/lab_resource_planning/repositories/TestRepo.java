package tn.actia.lab_resource_planning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.actia.lab_resource_planning.entities.*;
import tn.actia.lab_resource_planning.entities.State;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Repository
public interface TestRepo extends JpaRepository<Test,Long> {
    Set<Test> findAllByState(State state);
    List<Test> findTestsByRef(String ref);
    Test findTestByRef(String ref);
    List<Test> findAllByMachine_Name(String machine);
    List<Test> findByProject(Project p);

    Set<Test> findTestsByMachine_NameAndState(String machineName , State state);
    Set<Test> findTestsBySecondMachine_NameAndState(String secondMachineName , State state);

    Set<Test> findTestsBySequenceAndProject(Long legNumber , Project project);

    Set<Test> findTestsByLegAndProject(Long sequenceNumber , Project project);




}
