package com.backendestudo.backend.web.rest.Resource;

import com.backendestudo.backend.service.UsuarioService;
import com.backendestudo.backend.service.dto.UsuarioCadastroDTO;
import com.backendestudo.backend.service.util.Roles;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/usuario")
public class UsuarioResource {

    private final UsuarioService service;

    @PostMapping
    @Secured(Roles.ROLE_CADASTRO_USUARIO)
    public ResponseEntity<UsuarioCadastroDTO> cadastrarUsuario(@RequestBody UsuarioCadastroDTO usuario) {
        log.info("Persistindo usuario de nome {}.",usuario.getNome());
        return new ResponseEntity<>(service.createUsuario(usuario), HttpStatus.CREATED);
    }

    @PutMapping
    @Secured(Roles.ROLE_CONCEDER_PERMISSAO)
    public ResponseEntity<UsuarioCadastroDTO> atribuindoRoles(@RequestBody UsuarioCadastroDTO usuario) {
        log.info("Atribuindo roles usuario de nome {}.",usuario.getNome());
        return new ResponseEntity<>(service.createUsuario(usuario), HttpStatus.CREATED);
    }

    @GetMapping
    @Secured(Roles.ROLE_LISTAGEM_USUARIO)
    public ResponseEntity<List<UsuarioCadastroDTO>> listAllUsuarios() {
        log.info("Listando todos os usuarios");
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    @Secured(Roles.ROLE_LISTAGEM_USUARIO)
    public ResponseEntity<UsuarioCadastroDTO> buscarUsuario(@PathVariable Long id) {
        log.info("Buscar usuario com id = {}", id);
        return new ResponseEntity<>(service.buscarUsuario(id), HttpStatus.OK);
    }
}
