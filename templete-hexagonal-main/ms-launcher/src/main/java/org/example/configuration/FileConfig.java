package org.example.configuration;

import org.example.adapters.PersonaJpaAdapter;
import org.exemple.ports.api.PersonaServicePort;
import org.exemple.ports.spi.PersonaPersistencePort;
import org.exemple.service.PersonaServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FileConfig {
    @Bean
    public PersonaPersistencePort personaPersistencePort(){return new PersonaJpaAdapter();
    }
    @Bean
    public PersonaServicePort personaServicePort(){return new PersonaServiceImpl(personaPersistencePort());
    }
}
