package org.exemple.ports.spi;

import org.exemple.data.PersonaDTO;
import java.util.List;

public interface PersonaPersistencePort {
    PersonaDTO addPersona(PersonaDTO persona);
    PersonaDTO updatePersona(PersonaDTO persona);
    void deletePersonaDTO(Integer id);
    List<PersonaDTO> getPersonaDTOs();
    PersonaDTO getPersonaDTOById(Integer id);
}
