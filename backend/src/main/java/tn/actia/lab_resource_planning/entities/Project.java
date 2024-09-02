package tn.actia.lab_resource_planning.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id ;

    @Column(unique = true)
    String ref ;
    Long priority;
    String description;
    String client;
    String projectLead;
    String support;
    @Enumerated(EnumType.STRING)
    State state;

    @OneToMany(mappedBy = "project")
    Set<Test> tests;



}
