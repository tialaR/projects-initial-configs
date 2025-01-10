import { Icon } from "#components/Icon";
import React from "react";
import * as S from "./styles";

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
      <S.Avatar>
        {imageUrl ? <S.AvatarImage src={imageUrl} alt={name} /> : initialsName(name)}
      </S.Avatar>
      <S.UserInfo>
        <S.UserName>{name}</S.UserName>
        <S.UserEmail>{email}</S.UserEmail>
      </S.UserInfo>
      <Icon name="arrowDown" size={16} />
    </S.ProfileContainer>
  );
};

export { UserProfile };
