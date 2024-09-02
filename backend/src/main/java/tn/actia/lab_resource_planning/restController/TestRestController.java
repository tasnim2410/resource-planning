package tn.actia.lab_resource_planning.restController;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.actia.lab_resource_planning.entities.State;
import tn.actia.lab_resource_planning.entities.Test;
import tn.actia.lab_resource_planning.services.ITestService;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")

public class TestRestController {
    ITestService iTestService;
    //add test form
    //@CrossOrigin(origins = "http://localhost:5173/addTest")
    // @PostMapping(path = "/add-test") //works
    //void addTest(@RequestBody Test test){iTestService.addTest(test);}
    //update test form
   // @CrossOrigin(origins = "http://localhost:5173/updateTest")
    @PutMapping("/update-test") //works
    Test updateTest(@RequestBody Test test){return iTestService.updateTest(test);}
    @DeleteMapping(path = "/delete-test/{id}") //works
    void deleteTest(@PathVariable("id") Long id){iTestService.deleteTest(id);}
    // testList page
   // @GetMapping(path = "/retrieve-test-by-project/{project-ref}") //works
   // Set<Test> retrieveTestByProject(@PathVariable("project-ref") String projectRef){return iTestService.retrieveTestByProject(projectRef);}
    @GetMapping(path = "/retrieve-test-by-state/{state}")//works
    Set<Test> retrieveTestByState(@PathVariable("state") State state){return iTestService.retrieveTestByState(state);}
    @GetMapping(path = "/retrieve-test-by-machine/{machine-name}") // works
    List<Test> retrieveTestByMachine(@PathVariable("machine-name") String machineName){return iTestService.retrieveTestByMachine(machineName);}

    @GetMapping(path = "/check-for-conflict/{ref}")//works
    List<String> checkForConflict(@PathVariable("ref") Long ref){return iTestService.checkForConflict(ref);}
    @PostMapping(path = "/assign-test-to-project/{ref}")
    String assignTestToProject(@PathVariable("ref") String ref,@RequestBody Test test){ return iTestService.addTestAndAssingToProject(test,ref);}

    @PutMapping(path = "/delay-test/{start-date}/{end-date}/{ref}")
    String delaytest(@PathVariable("start-date") LocalDate startDate , @PathVariable("end-date") LocalDate endDate ,@PathVariable("ref") Long id){
        return iTestService.delaytest(startDate,endDate,id);
    }
    @GetMapping(path = "/get-tests-by-ref/{ref}")
    List<Test> getTestsByRef(@PathVariable("ref")String ref){return iTestService.getTestsByRef(ref);}

    @PutMapping(path = "/manual-update/{ref}/{start-date}/{end-date}")
    String manualDelay(@PathVariable("ref") Long id , @PathVariable("start-date") LocalDate startDate , @PathVariable("end-date") LocalDate endDate){
        return iTestService.manualDelay(id,startDate,endDate);
    }

    @GetMapping(path = "/get-test-by-ref/{ref}")
    Test getTestByRef(@PathVariable("ref") String  ref){return  iTestService.getTestByRef(ref);}

    @GetMapping(path = "/get-test-by-id/{id}")
    Test getTestById(@PathVariable("id") Long id){return iTestService.getTestById(id);}
}
