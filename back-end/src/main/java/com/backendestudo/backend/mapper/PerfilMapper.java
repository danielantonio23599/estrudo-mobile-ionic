package com.backendestudo.backend.mapper;

import com.backendestudo.backend.model.Perfil;
import com.backendestudo.backend.service.dto.PerfilDTO;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface PerfilMapper {
    PerfilDTO toDTO(Perfil pefil);

    Perfil toEntity(PerfilDTO dto);

}
