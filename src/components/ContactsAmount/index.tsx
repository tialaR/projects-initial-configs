import { DonutChart } from "#components/DonutChart";
import { defaultTheme } from "#styles/themes/default";
import { StatusCard } from "./StatusCard";
import * as S from "./styles";

const { gold, silver, bronze } = defaultTheme.colors.status;

type ContactsAmountProps = {
  exhibitor: string;
  potentialContacts: string | number;
};

const ContactsAmount: React.FC<ContactsAmountProps> = ({
  exhibitor,
  potentialContacts,
}) => {
  return (
    <S.Container>
      <S.Header>
        <S.Title>Quantidade de contatos</S.Title>
        <S.SubTitle>Expositor: {exhibitor}</S.SubTitle>
      </S.Header>

      <S.DividerX />

      <S.IllustratedInfo>
        <S.InfoTextContainer>
          <p>Esse expositor tem acesso a:</p>
          <h5>{potentialContacts} potenciais<br />contatos.</h5>
        </S.InfoTextContainer>

        <S.DividerY />

        <DonutChart
          chartList={[
            { id: '0', percentage: 10, color: gold, label: "Ouro" },
            { id: '1', percentage: 20, color: silver, label: "Prata" },
            { id: '2', percentage: 70, color: bronze, label: "Bronze" },
          ]} />
      </S.IllustratedInfo>

      <S.DividerX />

      <S.ContactCardsContainer>
        <StatusCard
          color={gold}
          iconName="medalGold"
          medal="Ouro"
          value={1500}
          percentage={75}
        />
        <StatusCard
          color={silver}
          iconName="medalSilver"
          medal="Prata"
          value={500}
          percentage={25}
        />
      </S.ContactCardsContainer>
    </S.Container>
  );
};

export { ContactsAmount };
