package org.exemple.service;

import org.exemple.data.PersonaDTO;
import org.exemple.data.response.PersonaDTOResponse;
import org.exemple.ports.api.PersonaServicePort;
import org.exemple.ports.spi.PersonaPersistencePort;
import org.exemple.utils.StringResponse;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class PersonaServiceImpl implements PersonaServicePort {
    private final PersonaPersistencePort personaPersistencePort;
    @Autowired
    public PersonaServiceImpl(PersonaPersistencePort personaPersistencePort){
        this.personaPersistencePort = personaPersistencePort;
    }
    @Override
    public PersonaDTOResponse addPersona(PersonaDTOResponse persona) {
        PersonaDTOResponse response = new PersonaDTOResponse();
        PersonaDTO personaDTO = new PersonaDTO();

        personaDTO = personaPersistencePort.addPersona(persona);
        if(personaDTO==null){
            response.setErrorCode(String.valueOf(StringResponse.ErrorSAVE.getCode()));
            response.setErrorMessage(StringResponse.ErrorSAVE.getName());
            response.setSuccess(false);
        }else{
            response.setSuccess(true);
            response.setErrorCode(String.valueOf(StringResponse.OK.getCode()));
            response.setErrorMessage(StringResponse.OK.getName());
        }
        return response;
    }

    @Override
    public PersonaDTOResponse updatePersona(PersonaDTOResponse persona) {
        PersonaDTOResponse response = new PersonaDTOResponse();
        PersonaDTO personaDTO = new PersonaDTO();

        personaDTO = personaPersistencePort.updatePersona(persona);
        if(personaDTO==null){
            response.setErrorCode(String.valueOf(StringResponse.ErrorSAVE.getCode()));
            response.setErrorMessage(StringResponse.ErrorSAVE.getName());
            response.setSuccess(false);
        }else{
            response.setSuccess(true);
            response.setErrorCode(String.valueOf(StringResponse.OK.getCode()));
            response.setErrorMessage(StringResponse.OK.getName());
        }
        return response;
    }

    @Override
    public void deletePersonaDTO(Integer id) {
        personaPersistencePort.deletePersonaDTO(id);
    }

    @Override
    public List<PersonaDTO> getPersonaDTOs() {
        return personaPersistencePort.getPersonaDTOs();
    }

    @Override
    public PersonaDTO getPersonaDTOById(Integer id) {

        PersonaDTO personaDTO = new PersonaDTO();

        personaDTO = personaPersistencePort.getPersonaDTOById(id);
        if(personaDTO==null)
            throw new IllegalStateException(StringResponse.OK.getName() + StringResponse.OK.getCode()) ;

        return personaDTO;
    }
}
