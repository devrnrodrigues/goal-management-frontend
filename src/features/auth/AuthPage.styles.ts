import styled from 'styled-components';
import { motion } from 'framer-motion';

export const AuthRootContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
  background-image: 
    radial-gradient(at 0% 0%, rgba(0, 168, 107, 0.08) 0px, transparent 50%),
    radial-gradient(at 100% 100%, rgba(0, 168, 107, 0.05) 0px, transparent 50%);
  padding: 24px;
`;

export const AuthCardWrapper = styled.div`
  width: 100%;
  max-width: 1060px;
  min-height: 640px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  overflow: hidden;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    max-width: 480px;
    min-height: auto;
  }
`;

export const FormSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  background-color: ${({ theme }) => theme.colors.surface};

  @media (max-width: 480px) {
    padding: 28px 20px;
  }
`;

export const MobileBrandHeader = styled.div`
  display: none;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
  width: 100%;
  max-width: 400px;

  @media (max-width: 960px) {
    display: flex;
  }
`;

export const MobileBrandLogoBox = styled.div`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.sidebarText};
`;

export const MobileBrandTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const MotionFormContainer = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: center;
`;
