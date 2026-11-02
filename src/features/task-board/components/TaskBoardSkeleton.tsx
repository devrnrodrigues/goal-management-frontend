import React from 'react';
import {
  TaskBoardSkeletonPulse,
  BoardColumnsRowSkeleton,
  ColumnSkeletonWrapper,
  ColumnTopBarSkeleton,
  ColumnHeaderSkeleton,
  ColumnTitleAreaSkeleton,
  ColumnActionsSkeleton,
  CardsListSkeleton,
  TaskCardSkeletonContainer,
  TaskCardHeaderSkeleton,
  TaskCardBodySkeleton,
  TaskCardFooterSkeleton,
  TaskAvatarsGroupSkeleton,
  TaskMemberAvatarSkeleton,
} from '../styles/TaskBoardSkeleton.styles';

const FIVE_SKELETON_COLUMNS = [
  {
    id: 'col-skel-1',
    titleWidth: '95px',
    tasks: [
      { id: 'c1-tsk-1', titleWidth: '82%', descWidth: '95%' },
      { id: 'c1-tsk-2', titleWidth: '68%', descWidth: '78%' },
      { id: 'c1-tsk-3', titleWidth: '75%', descWidth: '85%' },
    ],
  },
  {
    id: 'col-skel-2',
    titleWidth: '110px',
    tasks: [
      { id: 'c2-tsk-1', titleWidth: '85%', descWidth: '90%' },
      { id: 'c2-tsk-2', titleWidth: '72%', descWidth: '80%' },
      { id: 'c2-tsk-3', titleWidth: '65%', descWidth: '70%' },
    ],
  },
  {
    id: 'col-skel-3',
    titleWidth: '120px',
    tasks: [
      { id: 'c3-tsk-1', titleWidth: '80%', descWidth: '92%' },
      { id: 'c3-tsk-2', titleWidth: '70%', descWidth: '65%' },
    ],
  },
  {
    id: 'col-skel-4',
    titleWidth: '90px',
    tasks: [
      { id: 'c4-tsk-1', titleWidth: '78%', descWidth: '88%' },
      { id: 'c4-tsk-2', titleWidth: '64%', descWidth: '72%' },
    ],
  },
  {
    id: 'col-skel-5',
    titleWidth: '100px',
    tasks: [
      { id: 'c5-tsk-1', titleWidth: '84%', descWidth: '80%' },
      { id: 'c5-tsk-2', titleWidth: '66%', descWidth: '74%' },
      { id: 'c5-tsk-3', titleWidth: '72%', descWidth: '86%' },
    ],
  },
];

const AVATAR_IDS = ['tb-av-1', 'tb-av-2'];

export const TaskBoardSkeleton: React.FC = () => {
  return (
    <BoardColumnsRowSkeleton>
      {FIVE_SKELETON_COLUMNS.map((col) => (
        <ColumnSkeletonWrapper key={col.id}>
          <ColumnTopBarSkeleton />
          <ColumnHeaderSkeleton>
            <ColumnTitleAreaSkeleton>
              <TaskBoardSkeletonPulse $width="16px" $height="16px" $radius="4px" />
              <TaskBoardSkeletonPulse $width={col.titleWidth} $height="18px" $radius="4px" />
              <TaskBoardSkeletonPulse $width="22px" $height="16px" $radius="9999px" />
            </ColumnTitleAreaSkeleton>
            <ColumnActionsSkeleton>
              <TaskBoardSkeletonPulse $width="24px" $height="24px" $radius="4px" />
              <TaskBoardSkeletonPulse $width="24px" $height="24px" $radius="4px" />
            </ColumnActionsSkeleton>
          </ColumnHeaderSkeleton>

          <CardsListSkeleton>
            {col.tasks.map((task) => (
              <TaskCardSkeletonContainer key={task.id}>
                <TaskCardHeaderSkeleton>
                  <TaskBoardSkeletonPulse $width="60px" $height="20px" $radius="6px" />
                  <TaskBoardSkeletonPulse $width="80px" $height="14px" />
                </TaskCardHeaderSkeleton>

                <TaskCardBodySkeleton>
                  <TaskBoardSkeletonPulse
                    $width={task.titleWidth}
                    $height="16px"
                    $radius="4px"
                  />
                  <TaskBoardSkeletonPulse
                    $width={task.descWidth}
                    $height="13px"
                    $radius="4px"
                  />
                </TaskCardBodySkeleton>

                <TaskCardFooterSkeleton>
                  <TaskAvatarsGroupSkeleton>
                    {AVATAR_IDS.map((avatarId) => (
                      <TaskMemberAvatarSkeleton
                        key={avatarId}
                        $width="26px"
                        $height="26px"
                        $radius="9999px"
                      />
                    ))}
                  </TaskAvatarsGroupSkeleton>
                  <TaskBoardSkeletonPulse
                    $width="18px"
                    $height="18px"
                    $radius="4px"
                  />
                </TaskCardFooterSkeleton>
              </TaskCardSkeletonContainer>
            ))}
          </CardsListSkeleton>
        </ColumnSkeletonWrapper>
      ))}
    </BoardColumnsRowSkeleton>
  );
};
