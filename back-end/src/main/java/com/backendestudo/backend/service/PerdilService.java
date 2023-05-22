package com.backendestudo.backend.service;

import com.backendestudo.backend.mapper.PerfilMapper;
import com.backendestudo.backend.repository.PerfilRepository;
import com.backendestudo.backend.service.dto.PerfilDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class PerdilService {
    private final PerfilRepository repository;
    private final PerfilMapper mapper;
    @Transactional(readOnly = true)
    public List<PerfilDTO> findAll() {
        return repository.findAll().stream().map(mapper::toDTO).collect(Collectors.toList());
    }

    public PerfilDTO createPerfil(PerfilDTO perfil){
        return mapper.toDTO(repository.save(mapper.toEntity(perfil)));
    }
}
