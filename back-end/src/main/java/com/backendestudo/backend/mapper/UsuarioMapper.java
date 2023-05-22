package com.backendestudo.backend.mapper;

import com.backendestudo.backend.model.Usuario;
import com.backendestudo.backend.service.dto.UsuarioCadastroDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring", uses = {PerfilMapper.class})
public interface UsuarioMapper {
    UsuarioCadastroDTO toDTO(Usuario usuario);

    Usuario toEntity(UsuarioCadastroDTO usuarioDTO);
}
