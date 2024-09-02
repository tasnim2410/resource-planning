package tn.actia.lab_resource_planning.services;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tn.actia.lab_resource_planning.entities.*;
//import tn.actia.lab_resource_planning.entities.Project;
import tn.actia.lab_resource_planning.repositories.*;

import java.lang.reflect.Array;
import java.time.LocalDate;
import java.time.Period;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j


public class TestServiceImpl implements ITestService{
    TestRepo testRepo;
    ProjectRepo projectRepo;


    //this works fine please  never touch the code again
    @Override
    public List<String> checkForConflict(Long id) {

            Test test = testRepo.findById(id).orElse(null);
            String machineName = test.getMachine().getName();

            List<Test> conflictingTests = new ArrayList<>();


            // Get all tests from the repository
            List<Test> allTests = testRepo.findAll();

            for (Test t : allTests) {
                // Check for conflicts only with tests that are not the same test
                if (!t.equals(test)) {
                    // Check for conflicts on the primary machine
                    boolean isConflictingOnPrimary = t.getMachine().getName().equals(machineName) &&
                            !(t.getEndDate().isBefore(test.getStartDate()) || t.getStartDate().isAfter(test.getEndDate()));

                    if(t.getSecondMachine() != null){
                        String secondMachine = t.getSecondMachine().getName();
                        boolean isConflictingOnSecond = secondMachine != null &&
                                machineName.equals(secondMachine) &&
                                !(t.getEndDate().isBefore(test.getStartDate()) || t.getStartDate().isAfter(test.getEndDate()));
                        if (isConflictingOnSecond ) {
                            conflictingTests.add(t);
                        }
                    }

                    if(test.getSecondMachine() !=null){
                        String secondMachine = test.getSecondMachine().getName();

                    // Check for conflicts on the secondary machine if it exists
                    boolean isConflictingOnSecondary = secondMachine != null &&
                            t.getMachine().getName().equals(secondMachine) &&
                            !(t.getEndDate().isBefore(test.getStartDate()) || t.getStartDate().isAfter(test.getEndDate()));


                    // If there is a conflict on either machine, add to conflictingTests
                    if (isConflictingOnSecondary) {
                        conflictingTests.add(t);
                    }
                    }
                     if ( isConflictingOnPrimary ) {
                         conflictingTests.add(t);
                     }


                }
            }

            // Collect references of conflicting tests
            List<String> conflictingRefs = new ArrayList<>();
            for (Test t : conflictingTests) {
                conflictingRefs.add(t.getRef());
            }

            return conflictingRefs;
        }

//        Test test = testRepo.findTestByRef(ref);
//        String machineName = test.getMachine();
//        List<Test> conflictingTests = new ArrayList<>();
//
//        for (Test t : testRepo.findAll()) {
//            if ((((t.getStartDate().isBefore(test.getStartDate())&&(t.getEndDate().isBefore(test.getStartDate()))||(t.getStartDate().isAfter(t.getEndDate()))) && !t.equals(test)) && t.getMachine().equals(machineName))) {
//                conflictingTests.add(t);
//            }
//        }
//        List<String> conflictingRefs = new ArrayList<>();
//        for(Test t : conflictingTests){
//            conflictingRefs.add(t.getRef());
//        }
//
//        return conflictingRefs;
 //   }
//works

