import styled, { keyframes } from 'styled-components';

export const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

export const AvatarSkeleton = styled.div`
  width: 2.875rem;
  height: 2.875rem;
  border-radius: 50%;
  background: linear-gradient(90deg, #fafafa 0%, #f0f0f0 50%, #fafafa 100%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
  margin-right: 0.5rem;
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Avatar = styled.div`
  width: 2.875rem;
  height: 2.875rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.primary.purple200};
  color: ${(props) => props.theme.colors.grayScale.white};
  font-weight: ${(props) => props.theme.typography.paragraph.p14.bold};
  font-size: ${(props) => props.theme.typography.paragraph.p14.size};
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  overflow: hidden;
  margin-right: 0.5rem;
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 0.625rem;
  gap: 0.25rem;
`;

export const UserName = styled.span`
  font-size: ${(props) => props.theme.typography.paragraph.p14.size};
  font-weight: ${(props) => props.theme.typography.paragraph.p14.semiBold};
  color: ${(props) => props.theme.colors.grayScale.gray900};
`;

export const UserEmail = styled.span`
  font-size: ${(props) => props.theme.typography.paragraph.p12.size};
  color: ${(props) => props.theme.colors.grayScale.gray900};
`;