package tn.actia.lab_resource_planning.services;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tn.actia.lab_resource_planning.entities.Machine;
import tn.actia.lab_resource_planning.repositories.MachineRepo;

@Service
@AllArgsConstructor
@Slf4j
public class MachineService implements IMachineService{
    MachineRepo machineRepo;
    @Override
    public Machine saveMachine(Machine machine) {
        return machineRepo.save(machine);
    }
}
