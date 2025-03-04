import { useForm, Controller } from "react-hook-form";
import { Input } from "#components/Input";
import { Select } from "#components/Select";
import { InputDate } from "#components/InputDate";
import { InputTimePicker } from "#components/InputTimePicker";
import { InputQuantity } from "#components/InputQuantity";
import { PHONE_NUMBERS_MOCK_LIST, PhoneCategory, TemplateOption, TEMPLATES_MOCK_LIST } from "../listMocksAux";
import { DataListItem } from "#components/DataSearchSelectListTable";
import { Button } from "#components/Button";
import { useContentSideMenu } from "#hooks/useContentSideMenu";
import { CampaignSummary } from "../CampaignSummary";
import { format } from "date-fns";
import { CampaignSuccess } from "../CampaignSuccess";
import { useNavigate } from "react-router-dom";
import { routesNames } from "#utils/routesNames";
import * as S from "./styles";

export type FormValues = {
    campaignName: string;
    template: TemplateOption | null;
    phone: PhoneCategory | null;
    leadsAmount: number | null;
    date: any;
    time: string;
};

type CreateCampaignFormProps = {
    children?: React.ReactNode;
    selectedExhibitors: DataListItem[];
}

const { GENERAL_CAMPAIGN, EXHIBITOR_CAMPAIGN } = routesNames;

const CreateCampaignForm: React.FC<CreateCampaignFormProps> = ({ children, selectedExhibitors }) => {
    const navigate = useNavigate();
    const { openContentSideMenu, closeContentSideMenu } = useContentSideMenu();

    const { control, handleSubmit, formState } = useForm<FormValues>({
        defaultValues: {
            campaignName: "",
            template: null,
            phone: null,
            leadsAmount: null,
            date: null,
            time: "",
        },
        mode: "onChange",
    });

    const isFormValid = formState.isValid && selectedExhibitors.length > 0;

    const isFormDataComplete = (
        formData: Omit<FormValues, 'leadsAmount'> & { leadsAmount: string; selectedExhibitors: DataListItem[] }
    ) => {
        return (
            !!formData.campaignName &&
            !!formData.template &&
            !!formData.phone &&
            !!formData.leadsAmount &&
            !!formData.date &&
            !!formData.time &&
            formData.selectedExhibitors.length > 0
        );
    };

    const openSummary = (data: FormValues) => {
        const formattedDate = data.date ? format(new Date(data.date), "dd/MM/yyyy") : null;
        const formattedLeadsAmount = data.leadsAmount ? new Intl.NumberFormat("pt-BR").format(data.leadsAmount) : "";

        const updatedFormData = {
            ...data,
            date: formattedDate,
            leadsAmount: formattedLeadsAmount,
            selectedExhibitors,
        };

        if (isFormDataComplete(updatedFormData)) {
            openContentSideMenu(
                <CampaignSummary
                    data={updatedFormData}
                    onCancel={closeContentSideMenu}
                    onConfirm={openSuccess}
                />
            );
        }
    };

    const openSuccess = () => {
        openContentSideMenu(
            <CampaignSuccess
                onCancel={() => {
                    navigate(GENERAL_CAMPAIGN, { replace: true });
                    closeContentSideMenu();
                }}
                onConfirm={() => {
                    navigate(EXHIBITOR_CAMPAIGN);
                    closeContentSideMenu();
                }}
            />);
    };

    return (
        <S.FormContainer onSubmit={handleSubmit(openSummary)}>
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
                            rules={{ required: "Nome da campanha obrigatório" }}
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
                            rules={{ required: "Template obrigatório" }}
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
                            rules={{ required: "Número do evento obrigatório" }}
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
                            rules={{ required: "Quantidade de leads obrigatória" }}
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
                            rules={{ required: "Data obrigatória" }}
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
                            rules={{ required: "Hora obrigatória" }}
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

            <S.Footer>
                <Button disabled={!isFormValid} variant="primary" type="submit">
                    Criar campanha
                </Button>
            </S.Footer>
        </S.FormContainer>
    );
};

export { CreateCampaignForm };
