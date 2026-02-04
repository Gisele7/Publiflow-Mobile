# PubliFlow 🎓

O **PubliFlow** é uma plataforma de blog acadêmico desenvolvida para facilitar a comunicação e o compartilhamento de conteúdo entre professores e alunos de uma faculdade. O sistema permite a criação, edição e visualização de postagens com suporte a uploads de imagens, além de gerenciamento de usuários e controle de acesso baseado em papéis (RBAC).

## 📱 Telas e Funcionalidades

O aplicativo conta com fluxos distintos dependendo do nível de acesso do usuário:

### 🚀 Funcionalidades Gerais
* **Autenticação:** Login seguro com persistência de sessão via `AsyncStorage`.
* **Feed de Notícias:** Listagem de postagens com imagens, títulos e descrições.
* **Busca Inteligente:** Filtro em tempo real de posts por título ou conteúdo.
* **Menu Responsivo:** Navbar lateral (Drawer customizado) que se adapta ao papel do usuário e à altura do dispositivo (Safe Area).

### 🎓 Perfil: Aluno
* Visualização de todas as postagens.
* Acesso restrito apenas à leitura de conteúdos.
* Visualização de detalhes das postagens.

### 👨‍🏫 Perfil: Professor (Admin)
* **Gerenciamento de Posts:** Criar, Editar e Excluir publicações (com upload de imagem da galeria).
* **Gerenciamento de Alunos:** Cadastrar, listar, editar e remover alunos.
* **Gerenciamento de Professores:** Cadastrar, listar, editar e remover outros professores.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

* **[React Native](https://reactnative.dev/)** + **[Expo](https://expo.dev/)** (Framework Mobile)
* **[TypeScript](https://www.typescriptlang.org/)** (Tipagem estática e segurança no código)
* **[Expo Router](https://docs.expo.dev/router/introduction/)** (Navegação baseada em arquivos - File-based routing)
* **[Axios](https://axios-http.com/)** (Cliente HTTP para consumo de API REST)
* **[Expo Image Picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)** (Seleção e upload de imagens)
* **[AsyncStorage](https://react-native-async-storage.github.io/async-storage/)** (Armazenamento local de token/sessão)
* **Context API** (Gerenciamento global de autenticação e rotas protegidas)

---

## 📂 Estrutura do Projeto

```bash
PubliFlow/
├── app/                    # Rotas e Telas (Expo Router)
│   ├── screens/            # Telas principais (Home, Login, CRUDs)
│   │   ├── AdminPosts/     # Gestão de posts
│   │   ├── Students/       # CRUD de Estudantes
│   │   ├── Teachers/       # CRUD de Professores
│   │   └── ...
│   ├── _layout.tsx         # Configuração base de navegação (Stack)
│   └── index.tsx           # Ponto de entrada (Entry point)
├── components/             # Componentes Reutilizáveis
│   └── shared/             # Navbar, AppButton, PostCard, Styles
├── context/                # Contexto de Autenticação (AuthContext)
├── interface/              # Tipagens TypeScript (IPostData, User, etc.)
├── assets/                 # Imagens e ícones estáticos
└── api/                    # Configuração do Axios
```

## ⚙️ Pré-requisitos
Para rodar este projeto, você precisará ter instalado:

Node.js (versão LTS recomendada)

Expo Go (instalado no seu celular físico) ou um Emulador (Android Studio/Xcode).

Backend: Uma API rodando localmente (Node.js/Express ou similar) pronta para receber as requisições.

## 🚀 Como rodar o projeto
Clone o repositório:

```Bash
git clone [https://github.com/seu-usuario/publiflow-mobile.git](https://github.com/seu-usuario/publiflow-mobile.git)
cd publiflow-mobile
```
Instale as dependências:

```Bash
npm install
# ou
yarn install
```
Configuração da API (Importante): Para testar no celular físico ou emuladores, você deve configurar o IP da sua máquina local, pois o localhost do celular não é o mesmo do computador.

Abra o arquivo app/api/api.ts e edite:

TypeScript
// Substitua pelo IPv4 da sua máquina (veja com 'ipconfig' no Windows ou 'ifconfig' no Mac/Linux)
const SERVER_IP = '192.168.X.X'; 
const SERVER_PORT = '3000';

export const BASE_URL = `http://${SERVER_IP}:${SERVER_PORT}/api`;

Execute o projeto:

```Bash
npx expo start
```
Acesse:

Escaneie o QR Code exibido no terminal com o app Expo Go (Android/iOS).

Ou pressione a para abrir no Emulador Android / i para o Simulador iOS.
