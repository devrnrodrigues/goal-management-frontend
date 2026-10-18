import React from 'react';
import type { TeamMemberReport } from '../types';
import {
  TeamCard,
  TeamHeader,
  TeamTitle,
  TeamMembersList,
  MemberRow,
  MemberInfo,
  MemberAvatar,
  MemberAvatarImg,
  MemberTextCol,
  MemberName,
  MemberRole,
  MemberStatsRow,
  StatPill,
} from '../styles/ReportsTeamPerformance.styles';

interface ReportsTeamPerformanceProps {
  members: TeamMemberReport[];
}

export const ReportsTeamPerformance: React.FC<ReportsTeamPerformanceProps> = ({
  members,
}) => {
  return (
    <TeamCard>
      <TeamHeader>
        <TeamTitle>Desempenho da equipe</TeamTitle>
      </TeamHeader>

      <TeamMembersList>
        {members.map((member) => (
          <MemberRow key={member.id}>
            <MemberInfo>
              <MemberAvatar title={member.name}>
                {member.avatarUrl ? (
                  <MemberAvatarImg
                    src={member.avatarUrl}
                    alt={member.name}
                    loading="lazy"
                  />
                ) : (
                  member.initials
                )}
              </MemberAvatar>

              <MemberTextCol>
                <MemberName>{member.name}</MemberName>
                <MemberRole>{member.role}</MemberRole>
              </MemberTextCol>
            </MemberInfo>

            <MemberStatsRow>
              <StatPill>{member.completedTasks} concluídas</StatPill>
              <StatPill>{member.onTimePercentage}% no prazo</StatPill>
            </MemberStatsRow>
          </MemberRow>
        ))}
      </TeamMembersList>
    </TeamCard>
  );
};
