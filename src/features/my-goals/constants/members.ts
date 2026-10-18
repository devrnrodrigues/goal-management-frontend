export type MemberRole = 'owner' | 'admin' | 'viewer';

export interface MemberAvatar {
    id: string;
    avatarUrl: string;
    name: string;
    role?: MemberRole;
}

export const currentUser: MemberAvatar = {
    id: 'usr-renan',
    name: 'Renan Rodrigues',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80',
    role: 'owner',
};

export const defaultMembers: MemberAvatar[] = [
    currentUser,
    { id: 'def-1', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80', name: 'Marina Silva', role: 'admin' },
    { id: 'def-2', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80', name: 'Lucas Costa', role: 'viewer' },
];

export const systemUsers: MemberAvatar[] = [
    currentUser,
    { id: 'usr-1', name: 'Marina Silva', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80' },
    { id: 'usr-2', name: 'Lucas Costa', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80' },
    { id: 'usr-3', name: 'Camila Lima', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80' },
    { id: 'usr-4', name: 'Gabriel Pires', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80' },
    { id: 'usr-5', name: 'Beatriz Rocha', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80' },
    { id: 'usr-6', name: 'Rodrigo Alves', avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=80&q=80' },
    { id: 'usr-7', name: 'Julia Martins', avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=80&q=80' },
    { id: 'usr-8', name: 'Felipe Dias', avatarUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=80&q=80' },
    { id: 'usr-9', name: 'Ana Souza', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80' },
    { id: 'usr-10', name: 'Carlos Eduardo', avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&q=80' },
    { id: 'usr-11', name: 'Thiago Ramos', avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=80&q=80' },
    { id: 'usr-12', name: 'Fernanda Lima', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80' },
    { id: 'usr-13', name: 'Rafael Moura', avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=80&q=80' },
    { id: 'usr-14', name: 'Larissa Mendes', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80' },
];

export const membersByTitle: Record<string, MemberAvatar[]> = {
    'Novo Checkout Transacional': [
        { id: 'v-1', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80', name: 'Marina Silva' },
        { id: 'v-2', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80', name: 'Lucas Costa' },
        { id: 'v-3', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80', name: 'Camila Lima' },
        { id: 'v-4', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80', name: 'Gabriel Pires' },
        { id: 'v-5', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80', name: 'Beatriz Rocha' },
    ],
    'Design System Core v2': [
        { id: 'f-1', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80', name: 'Beatriz Rocha' },
        { id: 'f-2', avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=80&q=80', name: 'Rodrigo Alves' },
        { id: 'f-3', avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=80&q=80', name: 'Julia Martins' },
        { id: 'f-4', avatarUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=80&q=80', name: 'Felipe Dias' },
    ],
    'Onboarding do Cliente': [
        { id: 'b-1', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80', name: 'Gabriel Pires' },
        { id: 'b-2', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80', name: 'Lucas Costa' },
        { id: 'b-3', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80', name: 'Marina Silva' },
    ],
    'Data Warehouse & BI': [
        { id: 'db-1', avatarUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=80&q=80', name: 'Felipe Dias' },
        { id: 'db-2', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80', name: 'Camila Lima' },
    ],
    'Migração para Kubernetes': [
        { id: 'n-1', avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=80&q=80', name: 'Julia Martins' },
        { id: 'n-2', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80', name: 'Marina Silva' },
        { id: 'n-3', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80', name: 'Gabriel Pires' },
        { id: 'n-4', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80', name: 'Lucas Costa' },
        { id: 'n-5', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80', name: 'Beatriz Rocha' },
        { id: 'n-6', avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=80&q=80', name: 'Rodrigo Alves' },
    ],
    'Automação E2E Mobile': [
        { id: 't-1', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80', name: 'Camila Lima' },
    ],
    'Auditoria SOC 2 e LGPD': [
        { id: 's-1', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80', name: 'Lucas Costa' },
        { id: 's-2', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80', name: 'Marina Silva' },
        { id: 's-3', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80', name: 'Gabriel Pires' },
    ],
    'Copiloto de Atendimento': [
        { id: 'c-1', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80', name: 'Beatriz Rocha' },
        { id: 'c-2', avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=80&q=80', name: 'Rodrigo Alves' },
        { id: 'c-3', avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=80&q=80', name: 'Julia Martins' },
        { id: 'c-4', avatarUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=80&q=80', name: 'Felipe Dias' },
    ],
    'Motor de Faturamento Recorrente': [
        { id: 'm-1', avatarUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=80&q=80', name: 'Felipe Dias' },
        { id: 'm-2', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80', name: 'Camila Lima' },
        { id: 'm-3', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80', name: 'Marina Silva' },
    ],
    'Otimização de Core Web Vitals': [
        { id: 'w-1', avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=80&q=80', name: 'Rodrigo Alves' },
        { id: 'w-2', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80', name: 'Beatriz Rocha' },
    ],
    'Versionamento': [
        { id: 'v-1', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80', name: 'Marina Silva' },
        { id: 'v-2', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80', name: 'Lucas Costa' },
        { id: 'v-3', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80', name: 'Camila Lima' },
        { id: 'v-4', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80', name: 'Gabriel Pires' },
        { id: 'v-5', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80', name: 'Beatriz Rocha' },
    ],
    'Frontend': [
        { id: 'f-1', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80', name: 'Beatriz Rocha' },
        { id: 'f-2', avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=80&q=80', name: 'Rodrigo Alves' },
        { id: 'f-3', avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=80&q=80', name: 'Julia Martins' },
        { id: 'f-4', avatarUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=80&q=80', name: 'Felipe Dias' },
    ],
    'Backend': [
        { id: 'b-1', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80', name: 'Gabriel Pires' },
        { id: 'b-2', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80', name: 'Lucas Costa' },
        { id: 'b-3', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80', name: 'Marina Silva' },
    ],
    'Banco de Dados': [
        { id: 'db-1', avatarUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=80&q=80', name: 'Felipe Dias' },
        { id: 'db-2', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80', name: 'Camila Lima' },
    ],
    'Nuvem': [
        { id: 'n-1', avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=80&q=80', name: 'Julia Martins' },
        { id: 'n-2', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80', name: 'Marina Silva' },
        { id: 'n-3', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80', name: 'Gabriel Pires' },
        { id: 'n-4', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80', name: 'Lucas Costa' },
        { id: 'n-5', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80', name: 'Beatriz Rocha' },
        { id: 'n-6', avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=80&q=80', name: 'Rodrigo Alves' },
    ],
    'Testes': [
        { id: 't-1', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80', name: 'Camila Lima' },
    ],
};
