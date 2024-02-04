package org.exemple.ports.api;

import org.exemple.data.PersonaDTO;
import org.exemple.data.ProductoDto;
import org.exemple.data.response.PersonaDTOResponse;
import org.exemple.data.response.ProductoDtoResponse;

import java.util.List;

public interface PersonaServicePort {
    PersonaDTOResponse addPersona(PersonaDTOResponse persona);
    PersonaDTOResponse updatePersona(PersonaDTOResponse persona);
    void deletePersonaDTO(Integer id);
    List<PersonaDTO> getPersonaDTOs();
    PersonaDTO getPersonaDTOById(Integer id);
}
