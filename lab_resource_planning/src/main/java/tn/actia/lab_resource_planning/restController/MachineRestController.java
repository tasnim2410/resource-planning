package tn.actia.lab_resource_planning.restController;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import tn.actia.lab_resource_planning.entities.Machine;
import tn.actia.lab_resource_planning.services.IMachineService;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class MachineRestController {
    IMachineService iMachineService;
    @PostMapping(path = "/add-machine")
    Machine saveMachine(Machine machine){return iMachineService.saveMachine(machine);}
}
