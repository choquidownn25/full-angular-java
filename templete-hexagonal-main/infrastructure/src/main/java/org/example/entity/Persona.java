package org.example.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Entity
@Table(name = "personas")
public class Persona {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    @Column(name = "nombre", nullable = false)
    private String nombre;
    @Column(name = "apellido")
    private String apellido;

    @Column(name = "fechanacimiento")
    private Date fechaNacimiento;
    @Column(name = "foto", nullable = false)
    private String foto;
    @Column(name = "estadocivil", nullable = false)
    private int estadocivil;
    @Column(name = "tienehermanos", nullable = false)
    private boolean tieneHermanos;

}
