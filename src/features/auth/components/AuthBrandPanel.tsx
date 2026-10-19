import React from 'react';
import { Compass } from 'lucide-react';
import {
  BrandPanelContainer,
  BrandGlowDeco,
  BrandHeader,
  BrandLogoBox,
  BrandTitle,
  BrandMainContent,
  BrandHeadline,
  BrandDescription,
  BrandQuoteWrapper,
  BrandQuoteText,
  BrandSupportingText,
  BrandFooter,
} from '../styles/AuthBrandPanel.styles';

export const AuthBrandPanel: React.FC = () => {
  return (
    <BrandPanelContainer>
      <BrandGlowDeco />

      <BrandHeader>
        <BrandLogoBox>
          <Compass size={24} />
        </BrandLogoBox>
        <BrandTitle>Gestão de metas</BrandTitle>
      </BrandHeader>

      <BrandMainContent>
        <BrandHeadline>Transforme suas metas em conquistas reais.</BrandHeadline>
        <BrandDescription>
          Planeje suas etapas, acompanhe o progresso com clareza e alcance seus objetivos no dia a dia.
        </BrandDescription>
        <BrandQuoteWrapper>
          <BrandQuoteText>
            &ldquo;Pequenos hábitos diários constroem grandes resultados a longo prazo.&rdquo;
          </BrandQuoteText>
        </BrandQuoteWrapper>
        <BrandSupportingText>
          Centralize suas prioridades, gerencie tarefas e visualize sua evolução de forma contínua e descomplicada.
        </BrandSupportingText>
      </BrandMainContent>

      <BrandFooter>Gestão de Metas &copy; 2026</BrandFooter>
    </BrandPanelContainer>
  );
};
