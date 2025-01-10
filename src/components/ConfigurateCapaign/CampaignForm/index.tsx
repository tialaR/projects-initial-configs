import { useEffect, useState } from "react";
import { useForm, Controller, useFormState } from "react-hook-form";
import { Input } from "#components/Input";
import { Button } from "#components/Button";
import { useContentSideMenu } from "#hooks/useContentSideMenu";
import { CampaignSummary } from "#components/ConfigurateCapaign/CampaignSummary";
import { CampaignSuccess } from "#components/ConfigurateCapaign/CampaignSuccess";
import { InsertFile } from "#components/InsertFile";
import { useNavigate } from "react-router-dom";
import { routesNames } from "#utils/routesNames";
import { CampaignData } from "#pages/ConfigureCampaign";
import { useSaveCampaignDetails } from "#services/campaign/useSaveCampaignDetails";
import { getLocalSelectedEvent } from "#utils/localStorageItems";
import { ErrorMessage } from "#styles/components";
import * as S from "./styles";
import { EngineOption } from "#utils/formatEngineValueToLabel";
import { formatPhoneNumberWithExtraPrefix } from "#utils/formatPhone";
import { removeSpecialCharsAndSpaces } from "#utils/removeSpecialCharsAndSpaces ";
import { TextArea } from "#components/TextArea";

export type FormValues = {
    exhibitorName: string;
    exhibitorDescription: string;
    exhibitorContactName: string;
    exhibitorPhone: string;
};

type ConfigurateCampaignFormProps = {
    children?: React.ReactNode;
    selectedEngine: EngineOption | null;
    campaignData: CampaignData | null;
    loadingCampaignData?: boolean;
};

const { FOLLOW_CAMPAIGN } = routesNames;

