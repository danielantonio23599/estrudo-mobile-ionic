package com.backendestudo.backend.service;

import com.backendestudo.backend.mapper.UsuarioMapper;
import com.backendestudo.backend.model.Usuario;
import com.backendestudo.backend.repository.UsuarioRepository;
import com.backendestudo.backend.service.dto.UsuarioCadastroDTO;
import com.backendestudo.backend.service.dto.UsuarioDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class UsuarioService implements UserDetailsService {

    private final UsuarioRepository repository;
    private final UsuarioMapper mapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Usuario> usuario = repository.findByLogin(username);
        if (usuario.isPresent()) {
            UsuarioCadastroDTO cad = mapper.toDTO(usuario.get());
            return new UsuarioDTO(Optional.of(cad));
        }
        throw new UsernameNotFoundException("Usuário [" + username + "] não encontrado");
    }

    public UsuarioCadastroDTO createUsuario(UsuarioCadastroDTO usuario) {
        String encodedPassword = new BCryptPasswordEncoder().encode(usuario.getSenha());
        usuario.setSenha(encodedPassword);
        return mapper.toDTO(repository.save(mapper.toEntity(usuario)));
    }

    @Transactional(readOnly = true)
    public List<UsuarioCadastroDTO> findAll(){
        return repository.findAll().stream()
                .peek(user -> user.setSenha(""))
                .map(mapper::toDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public UsuarioCadastroDTO buscarUsuario(Long id) {
        UsuarioCadastroDTO user = mapper.toDTO(repository.findById(id).orElse(new Usuario()));
        user.setSenha("");
        return  user;
    }
}