    @Override //this works dont touch it
    public String addTestAndAssingToProject(Test test,String ref) {
     Project project = projectRepo.findProjectByRef(ref);
        String message = "";
        test.setProject(project);
        testRepo.save(test);
        List<String> conflictingTests =  checkForConflict(test.getId());
        if(!(conflictingTests.isEmpty()) || (test.getEndDate().isBefore(test.getStartDate()))){
            if(!conflictingTests.isEmpty()){
            message = "conflict with test(s) : " + conflictingTests;
            log.info("conflict with tests : " + conflictingTests);
            }else if(test.getEndDate().isBefore(test.getStartDate())){
                message = "end date should be after start date";
            }
           deleteTest(test.getId());
        }else if(!(test.getSecondMachine().getName()=="" )&& !(test.getSecondMachine().getType()=="")) {
            Test secondtest = new Test();
            secondtest.setRef(test.getRef()+ " (combinated)");
            secondtest.setDescription(test.getDescription());
            secondtest.setStartDate(test.getStartDate());
            secondtest.setEndDate(test.getEndDate());
            secondtest.setNote(test.getNote());
            secondtest.setProduct(test.getProduct());
            secondtest.setState(test.getState());
            secondtest.setMachine(test.getSecondMachine());
           secondtest.setSecondMachine(test.getMachine());
           secondtest.setSequence(test.getSequence());
           secondtest.setSequantial(test.isSequantial());
           secondtest.setLeg(test.getLeg());
           secondtest.setProject(test.getProject());
            testRepo.save(secondtest);
            //secondtest = new Test(test.getRef(),test.getDescription(),test.getStartDate(),test.getEndDate(),test.getNote(),test.getProduct(),test.getState(),test.getSecondMachine(),test.getMachine(),test.getLeg(),test.getSequence(),test.isSequantial(),test.getProject());
            log.info("test saved");
            message = "test saved!";
        }else{
            message="test saved";
        }

    return message;

    }

    @Override
    public List<Test> getTestsByRef(String ref) {
        List<Test> tests = testRepo.findTestsByRef(ref);
        return tests;
    }



    @Override
    public Test updateTest(Test newT, String ref) {


        return  testRepo.save(newT);
    }

    @Override
    public Test getTestByRef(String ref) {
        Test test = testRepo.findTestByRef(ref);
        return test;
    }

    @Override
    public String manualDelay(Long id, LocalDate startDate, LocalDate endDate) {
        Test test = testRepo.findById(id).orElse(null);
        String message = null ;
        test.setStartDate(startDate);
        test.setEndDate(endDate);
        testRepo.save(test);
        List<String> conflictingTests = checkForConflict(id);
        if(!conflictingTests.isEmpty()){
            message= "test saved /n conflict with test(s) : " + conflictingTests;

        }else {
            message = "test saved ";
        }

        return message;
    }

    @Override
    public Test getTestById(Long id) {
        Test test = testRepo.findById(id).orElse(null);
        return test;
    }

//    @Override
//    public void addTest(Test test) {
//        testRepo.save(test); // save the test object to the database first
//  //      if (!checkForConflict(test).isEmpty()) {
//    //        log.info("machine occupied on this date");
//      //      testRepo.delete(test); // delete the saved test if there is a conflict
//        //}
//
//    }