const CampaignForm: React.FC<ConfigurateCampaignFormProps> = ({
    children,
    selectedEngine,
    campaignData,
    loadingCampaignData = false,
}) => {
    const navigate = useNavigate();
    const { openContentSideMenu, closeContentSideMenu } = useContentSideMenu();
    const {
        loading: loadingSaveCampaignDetails,
        error: saveCampaignDetailsError,
        saveCampaignDetails
    } = useSaveCampaignDetails();
    const registeredEventId = getLocalSelectedEvent()?.registered_event_id;
    const registeredEventName = getLocalSelectedEvent()?.event_name;

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const { control, handleSubmit, reset, watch } = useForm<FormValues>({
        defaultValues: {
            exhibitorName: "",
            exhibitorDescription: "",
            exhibitorContactName: "",
            exhibitorPhone: "",
        },
        mode: "onChange",
    });

    useEffect(() => {
        if (campaignData) {
            reset({
                exhibitorName: campaignData.exhibitorName || "",
                exhibitorDescription: campaignData.exhibitorDescription || "",
                exhibitorContactName: campaignData.exhibitorContactName || "",
                exhibitorPhone: campaignData.exhibitorContactNumber || "",
            });

            setSelectedFile(campaignData.exhibitorFile || null);
        }
    }, [campaignData, reset]);

    const formValues = watch();
    const { isValid } = useFormState({ control });

    // Verify if the form is valid when all required fields are filled
    const isFormValid = isValid &&
        !!selectedEngine &&
        !!selectedFile &&
        !!formValues.exhibitorName &&
        !!formValues.exhibitorDescription &&
        !!formValues.exhibitorPhone &&
        !!formValues.exhibitorContactName &&
        !!campaignData?.campaignName;

    const onSubmit = (data: FormValues, actionType: "save" | "activate") => {
        function formatDDIPhoneNumber(phoneNumber: string) {
            const cleanCharsPhone = removeSpecialCharsAndSpaces(phoneNumber);
            if (cleanCharsPhone.startsWith('55')) {
                return cleanCharsPhone;
            } else {
                return phoneNumber.length > 0 ? `${'55'}${cleanCharsPhone}` : phoneNumber;
            }
        }

        const dataToActivateCampaign = {
            registered_event_id: registeredEventId || "",
            event_name: registeredEventName || "",
            campaign_content_id: campaignData?.campaignContentId || "",
            campaign_name: campaignData?.campaignName || "",
            exhibitor_id: campaignData?.exhibitorId || "",
            template_id: campaignData?.templateId || "",
            event_phone_number: campaignData?.phoneContactNumber || '',
            leads_reached: String(campaignData?.leadsReached) || "",
            launch_datetime: `${campaignData?.campaignDate} ${campaignData?.campaignTime}`,
            engine: selectedEngine?.value || "",
            exhibitor_name: data.exhibitorName || campaignData?.exhibitorName || "",
            exhibitor_description: data.exhibitorDescription || campaignData?.exhibitorDescription || "",
            exhibitor_contact_name: data.exhibitorContactName || campaignData?.exhibitorContactName || "",
            exhibitor_contact_phone:
                formatDDIPhoneNumber(data.exhibitorPhone)
                || campaignData?.exhibitorContactNumber || "",
        };

        const dataToSaveCampaign = {
            registered_event_id: registeredEventId || "",
            campaign_content_id: campaignData?.campaignContentId || "",
            exhibitor_name: data.exhibitorName || campaignData?.exhibitorName || "",
            exhibitor_description: data.exhibitorDescription || campaignData?.exhibitorDescription || "",
            exhibitor_contact_name: data.exhibitorContactName || campaignData?.exhibitorContactName || "",
            event_phone_number: campaignData?.phoneContactNumber || '',
            exhibitor_contact_number:
                formatDDIPhoneNumber(data.exhibitorPhone)
                || campaignData?.exhibitorContactNumber || "",
            leadster_ml_engine: selectedEngine?.value || "",
            exhibitor_file: selectedFile || null,
        };

        if (actionType === "save") {
            // Save campaign details
            saveCampaignDetails(dataToSaveCampaign);
        } else {
            // Activate campaign
            openContentSideMenu(
                <CampaignSummary
                    data={dataToActivateCampaign}
                    onCancel={closeContentSideMenu}
                    onConfirm={openSuccess}
                />
            );
        }
    };

    const openSuccess = () => {
        openContentSideMenu(
            <CampaignSuccess
                onConfirm={() => {
                    navigate(FOLLOW_CAMPAIGN);
                    closeContentSideMenu();
                }}
            />
        );
    };

    const loadingPlaceholderText = ({
        loadingText,
        finalText,
    }: {
        loadingText: string;
        finalText: string;
    }) => {
        return loadingCampaignData ? loadingText : finalText;
    }

    return (
        <S.FormContainer onSubmit={(e) => e.preventDefault()}>
            {children}

            <S.FormWrapper>
                <S.FormHeader>
                    <S.FormTitle>Conteúdos da Campanha</S.FormTitle>
                </S.FormHeader>

                <S.FormLineWrapper>
                    <S.FieldContainer>
                        <Controller
                            name="exhibitorName"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label="Nome do expositor"
                                    placeholder={loadingPlaceholderText({
                                        loadingText: "Carregando nome...",
                                        finalText: "Digite o nome aqui",
                                    })}
                                    maxLength={200}
                                />
                            )}
                        />
                    </S.FieldContainer>
                </S.FormLineWrapper>

                <S.FormLineWrapper>
                    <S.FieldContainer>
                        <Controller
                            name="exhibitorDescription"
                            control={control}
                            render={({ field }) => (
                                <TextArea
                                    {...field}
                                    label="Descrição"
                                    placeholder={loadingPlaceholderText({
                                        loadingText: "Carregando descrição...",
                                        finalText: "Digite a descrição aqui",
                                    })}
                                    maxLength={1000}
                                />
                            )}
                        />
                    </S.FieldContainer>
                </S.FormLineWrapper>

                <S.FormLineWrapper>
                    <S.FieldContainer>
                        <Controller
                            name="exhibitorContactName"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label="Nome do contato do Expositor"
                                    placeholder={loadingPlaceholderText({
                                        loadingText: "Carregando nome...",
                                        finalText: "Digite o nome aqui",
                                    })}
                                    maxLength={200}
                                />
                            )}
                        />
                    </S.FieldContainer>

                    <S.FieldContainer>
                        <Controller
                            name="exhibitorPhone"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label="Telefone do contato do Expositor (WhatsApp)"
                                    placeholder={loadingPlaceholderText({
                                        loadingText: "Carregando telefone...",
                                        finalText: "Digite o telefone aqui",
                                    })}
                                    maxLength={19}
                                    value={formatPhoneNumberWithExtraPrefix(field.value)}
                                    onChange={(value: any) => {
                                        field.onChange(value);
                                    }}
                                />
                            )}
                        />
                    </S.FieldContainer>
                </S.FormLineWrapper>

                <InsertFile
                    existingFile={selectedFile}
                    loadingFileText={loadingPlaceholderText({
                        loadingText: "Carregando arquivo...",
                        finalText: "Inserir Arquivo",
                    })}
                    onFileSelect={setSelectedFile}
                />
            </S.FormWrapper>

            <S.Footer>
                <Button
                    disabled={loadingSaveCampaignDetails}
                    type="button"
                    variant="primary-outline"
                    onClick={handleSubmit((data) => onSubmit(data, "save"))}
                >
                    {loadingSaveCampaignDetails ? "Salvando..." : "Salvar campanha"}
                </Button>

                <Button
                    disabled={!isFormValid}
                    type="button"
                    variant="primary"
                    onClick={handleSubmit((data) => onSubmit(data, "activate"))}
                >
                    Ativar campanha
                </Button>
            </S.Footer>
            <ErrorMessage>
                {saveCampaignDetailsError && `Erro ao tentar Salvar campanha: ${saveCampaignDetailsError}`}
            </ErrorMessage>
        </S.FormContainer>
    );
};

export { CampaignForm };
