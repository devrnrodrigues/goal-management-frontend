# Goal Management Frontend

Rascunho inicial da documentação do frontend da aplicação de gestão de metas e produtividade pessoal/profissional. O projeto encontra-se em estágio inicial de desenvolvimento.

## Tecnologias

| Tecnologia | Finalidade |
| --- | --- |
| React 19 | Biblioteca para construção da interface declarativa em componentes |
| TypeScript | Tipagem estática para maior robustez e manutenibilidade do código |
| Vite | Ferramenta de empacotamento (bundler) e servidor de desenvolvimento rápido |
| Styled Components | Estilização utilizando CSS-in-JS com suporte a temas globais |
| Framer Motion | Criação de animações e transições visuais fluidas |
| Lucide React | Conjunto de ícones vetoriais padronizados |
| Date-fns | Manipulação e formatação de datas |
| React Datepicker | Componente interativo para seleção de datas e prazos |
| Oxlint | Linter de alto desempenho para garantia de qualidade do código |

## Funcionalidades

### Em Desenvolvimento
- Minhas Metas (My Goals): Criação, listagem e acompanhamento do progresso de metas com prazos e status.
- Layout Base: Estrutura visual com barra lateral de navegação e cabeçalho.
- Sistema de Tema: Suporte a paleta de cores centralizada e estilos globais com Styled Components.

### Planejadas
- Dashboard: Visão consolidada de métricas, metas ativas e taxa de conclusão.
- Quadro de Tarefas (Task Board): Divisão das metas em tarefas menores no formato Kanban.
- Calendário: Visualização de prazos e marcos importantes em grade temporal.
- Metas Concluídas: Histórico e arquivo de objetivos finalizados.
- Anotações: Registro de notas rápidas vinculadas às metas.
- Relatórios: Geração de gráficos de desempenho e evolução ao longo do tempo.
- Notificações: Alertas de proximidade de prazos e lembretes de metas pendentes.
- Atividades Recentes: Linha do tempo de alterações e ações realizadas.
- Perfil e Configurações: Gestão de dados do usuário e preferências visuais.

## Interface (UI/UX)

- Design System baseado em tokens (cores, espaçamentos, tipografia e bordas) centralizados no tema.
- Interface responsiva com foco em usabilidade, clareza visual e redução de atrito no cadastro de metas.
- Microinterações e feedback visual de progresso e ações por meio de transições suaves.
- Padrão visual com contraste equilibrado e tipografia legível para rotinas de acompanhamento contínuo.

## Segurança

- Sanitização e validação de dados de entrada antes do envio para as camadas de integração.
- Armazenamento seguro de tokens de autenticação (JWT) via cookies HTTP-only ou mecanismos equivalentes definidos na arquitetura de integração.
- Proteção de rotas privadas impedindo acesso não autorizado às áreas restritas.
- Variáveis de ambiente isoladas sem exposição de credenciais confidenciais no cliente.

## Validações

- Validação de formulários no lado do cliente garantindo campos obrigatórios, datas coerentes e formatos válidos.
- Prevenção de prazos inconsistentes (por exemplo, data de término anterior à data de início).
- Limites de caracteres e validações textuais para títulos e descrições de metas.
- Tipagem estrita com TypeScript prevenindo incongruências de dados em tempo de compilação.

## Tratamento de Erros

- Telas e componentes de fallback para estados de erro amigáveis ao usuário.
- Interceptação de respostas HTTP da API para exibição de mensagens claras em caso de falhas (400, 401, 403, 404, 500).
- Tratamento de ausência de conexão de rede com indicação visual para o usuário.
- Error Boundaries para contenção de falhas inesperadas na árvore de componentes React.

## Arquitetura

O projeto adota uma arquitetura orientada a funcionalidades (Feature-Based Architecture), mantendo o código modular, desacoplado e de fácil expansão.

### Estrutura de Pastas

