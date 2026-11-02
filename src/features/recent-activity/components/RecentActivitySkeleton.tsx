import React from 'react';
import {
  ActivitySkeletonPulse,
  TimelineGroupSkeleton,
  GroupHeaderSkeleton,
  GroupDividerSkeleton,
  ItemListSkeleton,
  ActivityItemSkeletonCard,
  ActivityItemBodySkeleton,
  ActivityMetaRowSkeleton,
} from '../styles/RecentActivitySkeleton.styles';

const SKELETON_GROUPS = [
  {
    id: 'grp-skel-today',
    labelWidth: '55px',
    countWidth: '22px',
    items: [
      { id: 'act-skel-1', textWidth: '82%', pillWidth: '125px', hasChanges: true },
      { id: 'act-skel-2', textWidth: '68%', pillWidth: '145px', hasChanges: false },
      { id: 'act-skel-3', textWidth: '76%', pillWidth: '110px', hasChanges: true },
      { id: 'act-skel-4', textWidth: '85%', pillWidth: '135px', hasChanges: false },
      { id: 'act-skel-5', textWidth: '64%', pillWidth: '120px', hasChanges: true },
      { id: 'act-skel-6', textWidth: '78%', pillWidth: '150px', hasChanges: false },
      { id: 'act-skel-7', textWidth: '72%', pillWidth: '115px', hasChanges: false },
      { id: 'act-skel-8', textWidth: '80%', pillWidth: '130px', hasChanges: true },
    ],
  },
  {
    id: 'grp-skel-yesterday',
    labelWidth: '65px',
    countWidth: '22px',
    items: [
      { id: 'act-skel-9', textWidth: '70%', pillWidth: '130px', hasChanges: false },
      { id: 'act-skel-10', textWidth: '85%', pillWidth: '120px', hasChanges: true },
      { id: 'act-skel-11', textWidth: '66%', pillWidth: '140px', hasChanges: false },
      { id: 'act-skel-12', textWidth: '82%', pillWidth: '115px', hasChanges: true },
      { id: 'act-skel-13', textWidth: '74%', pillWidth: '125px', hasChanges: false },
      { id: 'act-skel-14', textWidth: '69%', pillWidth: '135px', hasChanges: false },
    ],
  },
  {
    id: 'grp-skel-this-week',
    labelWidth: '90px',
    countWidth: '22px',
    items: [
      { id: 'act-skel-15', textWidth: '78%', pillWidth: '125px', hasChanges: true },
      { id: 'act-skel-16', textWidth: '84%', pillWidth: '145px', hasChanges: false },
      { id: 'act-skel-17', textWidth: '67%', pillWidth: '110px', hasChanges: false },
      { id: 'act-skel-18', textWidth: '73%', pillWidth: '130px', hasChanges: true },
      { id: 'act-skel-19', textWidth: '86%', pillWidth: '120px', hasChanges: false },
      { id: 'act-skel-20', textWidth: '71%', pillWidth: '140px', hasChanges: true },
    ],
  },
];

export const RecentActivitySkeleton: React.FC = () => {
  return (
    <>
      {SKELETON_GROUPS.map((group) => (
        <TimelineGroupSkeleton key={group.id}>
          <GroupHeaderSkeleton>
            <ActivitySkeletonPulse $width={group.labelWidth} $height="18px" $radius="4px" />
            <ActivitySkeletonPulse $width={group.countWidth} $height="18px" $radius="9999px" />
            <GroupDividerSkeleton />
          </GroupHeaderSkeleton>

          <ItemListSkeleton>
            {group.items.map((item) => (
              <ActivityItemSkeletonCard key={item.id}>
                <ActivitySkeletonPulse $width="38px" $height="38px" $radius="9999px" />
                <ActivityItemBodySkeleton>
                  <ActivitySkeletonPulse $width={item.textWidth} $height="16px" $radius="4px" />
                  <ActivityMetaRowSkeleton>
                    <ActivitySkeletonPulse $width={item.pillWidth} $height="20px" $radius="9999px" />
                    <ActivitySkeletonPulse $width="85px" $height="14px" $radius="4px" />
                  </ActivityMetaRowSkeleton>
                  {item.hasChanges && (
                    <ActivitySkeletonPulse $width="175px" $height="22px" $radius="6px" />
                  )}
                </ActivityItemBodySkeleton>
              </ActivityItemSkeletonCard>
            ))}
          </ItemListSkeleton>
        </TimelineGroupSkeleton>
      ))}
    </>
  );
};
