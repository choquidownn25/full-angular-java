package org.exemple.data;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class PersonaDTO {
    private Integer id;
    private String nombre;
    private String apellido;
    private Date fechaNacimiento;
    private String foto;
    private int estadocivil;
    private boolean tieneHermanos;
}
