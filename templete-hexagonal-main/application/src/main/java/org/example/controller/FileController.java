package org.example.controller;

import com.github.f4b6a3.ulid.Ulid;
import com.github.f4b6a3.ulid.UlidCreator;
import org.exemple.data.PersonaDTO;
import org.exemple.data.request.FileDTO;
import org.exemple.data.request.PersonaDTORequest;
import org.exemple.data.response.PersonaDTOResponse;
import org.exemple.data.response.ProductoDtoResponse;
import org.exemple.ports.api.PersonaServicePort;
import org.exemple.service.FileUploadUtil;
import org.exemple.utils.StringResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

//@CrossOrigin(origins = { "http://localhost:4200" })
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping("/file")
public class FileController {

    @Autowired
    private PersonaServicePort personaServicePort;
    @Autowired
    private ModelMapper modelMapper;
    @Value("${photos}")
    private String pathPhoto;

    @PostMapping("/save")
    public ResponseEntity<PersonaDTOResponse> saveUser(@RequestPart("file") MultipartFile multipartFile,PersonaDTORequest file) throws IOException {
        PersonaDTOResponse response = new PersonaDTOResponse();
        PersonaDTOResponse personaDTOResponse = this.modelMapper.map(file, PersonaDTOResponse.class);
        Ulid ulid = UlidCreator.getUlid();

        String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
        //user.setPhotos(fileName);

        String uploadDir = pathPhoto + ulid.toString()+ file.getNombre();
        personaDTOResponse.setFoto(uploadDir);
        FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);
        response = personaServicePort.addPersona(personaDTOResponse);
        PersonaDTOResponse personaDTORes = this.modelMapper.map(file, response.getClass());
        if (response != null){
            personaDTORes.setSuccess(true);
            response.setErrorCode(String.valueOf(StringResponse.OK.getCode()));
            response.setErrorMessage(StringResponse.OK.getName());
            return  new ResponseEntity<PersonaDTOResponse>(personaDTORes, HttpStatus.CREATED);
        }
        else{
            response.setErrorCode(String.valueOf(StringResponse.ErrorSAVE.getCode()));
            response.setErrorMessage(StringResponse.ErrorSAVE.getName());
            response.setSuccess(false);
            return   new ResponseEntity<PersonaDTOResponse>(personaDTORes, HttpStatus.BAD_REQUEST);
        }
    }
    @PutMapping("/update")
    public ResponseEntity<PersonaDTOResponse> updateUser(@RequestPart("file") MultipartFile multipartFile,PersonaDTORequest file) throws IOException {
        PersonaDTOResponse response = new PersonaDTOResponse();
        PersonaDTOResponse personaDTOResponse = this.modelMapper.map(file, PersonaDTOResponse.class);
        Ulid ulid = UlidCreator.getUlid();

        String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
        //user.setPhotos(fileName);

        String uploadDir = pathPhoto+ ulid.toString()+ file.getNombre();
        personaDTOResponse.setFoto(uploadDir);
        FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);
        response = personaServicePort.updatePersona(personaDTOResponse);
        PersonaDTOResponse personaDTORes = this.modelMapper.map(file, response.getClass());
        if (response != null){
            personaDTORes.setSuccess(true);
            response.setErrorCode(String.valueOf(StringResponse.OK.getCode()));
            response.setErrorMessage(StringResponse.OK.getName());
            return  new ResponseEntity<PersonaDTOResponse>(personaDTORes, HttpStatus.OK);
        }
        else{
            response.setErrorCode(String.valueOf(StringResponse.ErrorSAVE.getCode()));
            response.setErrorMessage(StringResponse.ErrorSAVE.getName());
            response.setSuccess(false);
            return   new ResponseEntity<PersonaDTOResponse>(personaDTORes, HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/get")
    public ResponseEntity<List<PersonaDTO>>getPersonaDTO(){
        List<PersonaDTO> personaDTOList = new ArrayList<>();
        personaDTOList=personaServicePort.getPersonaDTOs();
        if(personaDTOList.size()>=0)
            return new ResponseEntity<List<PersonaDTO>>(personaDTOList, HttpStatus.OK);
        else
            return new ResponseEntity<List<PersonaDTO>>(personaDTOList, HttpStatus.BAD_REQUEST);
    }
    @GetMapping("/get/{id}")
    public ResponseEntity<PersonaDTO>getPersonaById(@PathVariable Integer id){
        PersonaDTO personaDTOResponse = new PersonaDTO();
        personaDTOResponse = personaServicePort.getPersonaDTOById(id);
        if(personaDTOResponse != null)
            return new ResponseEntity<PersonaDTO>(personaDTOResponse,HttpStatus.OK);
        else
            return new ResponseEntity<PersonaDTO>(personaDTOResponse, HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteTicket(@PathVariable Integer id){
        personaServicePort.deletePersonaDTO(id);
    }
}