    @Override  //i think it works you should test it on more organised samples , dont touch it anyway // edit : i more than just touched it
    public String delaytest(LocalDate startDate, LocalDate endDate, Long id) {
        Test test = testRepo.findById(id).orElse(null);
        LocalDate oldStart = test.getStartDate();
        LocalDate oldEnd = test.getEndDate();
       // Long oldDuration = ChronoUnit.DAYS.between(oldStart,oldEnd);
       // Long newDuration = ChronoUnit.DAYS.between(startDate,endDate);

        List<Test> alreadyDelayed =  new ArrayList<>();

        // Calculate the delays
        long startDelay = ChronoUnit.DAYS.between(oldStart, startDate);
        long endDelay = ChronoUnit.DAYS.between(oldEnd, endDate);
        Long totalDelay = startDelay + endDelay;

        // Update the test with new dates
        test.setStartDate(startDate);
        test.setEndDate(endDate);
        testRepo.save(test); // Save the updated test first
        String message = "test saved";

        log.info("test saved");


            // Delay tests on the same machine
            Set<Test> firstDelayedTests = delayTestsOnSameMachine(test, totalDelay,oldEnd,alreadyDelayed);
            message += " / delayed on first machine/ ";
            log.info("delayed on first machine");

           for(Test t : firstDelayedTests){
           //  delayLoop(firstDelayedTests,test,totalDelay,firstDelayedTests,oldEnd,alreadyDelayed);
               delayTestsOnSameMachine2(t ,test, totalDelay,oldEnd,alreadyDelayed);
               if(t.getSecondMachine() != null){
                  delayTestsOnSameSecondMachine2(t,test, totalDelay,oldEnd,firstDelayedTests,alreadyDelayed);
                   message += " /tests of test delayed on same second machine 2/";

               }
               if (t.getLeg() != null && t.getLeg() > 0) {
                  delayTestsInSameLeg2(t, test,totalDelay,oldEnd,firstDelayedTests,alreadyDelayed);

                   message += " /delayed tests of delayed test on the same leg/";
                   log.info("delayed tests of delayed test on the same leg");
               }
               if (t.isSequantial() && t.getSequence()>0) {
                   delaySequentialTests2(t,test, totalDelay,oldEnd,firstDelayedTests,alreadyDelayed);
                   message = " /delayed tests of delayed test on the same sequence/";
                   log.info("delayed tests of delayed test on same sequence");
               }
           }

            if(test.getSecondMachine() != null){
              List<Test> delayed =    delayTestsOnSameSecondMachine(test, totalDelay,oldEnd,alreadyDelayed);
                //for(Test t: delayed){
                    delayLoop(delayed,test,totalDelay,firstDelayedTests,oldEnd,alreadyDelayed);}
                message = message + " /delayed on second machine/";
                log.info("delayed on second machine");
        //    }

        // Delay tests in the same leg if legNumber is not 0
        if (test.getLeg() != null && test.getLeg() > 0) {
           List<Test> delayed = delayTestsInSameLeg(test, totalDelay,oldEnd,firstDelayedTests,alreadyDelayed);

           //for(Test t: delayed){
             delayLoop(delayed,test,totalDelay,firstDelayedTests,oldEnd,alreadyDelayed);
//               delayTestsOnSameMachine2(t ,test, totalDelay,oldEnd,alreadyDelayed);
//               if(t.getSecondMachine() != null){
//                    delayTestsOnSameSecondMachine2(t,test, totalDelay,oldEnd,firstDelayedTests,alreadyDelayed);
//                   message += " /tests of test delayed on same second machine 2/";
//
//               }
//               if (t.getLeg() != null && t.getLeg() > 0) {
//                   delayTestsInSameLeg2(t, test,totalDelay,oldEnd,firstDelayedTests,alreadyDelayed);
//                   message += " /delayed tests of delayed test on the same leg/";
//                   log.info("delayed tests of delayed test on the same leg");
//               }
//               if (t.isSequantial() && t.getSequence()>0) {
//                   delaySequentialTests2(t,test, totalDelay,oldEnd,firstDelayedTests,alreadyDelayed);
//                   message = " /delayed tests of delayed test on the same sequence/";
//                   log.info("delayed tests of delayed test on same sequence");
//               }
           }

            message = message + " /delayed on same leg s/";
            log.info("delayed on same leg same project");
     //   }

        // Delay sequential tests if the test is sequential
        if (test.isSequantial() && test.getSequence()>0) {
           List<Test> delayed= delaySequentialTests(test, totalDelay,oldEnd,firstDelayedTests,alreadyDelayed);
        //   for(Test t:delayed){
               delayLoop(delayed,test,totalDelay,firstDelayedTests,oldEnd,alreadyDelayed);
//               delayTestsOnSameMachine2(t ,test, totalDelay,oldEnd,alreadyDelayed);
//               if(t.getSecondMachine() != null){
//                   delayTestsOnSameSecondMachine2(t,test, totalDelay,oldEnd,firstDelayedTests,alreadyDelayed);
//                   message += " /tests of test delayed on same second machine 2/";
//
//               }
//               if (t.getLeg() != null && t.getLeg() > 0) {
//                   delayTestsInSameLeg2(t, test,totalDelay,oldEnd,firstDelayedTests,alreadyDelayed);
//                   if(t.getSecondMachine() != null){
//                       delayTestsOnSameSecondMachine2(t,test, totalDelay,oldEnd,firstDelayedTests,alreadyDelayed);
//                       message += " /tests of test delayed on same second machine 2/";
//
//                   }
//                   message += " /delayed tests of delayed test on the same leg/";
//                   log.info("delayed tests of delayed test on the same leg");
//               }
//               if (t.isSequantial() && t.getSequence()>0) {
//                   delaySequentialTests2(t,test, totalDelay,oldEnd,firstDelayedTests,alreadyDelayed);
//                   message = " /delayed tests of delayed test on the same sequence/";
//                   log.info("delayed tests of delayed test on same sequence");
//               }

           }
            message = message + " /delayed on same sequence/";
            log.info("delayed on same sequence");
     //   }

        List<String> conflictingTests =  checkForConflict(id);
        if(conflictingTests.isEmpty()){
            message = message + " /success";
        }else{
            message = " remaining conflicts :  there is a conflict with another test(s)" + conflictingTests;
            log.info("there is a conflict with another test(s)");
            //cancel the updates , set the old dates back
            //test.setStartDate(oldStart);
            //test.setEndDate(oldEnd);
            //testRepo.save(test);

        }
        return message;


    }

