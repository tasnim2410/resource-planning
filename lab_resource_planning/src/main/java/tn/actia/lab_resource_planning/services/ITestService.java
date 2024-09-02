package tn.actia.lab_resource_planning.services;

import tn.actia.lab_resource_planning.entities.State;
import tn.actia.lab_resource_planning.entities.Test;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public interface ITestService {
   // void addTest(Test test);
    String delaytest(LocalDate startDate , LocalDate endDate , Long id);
    Test updateTest(Test test);
    void deleteTest(Long id);
   // Set<Test> retrieveTestByProject(String projectRef);
    Set<Test> retrieveTestByState(State state);
    List<Test> retrieveTestByMachine(String machineName);
    List<String> checkForConflict(Long id);
    String addTestAndAssingToProject(Test test,String ref);
    List<Test> getTestsByRef(String ref);
    Test updateTest(Test test , String ref);

    Test getTestByRef(String ref);

    String manualDelay(Long id , LocalDate startDate,LocalDate endDate);

    Test getTestById(Long id);

}
