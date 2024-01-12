![Logo do ICCT](https://media.licdn.com/dms/image/C4D0BAQGQoDkJFUfLZA/company-logo_200_200/0/1644001737031/icct_instituto_cal_camp_de_tecnologia_logo?e=2147483647&v=beta&t=BccxJ0zHTvigHOk9docGZPqy0djsActYLGrVUcww1p4)

# Desafio ICCT Frontend

## Descrição do Projeto

O projeto **desafio-icct-frontend** é uma aplicação frontend desenvolvida para atender aos requisitos do Desafio ICCT. Esta aplicação utiliza tecnologias modernas como React, Vite para construção rápida e eficiente, e integração com bibliotecas como Material-UI, Axios para requisições HTTP, e React Hook Form para gerenciamento de formulários.

## Tecnologias Utilizadas

- **React:** Biblioteca de construção de interfaces do usuário.
- **Vite:** Build tool para projetos modernos de frontend.
- **Material-UI:** Biblioteca de componentes React para um design consistente.
- **Axios:** Cliente HTTP para realizar requisições à API backend.
- **React Hook Form:** Biblioteca para gerenciamento de formulários React eficiente.
- **Yup:** Biblioteca para validação de esquemas de objetos.

## Scripts Disponíveis

- `dev`: Inicia o ambiente de desenvolvimento usando Vite.
- `build`: Constrói a aplicação para produção.
- `lint`: Executa o linter ESLint para manter um código consistente.
- `preview`: Inicia um servidor de pré-visualização local usando Vite.

## Instruções para Configurar e Rodar o Projeto

### Pré-requisitos

- Certifique-se de ter o Node.js instalado. Recomenda-se a versão 18 ou superior.
- Tenha o Docker e o Docker Compose instalados na máquina.

### Passos para Executar a Aplicação com Docker


1. **Clone o repositório:**

   ```bash
   git clone git@github.com:PedroSoprano/desafio-icct-frontend.git
   cd desafio-icct-frontend

2. **Configure as variáveis de ambiente:**


    ```bash
    VITE_API_BASE_URL=http://seu_ip:porta_do_backend


3. **Execute o seguinte comando:**
    obs: A aplicação irá rodar na porta 3005
    
   ```bash
   docker compose up -d --build


### Passos para Executar a Aplicação

1. **Clone o repositório:**

   ```bash
   git clone git@github.com:PedroSoprano/desafio-icct-frontend.git
   cd desafio-icct-frontend

2. **Instale as dependências:**

   ```bash
   npm install

3. **Configure as variáveis de ambiente:**

    ```bash
    VITE_API_BASE_URL=http://seu_ip:porta_do_backend

4. **Execute a aplicação em modo de desenvolvimento:**

   ```bash
   npm run dev