        void delayLoop(List<Test> tests , Test test, Long totalDelay,Set<Test> firstDelayedTests , LocalDate oldEnd , List<Test> alreadyDelayed){
        //String message = "";
            for(Test t:tests){
                if(!alreadyDelayed.contains(t)){
                delayTestsOnSameMachine(t , totalDelay,oldEnd,alreadyDelayed);
                if(t.getSecondMachine() != null){
                    delayTestsOnSameSecondMachine(t, totalDelay,oldEnd,alreadyDelayed);
                    //message += " /tests of test delayed on same second machine 2/";

                }
                if (t.getLeg() != null && t.getLeg() > 0) {
                    delayTestsInSameLeg(t, totalDelay,oldEnd,firstDelayedTests,alreadyDelayed);
                    if(t.getSecondMachine() != null){
                        delayTestsOnSameSecondMachine(t, totalDelay,oldEnd,alreadyDelayed);
                      //  message += " /tests of test delayed on same second machine 2/";

                    }
                   // message += " /delayed tests of delayed test on the same leg/";
                    log.info("delayed tests of delayed test on the same leg");
                }
                if (t.isSequantial() && t.getSequence()>0) {
                    delaySequentialTests(t,totalDelay,oldEnd,firstDelayedTests,alreadyDelayed);
                   // message = " /delayed tests of delayed test on the same sequence/";
                    log.info("delayed tests of delayed test on same sequence");
                }
                }
                List<Test> relatedTests = RelatedTests(t,oldEnd,test,alreadyDelayed);
                if(relatedTests.isEmpty()){
                    break;
                   // return message = "done";
                }else{
                    delayLoop(relatedTests,t,totalDelay,firstDelayedTests,oldEnd,alreadyDelayed);
                }

            }


        }
        List<Test> RelatedTests(Test t,LocalDate oldEnd ,Test test,List<Test> alreadyDelayed){
            //find the realted tests of each of the tests in the list
            Set<Test> testsOfSameMachine = testRepo.findTestsByMachine_NameAndState(t.getMachine().getName(),State.PLANNED);
            Set<Test> testsOfSameLeg = testRepo.findTestsByLegAndProject(t.getLeg(),t.getProject());
            Set<Test> testsOfSameSequence = testRepo.findTestsBySequenceAndProject(t.getSequence(),t.getProject());
            Set<Test> testsToDelay = new HashSet<>(testsOfSameMachine);
            testsToDelay.addAll(testsOfSameLeg);
            testsToDelay.addAll(testsOfSameSequence);
            List<Test> relatedTests = new ArrayList<>();
            for (Test ts : testsToDelay) {
                if ((ts.getStartDate().isAfter(t.getEndDate()))&&(ts.getProject().getPriority() <= t.getProject().getPriority())&&(!alreadyDelayed.contains(ts))) {
                    relatedTests.add(ts);
                }
            }

            return relatedTests;
        }
//    String delayLoop(Test test, long totalDelay,LocalDate oldEnd,List<Test> alreadyDelayed ,Set<Test> firstDelayedTests,Test ts){
//            String message = "";
//           List<Test> relatedTests = RelatedTests(test,oldEnd,ts,alreadyDelayed);
//           if(!relatedTests.isEmpty()){
//               delayOneTest (relatedTests , test ,totalDelay,firstDelayedTests,oldEnd,alreadyDelayed);
//               delayLoop(test , totalDelay,oldEnd, alreadyDelayed ,firstDelayedTests,ts);
//               return message="done";
//           }else {
//               for(Test t : relatedTests){
//
//
//
//               }
//           }

//           if( relatedTests.isEmpty()){
//               break;
//               return message = "done";
//           }else {
//               for(Test t : relatedTests){
//                   delayOneTest (relatedTests , t ,totalDelay,firstDelayedTests,oldEnd,alreadyDelayed);
//                 //  delayLoop(t , totalDelay,oldEnd, alreadyDelayed ,firstDelayedTests);
//
//               }
//           }
//
//           return message;
//
//    }