```text
src/
├── assets/             # Arquivos estáticos (imagens, fontes, vetores)
├── features/           # Módulos funcionais da aplicação
│   ├── calendar/       # Funcionalidade de calendário
│   ├── completed-goals/# Metas concluídas e histórico
│   ├── dashboard/      # Painel de controle e métricas
│   ├── layout/         # Estrutura base da interface (Sidebar, Header, etc.)
│   ├── my-goals/       # Gerenciamento de metas ativas
│   ├── notes/          # Anotações e registros
│   ├── notifications/  # Central de avisos e notificações
│   ├── profile/        # Perfil do usuário
│   ├── recent-activity/# Histórico de eventos e atividades
│   ├── reports/        # Relatórios e exportação
│   ├── settings/       # Preferências e configurações da conta
│   ├── shared/         # Componentes, tema, tipos e utilitários globais
│   └── task-board/     # Quadro interativo de tarefas
├── App.css             # Estilos de apoio
├── App.tsx             # Componente raiz da aplicação
└── main.tsx            # Ponto de entrada do React
```

### Rotas de Navegação

| Rota | Descrição | Status |
| --- | --- | --- |
| `/` ou `/dashboard` | Painel consolidado com resumo e indicadores de metas | Planejado |
| `/goals` | Listagem e gerenciamento detalhado de metas ativas | Em desenvolvimento |
| `/goals/completed` | Histórico e arquivo de metas concluídas | Planejado |
| `/tasks` | Visualização em quadro de tarefas (Kanban) | Planejado |
| `/calendar` | Visualização temporal de prazos em calendário | Planejado |
| `/notes` | Caderno de anotações e apontamentos | Planejado |
| `/reports` | Relatórios e estatísticas de rendimento | Planejado |
| `/activity` | Linha do tempo de atividades recentes | Planejado |
| `/notifications` | Lista de avisos e notificações do sistema | Planejado |
| `/profile` | Dados do usuário e informações da conta | Planejado |
| `/settings` | Configurações gerais da aplicação | Planejado |

### Integração com APIs

- Comunicação baseada em API REST com troca de dados em formato JSON.
- Camada centralizada de requisições HTTP para injeção de cabeçalhos de autenticação e tratamento padronizado de respostas.
- Modelagem de contratos de dados espelhados nas interfaces TypeScript do frontend.

### Gerenciamento de Estado

- Estado local e de formulários gerenciado via hooks nativos do React (`useState`, `useReducer`, `useCallback`).
- Compartilhamento de dados transversais (como tema, usuário autenticado e preferências) via React Context API.
- Planejada a adoção de biblioteca de cache e sincronização assíncrona para requisições com o servidor (como TanStack Query).

## Configuração do Ambiente

| Variável | Descrição | Exemplo |
| --- | --- | --- |
| `VITE_API_BASE_URL` | URL base da API de backend | `http://localhost:3000/api` |
| `VITE_APP_ENV` | Identificador do ambiente de execução | `development` |

Para configurar as variáveis locais, crie um arquivo `.env` na raiz do projeto com base nas definições acima.

## Testes

- Testes Unitários: Validação de utilitários, hooks customizados e regras de negócio isoladas.
- Testes de Componentes: Renderização e comportamento de elementos visuais e interações de formulários.
- Testes de Integração: Fluxos de navegação e integração entre múltiplos componentes.

Os scripts de execução de testes serão integrados à suíte de testes (Vitest / React Testing Library) nas etapas seguintes do desenvolvimento.

## Como Rodar o Projeto

### Pré-requisitos
- Node.js (versão 20.x ou superior recomendada)
- Gerenciador de pacotes npm, pnpm ou yarn

### Instalação e Execução

1. Clone o repositório:
```bash
git clone https://github.com/devrnrodrigues/goal-management-frontend.git
```

2. Acesse a pasta do projeto:
```bash
cd goal-management-frontend
```

3. Instale as dependências:
```bash
npm install
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

5. Para validar a qualidade de código com o linter:
```bash
npm run lint
```

6. Para compilar a versão de produção:
```bash
npm run build
```

## Licença

Este projeto está sob a licença MIT. Consulte o arquivo LICENSE para obter mais informações.
