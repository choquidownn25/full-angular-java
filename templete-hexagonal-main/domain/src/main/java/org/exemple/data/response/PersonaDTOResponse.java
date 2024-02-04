package org.exemple.data.response;

import lombok.*;
import org.exemple.data.PersonaDTO;
import org.springframework.web.multipart.MultipartFile;
@Data
@AllArgsConstructor
@NoArgsConstructor

@ToString
public class PersonaDTOResponse extends PersonaDTO {
    private Boolean success;
    private String errorCode;
    private String errorMessage;
}
