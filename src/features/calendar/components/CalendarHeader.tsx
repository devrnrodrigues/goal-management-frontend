import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  HeaderContainer,
  TitleWrapper,
  MonthTitle,
  NavControls,
  TodayButton,
  ArrowNavButton,
} from '../styles/CalendarHeader.styles';

interface CalendarHeaderProps {
  currentMonthDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentMonthDate,
  onPrevMonth,
  onNextMonth,
  onToday,
}) => {
  const formattedMonthTitle = format(currentMonthDate, 'MMMM yyyy', { locale: ptBR });

  return (
    <HeaderContainer>
      <TitleWrapper>
        <MonthTitle>{formattedMonthTitle}</MonthTitle>
      </TitleWrapper>

      <NavControls>
        <TodayButton type="button" onClick={onToday}>
          <CalendarIcon size={14} />
          Hoje
        </TodayButton>
        <ArrowNavButton
          type="button"
          onClick={onPrevMonth}
          aria-label="Mês anterior"
        >
          <ChevronLeft size={18} />
        </ArrowNavButton>
        <ArrowNavButton
          type="button"
          onClick={onNextMonth}
          aria-label="Próximo mês"
        >
          <ChevronRight size={18} />
        </ArrowNavButton>
      </NavControls>
    </HeaderContainer>
  );
};
