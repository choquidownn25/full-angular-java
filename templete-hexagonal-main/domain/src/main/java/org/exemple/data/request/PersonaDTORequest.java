package org.exemple.data.request;

import lombok.*;
import org.exemple.data.PersonaDTO;
import org.springframework.web.multipart.MultipartFile;
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PersonaDTORequest extends PersonaDTO {
    private Boolean success;
    private String errorCode;
    private String errorMessage;


}
