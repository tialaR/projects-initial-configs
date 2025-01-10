import { useForm, Controller } from "react-hook-form";
import { Input } from "#components/Input";
import { Select } from "#components/Select";
import { InputDate } from "#components/InputDate";
import { InputTimePicker } from "#components/InputTimePicker";
import { InputQuantity } from "#components/InputQuantity";
import { DataListItem } from "#components/DataSearchSelectListTable";
import { Button } from "#components/Button";
import { useContentSideMenu } from "#hooks/useContentSideMenu";
import { CampaignSummary } from "../CampaignSummary";
import { format } from "date-fns";
import { CampaignSuccess } from "../CampaignSuccess";
import { useNavigate } from "react-router-dom";
import { routesNames } from "#utils/routesNames";
import { useEffect } from "react";
import { useFetchTemplates } from "#services/templates/useFetchTemplates";
import { getLocalSelectedEvent } from "#utils/localStorageItems";
import { ErrorMessage } from "#styles/components";
import { useFetchPhones } from "#services/phones/useFecthExhibitors";
import { defaultTheme } from "#styles/themes/default";
import * as S from "./styles";
import { Tooltip } from "#components/Tooltip";

type TemplateOption = {
    id: string;
    label: string;
    value: string;
    status: string;
    statusColor: "positive100" | "negative100" | "warning100" | "info100";
};

type PhoneCategory = {
    category: string;
    id: string;
    phones: {
        name: string;
        number: string;
        health: {
            label: string;
            color: string;
        };
    }[];
};

export type FormValues = {
    campaignName: string;
    template: TemplateOption | null;
    phone: PhoneCategory | null;
    leadsAmount: string;
    date: any;
    time: string;
};

type CampaignFormProps = {
    children?: React.ReactNode;
    selectedExhibitors: DataListItem[];
}

const { GENERAL_CAMPAIGN, EXHIBITOR_CAMPAIGN } = routesNames;

const CampaignForm: React.FC<CampaignFormProps> = ({ children, selectedExhibitors }) => {
    const navigate = useNavigate();
    const { openContentSideMenu, closeContentSideMenu } = useContentSideMenu();

    const { data: templates, loading: loadingTemplates, error: errrorTemplates, fetchTemplates } = useFetchTemplates();
    const { data: phones, loading: loadingPhones, error: errorPhones, fetchPhones } = useFetchPhones();

    const registeredEventId = getLocalSelectedEvent()?.registered_event_id;

    useEffect(() => {
        if (registeredEventId) {
            fetchTemplates(registeredEventId);
            fetchPhones(registeredEventId);
        }
    }, [registeredEventId]);

    // Transform API data to Select component format
    const templateOptions: TemplateOption[] =
        templates?.map((template) => ({
            id: template.template_id,
            label: template.template_name,
            value: template.template_id,
            status: template.status,
            statusColor: template.status === "Aprovado" ? "positive100" :
                template.status === "Reprovado" ? "negative100" :
                    "warning100",
        })) || [];

    // Transform API data to Select component format
    /* TBD -> We still don't have the category, colors and percentages of the health of the numbers */
    const phoneOptions = phones?.map(phone => ({
        category: '',
        id: phone.phone_id,
        phones: [
            {
                name: phone.phone_name,
                number: phone.phone_number,
                health: {
                    label: `TBD`,
                    color: defaultTheme.colors.grayScale.gray400,
                },
            },
        ],
    })) || [];

    const { control, handleSubmit, formState } = useForm<FormValues>({
        defaultValues: {
            campaignName: "",
            template: null,
            phone: null,
            leadsAmount: "",
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

        const updatedFormData = {
            ...data,
            date: formattedDate,
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
                    <S.FormTitle>Nova Campanha</S.FormTitle>
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
                                        selectOptionsList={templateOptions}
                                        onChange={onChange}
                                        label="Selecionar Template"
                                        placeholder={loadingTemplates ? "Carregando templates..." : "Escolha um template aqui"}
                                    />
                                )
                            }}
                        />
                        {errrorTemplates && <ErrorMessage>Erro ao carregar templates</ErrorMessage>}
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
                                        selectOptionsList={phoneOptions}
                                        onChange={onChange}
                                        label="Selecionar Telefone"
                                        placeholder={loadingPhones ? "Carregando telefones..." : "Escolha um número"}
                                    />
                                )
                            }}
                        />
                        {errorPhones && <ErrorMessage>Erro ao buscar telefones</ErrorMessage>}
                    </S.FieldContainer>

                    <S.FieldContainer>
                        <Controller
                            name="leadsAmount"
                            control={control}
                            rules={{ required: "Quantidade de leads obrigatória" }}
                            render={({ field }) => {
                                const { onChange, value } = field;
                                return (
                                    <InputQuantity
                                        {...field}
                                        value={value}
                                        onChange={(e) => {
                                            const numericValue = e.target.value.replace(/\D/g, "");
                                            onChange(numericValue);
                                        }}
                                        label="Quantidade de Disparos"
                                        tooltip={<Tooltip
                                            iconName="info"
                                            text="A quantidade de disparos é o número de 
                                            pessoas que receberão a mensagem"
                                        />}
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

export { CampaignForm };