     Set<Test> delayTestsOnSameMachine(Test test, long totalDelay,LocalDate oldEnd,List<Test> alreadyDelayed) {
        String machineName = test.getMachine().getName();
        Set<Test> delayedTests = testRepo.findTestsByMachine_NameAndState(
                machineName, State.PLANNED );
        delayTests(test, totalDelay, delayedTests,oldEnd,alreadyDelayed);
        return delayedTests;
    }
     Set<Test> delayTestsOnSameMachine2(Test test,Test initialTest, long totalDelay,LocalDate oldEnd,List<Test> alreadyDelayed) {
        Set<Test> delayedTests = testRepo.findTestsByMachine_NameAndState(
                test.getMachine().getName(), State.PLANNED );
        delayTests2(test,initialTest, totalDelay, delayedTests,oldEnd,alreadyDelayed);
        return delayedTests;
    }
    List<Test> delayTestsOnSameSecondMachine(Test test, long totalDelay,LocalDate oldEnd,List<Test> alreadyDelayed){
        Set<Test> delayedTests = testRepo.findTestsBySecondMachine_NameAndState(
                test.getSecondMachine().getName(), State.PLANNED );

      List<Test> delayed = delayTests(test, totalDelay, delayedTests,oldEnd,alreadyDelayed);
      return delayed;
    }

    List<Test> delayTestsOnSameSecondMachine2(Test test,Test initalTest, long totalDelay,LocalDate oldEnd,Set<Test> firstDelayedTests,List<Test> alreadyDelayed){
        Set<Test> delayedTests = testRepo.findTestsBySecondMachine_NameAndState(
                test.getSecondMachine().getName(), State.PLANNED );

        List<Test> delayed =delayTests2(test,initalTest, totalDelay, delayedTests,oldEnd, alreadyDelayed);
        return delayed;
    }



     List<Test> delayTestsInSameLeg(Test test, long totalDelay,LocalDate oldEnd,Set<Test> firstDelayedTests,List<Test> alreadyDelayed) {
        Set<Test> legTests = testRepo.findTestsByLegAndProject(test.getLeg(), test.getProject());
         Set<Test> filteredLegTests = legTests.stream()
                 .filter(t -> !firstDelayedTests.contains(t))
                 .collect(Collectors.toSet());
        List<Test> delayed = delayTests(test, totalDelay, filteredLegTests , oldEnd, alreadyDelayed);
        return delayed;
    }
     List<Test> delayTestsInSameLeg2(Test test,Test intialTest, long totalDelay,LocalDate oldEnd,Set<Test> firstDelayedTests,List<Test> alreadyDelayed) {
        Set<Test> legTests = testRepo.findTestsByLegAndProject(test.getLeg(), test.getProject());
         Set<Test> filteredLegTests = legTests.stream()
                 .filter(t -> !firstDelayedTests.contains(t))
                 .collect(Collectors.toSet());
       List<Test> delayed =  delayTests2(test,intialTest, totalDelay, filteredLegTests,oldEnd ,alreadyDelayed);
       return delayed;
    }
     List<Test> delaySequentialTests(Test test, long totalDelay,LocalDate oldEnd,Set<Test> firstDelayedTests,List<Test> alreadyDelayed) {
        Set<Test> sequentialTests = testRepo.findTestsBySequenceAndProject(test.getSequence(), test.getProject());
         Set<Test> filteredSequentialTests = sequentialTests.stream()
                 .filter(t -> !firstDelayedTests.contains(t))
                 .collect(Collectors.toSet());
        List<Test> delayed =delayTests(test, totalDelay, filteredSequentialTests ,oldEnd,alreadyDelayed);
        return delayed;
    }

