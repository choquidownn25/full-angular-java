package org.example.mappers;

import org.example.entity.Persona;
import org.exemple.data.PersonaDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface PersonaMapper {
    PersonaMapper INSTANCE = Mappers.getMapper(PersonaMapper.class);
    PersonaDTO personaDTOToPersona (Persona persona);
    Persona personaToPersonaDTO (PersonaDTO persona);
    //listado
    List<PersonaDTO> personaDTOListToPersonaList(List<Persona> PersonaList);
    List<Persona> personaListToPersonaDTOList(List<PersonaDTO> PersonaDTOList);
}
