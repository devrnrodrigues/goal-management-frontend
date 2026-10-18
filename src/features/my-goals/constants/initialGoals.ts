import type { Task } from '../types';

export const initialTasks: Task[] = [
    { 
        id: 'goal-checkout',
        category: 'Engenharia de Produto', 
        title: 'Novo Checkout Transacional', 
        progress: 71, 
        status: 'Revisão final',
        priority: 'Alta prioridade',
        description: 'Redesenho completo do fluxo de pagamento para reduzir abandono de carrinho, com suporte a Pix instantâneo, carteiras digitais e fallback automático.',
        deadline: '30/11/2026',
        subtasks: [
            { id: '1', title: 'Integração com gateway de pagamentos;', description: 'Conexão segura com adquirentes e split de pagamentos.', completed: true },
            { id: '2', title: 'Validação de antifraude e risco;', description: 'Regras de pontuação de score de compradores.', completed: true },
            { id: '3', title: 'Implementação do fluxo de fallback de cartão;', description: 'Retentativas inteligentes em caso de indisponibilidade.', completed: true },
            { id: '4', title: 'Testes de carga com 50k requisições/min;', description: 'Validação de stress e latência do endpoint.', completed: true },
            { id: '5', title: 'Homologação com equipe de Finanças;', description: 'Conciliação bancária e extratos automáticos.', completed: true },
            { id: '6', title: 'Auditoria de conformidade PCI-DSS;', description: 'Certificação de segurança no armazenamento de dados.', completed: false },
            { id: '7', title: 'Rollout progressivo de 10% para produção;', description: 'Canary release monitorado por feature flag.', completed: false },
        ]
    },
    { 
        id: 'goal-design-system',
        category: 'Design System', 
        title: 'Design System Core v2', 
        progress: 50, 
        status: 'Em desenvolvimento',
        priority: 'Média prioridade',
        description: 'Unificação da biblioteca de componentes visuais, tokens globais de acessibilidade e documentação interativa para todos os squads de produto.',
        deadline: '15/12/2026',
        subtasks: [
            { id: '1', title: 'Mapeamento dos tokens de cor e tipografia;', description: 'Variáveis semânticas de temas claro e escuro.', completed: true },
            { id: '2', title: 'Componentes base (Button, Input, Modal);', description: 'Padronização de propriedades e estados interativos.', completed: true },
            { id: '3', title: 'Auditoria de acessibilidade WCAG AAA;', description: 'Garantia de contraste, navegação por teclado e leitor de tela.', completed: false },
            { id: '4', title: 'Publicação do pacote NPM interno;', description: 'Versionamento semântico com documentação no Storybook.', completed: false },
        ]
    },
    { 
        id: 'goal-kubernetes',
        category: 'Infraestrutura & Cloud', 
        title: 'Migração para Kubernetes', 
        progress: 60, 
        status: 'Homologação',
        priority: 'Alta prioridade',
        description: 'Modernização da infraestrutura em nuvem para clusters EKS com autoscaling horizontal, esteiras automatizadas e monitoramento distribuído.',
        deadline: '20/12/2026',
        subtasks: [
            { id: '1', title: 'Provisionamento de clusters via Terraform;', description: 'Infraestrutura como código replicável entre ambientes.', completed: true },
            { id: '2', title: 'Configuração de esteiras CI/CD;', description: 'Pipelines automatizados no GitHub Actions com zero downtime.', completed: true },
            { id: '3', title: 'Implementação de observabilidade;', description: 'Dashboards no Grafana e alertas em tempo real no Slack.', completed: true },
            { id: '4', title: 'Configuração de ingress e certificados SSL;', description: 'Roteamento seguro e balanceamento de carga.', completed: false },
            { id: '5', title: 'Testes de failover e recuperação;', description: 'Simulação de queda de zona de disponibilidade.', completed: false },
        ]
    },
    { 
        id: 'goal-onboarding',
        category: 'Growth & Operações', 
        title: 'Onboarding do Cliente', 
        progress: 50, 
        status: 'Em progresso',
        priority: 'Média prioridade',
        description: 'Otimização do fluxo de ativação dos novos clientes corporativos reduzindo o tempo médio de setup inicial de 7 dias para menos de 24 horas.',
        deadline: '10/01/2027',
        subtasks: [
            { id: '1', title: 'Pesquisa de usabilidade com clientes ativos;', description: 'Identificação dos principais pontos de atrito no cadastro.', completed: true },
            { id: '2', title: 'Simplificação do formulário de compliance;', description: 'Envio assíncrono de documentos com OCR automático.', completed: true },
            { id: '3', title: 'Automação de e-mails de boas-vindas;', description: 'Trilhas personalizadas de engajamento inicial.', completed: false },
            { id: '4', title: 'Painel de métricas de conversão e ativação;', description: 'Acompanhamento do funil de onboarding em tempo real.', completed: false },
        ]
    },
    { 
        id: 'goal-data-warehouse',
        category: 'Data & Analytics', 
        title: 'Data Warehouse & BI', 
        progress: 25, 
        status: 'Planejamento',
        priority: 'Baixa prioridade',
        description: 'Construção de pipelines de dados em tempo real e dashboards executivos para acompanhamento das principais métricas de faturamento e engajamento.',
        deadline: '05/02/2027',
        subtasks: [
            { id: '1', title: 'Definição de modelo dimensional e schemas;', description: 'Estruturação de tabelas fatos e dimensões no BigQuery.', completed: true },
            { id: '2', title: 'Configuração de conectores CDC;', description: 'Captura contínua de alterações no banco transacional.', completed: false },
            { id: '3', title: 'Criação de DAGs no Apache Airflow;', description: 'Orquestração e agendamento dos jobs de ETL diários.', completed: false },
            { id: '4', title: 'Dashboard de receita recorrente (MRR);', description: 'Painel consolidado para acompanhamento da diretoria.', completed: false },
        ]
    },
    { 
        id: 'goal-mobile-e2e',
        category: 'Qualidade de Software', 
        title: 'Automação E2E Mobile', 
        progress: 33, 
        status: 'Prazo final',
        priority: 'Alta prioridade',
        description: 'Cobertura de testes automatizados de ponta a ponta para os fluxos críticos de autenticação e transações dos aplicativos iOS e Android.',
        deadline: '28/10/2026',
        subtasks: [
            { id: '1', title: 'Configuração do ambiente Appium;', description: 'Setup de emuladores e runners no cluster de testes.', completed: true },
            { id: '2', title: 'Scripts de login e biometria;', description: 'Validação de FaceID, TouchID e tokens 2FA.', completed: false },
            { id: '3', title: 'Fluxo completo de compra e contratação;', description: 'Cenários críticos de ponta a ponta na esteira de release.', completed: false },
        ]
    },
    { 
        id: 'goal-security-audit',
        category: 'Segurança da Informação', 
        title: 'Auditoria SOC 2 e LGPD', 
        progress: 75, 
        status: 'Revisão final',
        priority: 'Alta prioridade',
        description: 'Implementação e validação de controles de acesso, criptografia de dados em repouso e conformidade com diretrizes regulatórias.',
        deadline: '18/11/2026',
        subtasks: [
            { id: '1', title: 'Revisão dos logs de auditoria e retenção;', description: 'Centralização de logs em bucket imutável com KMS.', completed: true },
            { id: '2', title: 'Testes de intrusão e varredura de vulnerabilidades;', description: 'Análise DAST e SAST em todas as aplicações.', completed: true },
            { id: '3', title: 'Política de senhas e gestão de identidades IAM;', description: 'Aplicação de MFA obrigatório e rotação de chaves.', completed: true },
            { id: '4', title: 'Relatório executivo para certificação externa;', description: 'Evidências formais para os auditores independentes.', completed: false },
        ]
    },
    { 
        id: 'goal-ai-copilot',
        category: 'Inteligência Artificial', 
        title: 'Copiloto de Atendimento', 
        progress: 40, 
        status: 'Em desenvolvimento',
        priority: 'Média prioridade',
        description: 'Assistente inteligente baseado em LLM integrado ao suporte para triagem de chamados e respostas preditivas de nível 1.',
        deadline: '22/01/2027',
        subtasks: [
            { id: '1', title: 'Fine-tuning do modelo com base de conhecimento;', description: 'Treinamento contextualizado com FAQs e manuais.', completed: true },
            { id: '2', title: 'Desenvolvimento do middleware com cache semântico;', description: 'Redução de custos e latência de inferência.', completed: true },
            { id: '3', title: 'Testes de respostas e guardrails de segurança;', description: 'Prevenção contra prompt injection e alucinações.', completed: false },
            { id: '4', title: 'Integração com ferramenta de suporte ao cliente;', description: 'Conector com o painel de atendimento dos agentes.', completed: false },
            { id: '5', title: 'Validação de taxa de resolução com equipe de CX;', description: 'Métricas de CSAT e tempo de primeira resposta.', completed: false },
        ]
    },
    { 
        id: 'goal-billing-engine',
        category: 'Fintech & Cobrança', 
        title: 'Motor de Faturamento Recorrente', 
        progress: 60, 
        status: 'Homologação',
        priority: 'Alta prioridade',
        description: 'Novo motor de cobrança e conciliação para planos de assinatura com régua de cobrança inteligente e retry com IA.',
        deadline: '05/12/2026',
        subtasks: [
            { id: '1', title: 'Modelagem do esquema de precificação por uso;', description: 'Suporte a planos híbridos com metering por evento.', completed: true },
            { id: '2', title: 'Automação de faturas fiscais e emissão de NF-e;', description: 'Integração com prefeituras e SEFAZ.', completed: true },
            { id: '3', title: 'Régua de retentativas inteligentes de pagamento;', description: 'Otimização de horários de cobrança para reduzir churn.', completed: true },
            { id: '4', title: 'Dashboard de conciliação financeira;', description: 'Relatórios automáticos para o time de controladoria.', completed: false },
            { id: '5', title: 'Rollout piloto com 50 contas corporativas;', description: 'Validação assistida de faturamento em produção.', completed: false },
        ]
    },
    { 
        id: 'goal-performance-web',
        category: 'Engenharia de Performance', 
        title: 'Otimização de Core Web Vitals', 
        progress: 75, 
        status: 'Em progresso',
        priority: 'Média prioridade',
        description: 'Melhoria de métricas LCP, FID e CLS em toda a aplicação para acelerar o carregamento e melhorar a experiência do usuário.',
        deadline: '12/11/2026',
        subtasks: [
            { id: '1', title: 'Code-splitting de rotas e carregamento assíncrono;', description: 'Diminuição do bundle principal para menos de 150kb.', completed: true },
            { id: '2', title: 'Compressão e conversão de assets visuais;', description: 'Adoção de WebP e AVIF com srcset responsivo.', completed: true },
            { id: '3', title: 'Otimização de cache HTTP e CDN Edge;', description: 'Políticas de stale-while-revalidate nas bordas.', completed: true },
            { id: '4', title: 'Auditoria de pontuação no Lighthouse acima de 95;', description: 'Garantia de pontuação verde em mobile e desktop.', completed: false },
        ]
    },
];
