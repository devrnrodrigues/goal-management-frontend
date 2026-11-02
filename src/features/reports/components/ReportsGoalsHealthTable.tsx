import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { GoalHealthReportItem } from '../types';
import {
  HealthCard,
  HealthHeader,
  HealthTitle,
  TableWrapper,
  GoalsTable,
  TableHead,
  TableBody,
  GoalNamePill,
  ProgressWrapper,
  MiniTrack,
  MiniFill,
  ProgressText,
  HealthBadge,
  TablePagination,
  PaginationArrow,
  PaginationText,
} from '../styles/ReportsGoalsHealthTable.styles';

interface ReportsGoalsHealthTableProps {
  goals: GoalHealthReportItem[];
}

export const ReportsGoalsHealthTable: React.FC<ReportsGoalsHealthTableProps> = ({
  goals,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(goals.length / itemsPerPage) || 1;

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentGoals = goals.slice(startIndex, startIndex + itemsPerPage);

  const getHealthBadgeLabel = (status: GoalHealthReportItem['healthStatus']) => {
    switch (status) {
      case 'completed':
        return 'Concluída';
      case 'on_track':
        return 'No prazo';
      case 'delayed':
        return 'Atrasada';
      case 'at_risk':
      case 'attention':
      default:
        return 'Em risco';
    }
  };

  return (
    <HealthCard>
      <HealthHeader>
        <HealthTitle>Saúde e andamento das metas</HealthTitle>
        {totalPages > 1 && (
          <TablePagination>
            <PaginationArrow
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Página anterior"
            >
              <ChevronLeft size={14} />
            </PaginationArrow>
            <PaginationText>{currentPage} / {totalPages}</PaginationText>
            <PaginationArrow
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label="Próxima página"
            >
              <ChevronRight size={14} />
            </PaginationArrow>
          </TablePagination>
        )}
      </HealthHeader>

      <TableWrapper>
        <GoalsTable>
          <TableHead>
            <tr>
              <th>Meta</th>
              <th>Categoria</th>
              <th>Progresso</th>
              <th>Tarefas</th>
              <th>Prazo final</th>
              <th>Status</th>
            </tr>
          </TableHead>

          <TableBody>
            {currentGoals.map((item) => (
              <tr key={item.id}>
                <td>
                  <GoalNamePill title={item.goalTitle}>
                    {item.goalTitle}
                  </GoalNamePill>
                </td>
                <td>{item.category}</td>
                <td>
                  <ProgressWrapper>
                    <MiniTrack>
                      <MiniFill $progress={item.progress} />
                    </MiniTrack>
                    <ProgressText>{item.progress}%</ProgressText>
                  </ProgressWrapper>
                </td>
                <td>
                  {item.completedTasks}/{item.totalTasks}
                </td>
                <td>{item.deadline}</td>
                <td>
                  <HealthBadge $status={item.healthStatus}>
                    {getHealthBadgeLabel(item.healthStatus)}
                  </HealthBadge>
                </td>
              </tr>
            ))}
          </TableBody>
        </GoalsTable>
      </TableWrapper>
    </HealthCard>
  );
};
