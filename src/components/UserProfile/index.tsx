// import { Icon } from "#components/Icon";
import React from "react";
import * as S from "./styles";
import { SkeletonBox } from "#components/SkeletonBox";

type UserProfileProps = {
  name: string;
  email: string;
  imageUrl?: string;
};

const UserProfile: React.FC<UserProfileProps> = ({ name, email, imageUrl }) => {
  const initialsName = (fullName: string): string => {
    return fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2);
  };

  return (
    <S.ProfileContainer>
      {(imageUrl || name)
        ? <S.Avatar>
          {imageUrl ? <S.AvatarImage src={imageUrl} alt={name} /> : initialsName(name)}
        </S.Avatar>
        : <S.AvatarSkeleton />}
      <S.UserInfo>
        {name ? <S.UserName>{name}</S.UserName> : <SkeletonBox width="160px" />}
        {email ? <S.UserEmail>{email}</S.UserEmail> : <SkeletonBox width="210px" />}
      </S.UserInfo>
      {/* TBD -> This functionality will be implemented in the future */}
      {/* <Icon name="arrowDown" size={16} /> */}
    </S.ProfileContainer>
  );
};

export { UserProfile };
