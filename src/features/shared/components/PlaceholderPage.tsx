import React from 'react';
import { Compass } from 'lucide-react';
import {
  PlaceholderContainer,
  PlaceholderIconWrapper,
  PlaceholderTitle,
  PlaceholderDescription,
  PlaceholderActionBtn,
} from './PlaceholderPage.styles';

interface PlaceholderPageProps {
  pageName: string;
  onNavigateToGoals: () => void;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  pageName,
  onNavigateToGoals,
}) => {
  return (
    <PlaceholderContainer>
      <PlaceholderIconWrapper>
        <Compass size={28} />
      </PlaceholderIconWrapper>
      <PlaceholderTitle>{pageName}</PlaceholderTitle>
      <PlaceholderDescription>
        Esta seção está em fase final de preparação. Acesse a gestão de metas para visualizar o andamento dos projetos.
      </PlaceholderDescription>
      <PlaceholderActionBtn type="button" onClick={onNavigateToGoals}>
        Ir para minhas metas
      </PlaceholderActionBtn>
    </PlaceholderContainer>
  );
};
