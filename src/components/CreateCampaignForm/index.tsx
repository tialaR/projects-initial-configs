import { useForm, Controller } from "react-hook-form";
import { Input } from "#components/Input";
import { Select } from "#components/Select";
import { InputDate } from "#components/InputDate";
import { InputTimePicker } from "#components/InputTimePicker";
import { InputQuantity } from "#components/InputQuantity";
import { PHONE_NUMBERS_MOCK_LIST, PhoneCategory, TemplateOption, TEMPLATES_MOCK_LIST } from "./listMocksAux";
import * as S from "./styles";

type CreateCampaignFormProps = {
    children?: React.ReactNode;
}

const CreateCampaignForm: React.FC<CreateCampaignFormProps> = ({ children }) => {
    const { control, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        console.log(JSON.stringify(data));
    };

    return (
        <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
            <S.FormWrapper>
                <S.FormHeader>
                    <S.FormTitle>Configurar Campanha</S.FormTitle>
                    <S.FormDescription>
                        Preencha os campos abaixo para configurar a campanha.
                        Em seguida, selecione os expositores para finalizar a criação.
                    </S.FormDescription>
                </S.FormHeader>

                <S.FormLineWrapper>
                    <S.FieldContainer>
                        <Controller
                            name="campaignName"
                            control={control}
                            render={({ field }) => {
                                const { onChange } = field;
                                return (
                                    <Input
                                        {...field}
                                        onChange={onChange}
                                        label="Nome da Campanha"
                                        placeholder="Digite o nome aqui"
                                        maxLength={200}
                                    />
                                )
                            }}
                        />
                    </S.FieldContainer>

                    <S.FieldContainer>
                        <Controller
                            name="template"
                            control={control}
                            render={({ field }) => {
                                const { onChange } = field;
                                return (
                                    <Select<TemplateOption>
                                        {...field}
                                        selectOptionsList={TEMPLATES_MOCK_LIST}
                                        onChange={onChange}
                                        label="Selecionar Template"
                                        placeholder="Escolha um template aqui"
                                    />
                                )
                            }}
                        />
                    </S.FieldContainer>
                </S.FormLineWrapper>

                <S.FormLineWrapper>
                    <S.FieldContainer>
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => {
                                const { onChange } = field;
                                return (
                                    <Select<PhoneCategory>
                                        {...field}
                                        selectOptionsList={PHONE_NUMBERS_MOCK_LIST}
                                        onChange={onChange}
                                        label="Selecionar Telefone"
                                        placeholder="Escolha um número aqui"
                                    />
                                )
                            }}
                        />
                    </S.FieldContainer>

                    <S.FieldContainer>
                        <Controller
                            name="leadsAmount"
                            control={control}
                            render={({ field }) => {
                                const { value, onChange } = field;
                                const numericValue = value ? Number(value) : "";
                                const valueFormatted = numericValue
                                    ? new Intl.NumberFormat("pt-BR").format(numericValue)
                                    : "";
                                return (
                                    <InputQuantity
                                        {...field}
                                        value={valueFormatted}
                                        onChange={(e) => {
                                            const rawValue = e.target.value.replace(/\D/g, "");
                                            onChange(rawValue ? Number(rawValue) : "");
                                        }}
                                        label="Quantidade de Leads"
                                        placeholder="Digite a quantidade aqui"
                                    />
                                );
                            }}
                        />
                    </S.FieldContainer>
                </S.FormLineWrapper>

                <S.FormLineWrapper>
                    <S.FieldContainer>
                        <Controller
                            name="date"
                            control={control}
                            render={({ field }) => {
                                const { value, onChange } = field;
                                return (
                                    <InputDate
                                        {...field}
                                        value={value}
                                        onChange={onChange}
                                        label="Selecionar Data"
                                        placeholder="Escolha uma data de disparo"
                                    />
                                );
                            }}
                        />
                    </S.FieldContainer>

                    <S.FieldContainer>
                        <Controller
                            name="time"
                            control={control}
                            render={({ field }) => {
                                const { value, onChange } = field;
                                return (
                                    <InputTimePicker
                                        {...field}
                                        value={value}
                                        onChange={onChange}
                                        label="Selecionar Horário"
                                        placeholder="Escolha uma hora de disparo"
                                    />
                                );
                            }}
                        />
                    </S.FieldContainer>
                </S.FormLineWrapper>
            </S.FormWrapper>

            {children}
        </S.FormContainer>
    );
};

export { CreateCampaignForm };
