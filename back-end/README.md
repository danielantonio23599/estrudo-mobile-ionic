# crud-estudo

## Introdução

As tecnologias utilizadas na célula web, para o desenvolvimento mobile, são:

- Backend (API)
  - Framework Spring Boot [Link de apoio](https://www.algaworks.com/meus-cursos/angular-rest-spring-boot) e [Link de Apoio](https://www.youtube.com/watch?v=bCzsSXE4Jzg&list=PL62G310vn6nFBIxp6ZwGnm8xMcGE3VA5H)
  - Bancos de dados Relacionais
  - Liquibase [Link de apoio](https://docs.liquibase.com/change-types/community/home.html)

O desenvolvedor deve criar um mini app mobile, que envolve autenticação de usuário utilizando Usuário e Senha, uma tela de cadastro de perfis, usuários e associação de permissão aos perfis.

- Etapas:

  - O aplicativo se iniciará na tela de login, onde o usuário cadastrado entrará com os dados de Login e Senha.

  - Haverá um menu para acesso às opções de cadastro: Usuário, Perfil, e Atribuição de Permissões. Apenas usuários que tenham as devidas permissões poderão acessar as telas.

  - As permissões serão predefinidas, e deverão ser adicionadas ao banco de dados previamente, por meio de Migrations ou Liquibase. Serão elas:

    - ROLE_CADASTRO_USUARIO
    - ROLE_CADASTRO_PERFIL
    - ROLE_LISTAGEM_USUARIO
    - ROLE_ACESSO_SISTEMA
    - ROLE_CONCEDER_PERMISSAO

    E no momento do login, as permissões devem ser carregadas para o usuário logado.

  - Caso o usuário não tenha permissão para acessar um menu específico, este não deve ser exibido.

  - Deverá haver previamente um usuário já cadastrado (admin) com o perfil de Administrador, que tenha todas as permissões.

- Descrição de Campos:

  - Usuário:

    - ID
    - Nome
    - Login
    - CPF
    - Senha
    - Perfil

  - Perfil:

    - ID
    - Nome


- O banco de dados deve ser criado utilizando um container Docker!
  [Link de apoio](https://onexlab-io.medium.com/docker-compose-mariadb-5eb7a37426a2)


- Na descrição do Merge Request, favor adicionar um print com as seguintes evidências:

  - (Caso a API for Spring Boot)
    - Dentro da pasta do projeto do Backend (onde tem o pom.xml) rodar o comando:
    ```bash
    mvn clean install -U -DskipTests -DskipITs
    ```








    
