import React from 'react';
import { Download, ChevronDown } from 'lucide-react';
import type { ReportPeriod } from '../types';
import {
  FiltersRow,
  PeriodSelectorGroup,
  PeriodOptionButton,
  ActionsRightCol,
  CategorySelectWrapper,
  CategorySelect,
  ExportButton,
} from '../styles/ReportsFilters.styles';

interface ReportsFiltersProps {
  period: ReportPeriod;
  selectedCategory: string;
  categories: string[];
  onPeriodChange: (period: ReportPeriod) => void;
  onCategoryChange: (category: string) => void;
  onExport: () => void;
}

export const ReportsFilters: React.FC<ReportsFiltersProps> = ({
  period,
  selectedCategory,
  categories,
  onPeriodChange,
  onCategoryChange,
  onExport,
}) => {
  return (
    <FiltersRow>
      <PeriodSelectorGroup>
        <PeriodOptionButton
          type="button"
          $isActive={period === '30_days'}
          onClick={() => onPeriodChange('30_days')}
        >
          Últimos 30 dias
        </PeriodOptionButton>
        <PeriodOptionButton
          type="button"
          $isActive={period === 'quarter'}
          onClick={() => onPeriodChange('quarter')}
        >
          Trimestre
        </PeriodOptionButton>
        <PeriodOptionButton
          type="button"
          $isActive={period === 'year'}
          onClick={() => onPeriodChange('year')}
        >
          Ano corrente
        </PeriodOptionButton>
      </PeriodSelectorGroup>

      <ActionsRightCol>
        <CategorySelectWrapper>
          <CategorySelect
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="all">Todas as categorias</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </CategorySelect>
          <ChevronDown size={14} />
        </CategorySelectWrapper>

        <ExportButton type="button" onClick={onExport}>
          <Download size={14} />
          Exportar dados
        </ExportButton>
      </ActionsRightCol>
    </FiltersRow>
  );
};
