package com.backendestudo.backend.web.rest.Resource;

import com.backendestudo.backend.service.PerdilService;
import com.backendestudo.backend.service.UsuarioService;
import com.backendestudo.backend.service.dto.PerfilDTO;
import com.backendestudo.backend.service.dto.UsuarioCadastroDTO;
import com.backendestudo.backend.service.util.Roles;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/perfil")
public class PerfilResource {

    private final PerdilService service;

    @PostMapping
    @Secured(Roles.ROLE_CADASTRO_PERFIL)
    public ResponseEntity<PerfilDTO> cadastrarUsuario(@RequestBody PerfilDTO perfil) {
        log.info("Persistindo perfil de nome {}.",perfil.getNome());
        return new ResponseEntity<>(service.createPerfil(perfil), HttpStatus.CREATED);
    }

    @GetMapping
    @Secured(Roles.ROLE_CONCEDER_PERMISSAO)
    public ResponseEntity<List<PerfilDTO>> listAllPerfis() {
        log.info("Listando todos os perfis");
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }
}
