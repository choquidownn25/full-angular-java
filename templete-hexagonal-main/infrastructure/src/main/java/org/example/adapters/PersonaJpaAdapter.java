package org.example.adapters;

import org.example.entity.Persona;
import org.example.mappers.PersonaMapper;
import org.example.repository.PersonaRepository;
import org.exemple.data.PersonaDTO;
import org.exemple.ports.spi.PersonaPersistencePort;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PersonaJpaAdapter implements PersonaPersistencePort {
    @Autowired
    private PersonaRepository personaRepository;

    @Override
    public PersonaDTO addPersona(PersonaDTO persona) {
        Persona personas = PersonaMapper.INSTANCE.personaToPersonaDTO(persona);
        PersonaDTO responPersona=PersonaMapper.INSTANCE.personaDTOToPersona(personaRepository.save(personas));
        return responPersona;
    }

    @Override
    public PersonaDTO updatePersona(PersonaDTO persona) {
        Persona personas = PersonaMapper.INSTANCE.personaToPersonaDTO(persona);
        PersonaDTO responPersona=PersonaMapper.INSTANCE.personaDTOToPersona(personaRepository.save(personas));
        return responPersona;
    }

    @Override
    public void deletePersonaDTO(Integer id) {
        personaRepository.deleteById(id);
    }

    @Override
    public List<PersonaDTO> getPersonaDTOs() {
        //Lista todos los registros
        List<Persona>listPersona=personaRepository.findAll();
        return PersonaMapper.INSTANCE.personaDTOListToPersonaList(listPersona);
    }

    @Override
    public PersonaDTO getPersonaDTOById(Integer id) {
        //Encuentra un registro
        Optional<Persona> personaId=personaRepository.findById(id);
        if (personaId.isPresent()) {
            return PersonaMapper.INSTANCE.personaDTOToPersona(personaId.get());
        }
        return null;
    }
}
