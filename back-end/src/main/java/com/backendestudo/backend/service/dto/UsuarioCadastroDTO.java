package com.backendestudo.backend.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class UsuarioCadastroDTO implements Serializable {
    private Long id;
    private String nome;
    private String cpf;
    private String login;
    private String senha;
    private List<PerfilDTO> perfis;
}
