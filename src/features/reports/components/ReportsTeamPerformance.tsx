import React, { useState } from 'react';
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
  MemberStatsRow,
  StatPill,
} from '../styles/ReportsTeamPerformance.styles';

interface ReportsTeamPerformanceProps {
  members: TeamMemberReport[];
}

const SafeReportMemberAvatar: React.FC<{ member: TeamMemberReport }> = ({ member }) => {
  const [hasError, setHasError] = useState(false);

  if (member.avatarUrl && !hasError) {
    return (
      <MemberAvatarImg
        src={member.avatarUrl}
        alt={member.name}
        loading="lazy"
        onError={() => setHasError(true)}
      />
    );
  }

  return <>{member.initials}</>;
};

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
                <SafeReportMemberAvatar member={member} />
              </MemberAvatar>

              <MemberTextCol>
                <MemberName>{member.name}</MemberName>
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
