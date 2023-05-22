package com.backendestudo.backend.service.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class PerfilDTO implements Serializable {

    private Long id;
    private String nome;
}