    List<Test> delaySequentialTests2(Test test,Test initalTest, long totalDelay,LocalDate oldEnd,Set<Test> firstDelayedTests,List<Test> alreadyDelayed) {
        Set<Test> sequentialTests = testRepo.findTestsBySequenceAndProject(test.getSequence(), test.getProject());
         Set<Test> filteredSequentialTests = sequentialTests.stream()
                 .filter(t -> !firstDelayedTests.contains(t))
                 .collect(Collectors.toSet());
        List<Test> delayed =delayTests2(test,initalTest, totalDelay, filteredSequentialTests, oldEnd ,alreadyDelayed);
        return delayed;
    }


       List<Test>  delayTests(Test test, long totalDelay, Set<Test> delayedTests,LocalDate oldEnd ,List<Test> alreadyDelayed) {
        List<Test> testsToDelay = new ArrayList<>();
        for (Test t : delayedTests) {
            if ((t.getStartDate().isAfter(oldEnd))&&(t.getProject().getPriority() <= test.getProject().getPriority())&& (t != test)) {
                testsToDelay.add(t);
            }
        }

        for (Test t : testsToDelay) {
            if(!alreadyDelayed.contains(t)){
            t.setStartDate(t.getStartDate().plusDays(totalDelay));
            t.setEndDate(t.getEndDate().plusDays(totalDelay));
            testRepo.save(t);
            alreadyDelayed.add(t);}
        }
        return  testsToDelay;
    }
      List<Test>  delayTests2(Test test,Test initialTest ,long totalDelay, Set<Test> delayedTests,LocalDate oldEnd,List<Test> alreadyDelayed) {
        List<Test> testsToDelay = new ArrayList<>();
        for (Test t : delayedTests) {
            if ((t.getStartDate().isAfter(oldEnd))&&(t.getProject().getPriority() <= test.getProject().getPriority())&& (t != test)&&(t!=initialTest)) {
                testsToDelay.add(t);
            }
        }

        for (Test t : testsToDelay) {
            if(!alreadyDelayed.contains(t)){
            t.setStartDate(t.getStartDate().plusDays(totalDelay));
            t.setEndDate(t.getEndDate().plusDays(totalDelay));
            testRepo.save(t);
            alreadyDelayed.add(t);}
        }
        return  testsToDelay;
    }

    @Override
    public Test updateTest(Test test) {

       return testRepo.save(test);
//        // Check if the test is being updated to a new machine or time slot
//        Test existingTest = testRepo.findById(test.getId()).orElseThrow();
//        //Machine machine = test.getMachine();
//        if (!existingTest.getMachine().equals(test.getMachine()) || !existingTest.getStartDate().equals(test.getEndDate()) || !existingTest.getStartDate().equals(test.getEndDate())) {
//            // Check if there are any existing tests scheduled on the same machine at the same time
//            List<Test> conflictingTests = testRepo.findAllByMachine_IdAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
//                    test.getMachine().getId(), test.getStartDate(), test.getEndDate()
//            );
//            // Exclude the test being updated from the conflict check
//            conflictingTests.removeIf(t -> t.getId().equals(test.getId()));
//            if (!conflictingTests.isEmpty()) {
//                throw new RuntimeException("Cannot schedule test on machine " + test.getMachine().getName() + " at the same time");
//            }


        // If no conflicts, update the test

    }

    @Override
    public void deleteTest(Long id) {
        Test test = testRepo.findById(id).orElse(null);
        testRepo.delete(test);

    }





//    @Override
//    public Set<Test> retrieveTestByProject(String projectRef) {
//       // Project project = projectRepo.findProjectByProject_ref(projectRef);
//        return testRepo.findByLeg_ProjectRef(projectRef);
//    }

    @Override
    public Set<Test> retrieveTestByState(State state) {
        return testRepo.findAllByState(state);
    }

    @Override
    public List<Test> retrieveTestByMachine(String machineName) {
        return testRepo.findAllByMachine_Name(machineName);
    }



}
