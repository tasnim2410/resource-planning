package tn.actia.lab_resource_planning.entities;

import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Test {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    //@Column(unique = true)
    String ref;
    String description ;
    LocalDate startDate;

    LocalDate endDate;
    String note;
    String product;
    @Enumerated(EnumType.STRING)
    State state;
    @ManyToOne(cascade = CascadeType.ALL , fetch = FetchType.EAGER)
    private Machine machine; // Changed from String to Machine

    @ManyToOne(cascade = CascadeType.ALL , fetch = FetchType.EAGER)
    private Machine secondMachine;
    Long leg;
    Long sequence;
    boolean sequantial;

    @ManyToOne
    Project project;



}
