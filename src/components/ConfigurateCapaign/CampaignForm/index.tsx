import { useEffect, useState } from "react";
import { useForm, Controller, useFormState } from "react-hook-form";
import { Input } from "#components/Input";
import { Button } from "#components/Button";
import { useContentSideMenu } from "#hooks/useContentSideMenu";
import { CampaignSummary } from "#components/ConfigurateCapaign/CampaignSummary";
import { CampaignSuccess } from "#components/ConfigurateCapaign/CampaignSuccess";
import { InsertFile } from "#components/ConfigurateCapaign/InsertFile";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import { routesNames } from "#utils/routesNames";
import { EngineOption } from "#components/SelectByEngine";
import { CampaignData } from "#pages/ConfigureCampaign";
import { useSaveCampaignDetails } from "#services/campaign/useSaveCampaignDetails";
import { getLocalSelectedEvent } from "#utils/localStorageItems";
import { ErrorMessage } from "#styles/components";

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
};

const { FOLLOW_CAMPAIGN } = routesNames;

const CampaignForm: React.FC<ConfigurateCampaignFormProps> = ({
    children,
    selectedEngine,
    campaignData,
}) => {
    const navigate = useNavigate();
    const { openContentSideMenu, closeContentSideMenu } = useContentSideMenu();
    const { error: saveCampaignDetailsError, saveCampaignDetails } = useSaveCampaignDetails();

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const { control, handleSubmit, reset } = useForm<FormValues>({
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

    const { isValid } = useFormState({ control });

    const isFormValid = isValid && selectedEngine && campaignData?.campaignName;

    const isFormDataComplete = (formData: FormValues) => {
        return (
            !!formData.exhibitorName &&
            !!formData.exhibitorDescription &&
            !!formData.exhibitorPhone &&
            !!formData.exhibitorContactName &&
            !!selectedEngine &&
            !!campaignData?.campaignName
        );
    };

    const openSummary = (data: FormValues) => {
        const updatedFormData = {
            ...data,
            selectedEngine: selectedEngine?.label ?? "",
            campaignName: campaignData?.campaignName,
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
                onConfirm={() => {
                    navigate(FOLLOW_CAMPAIGN);
                    closeContentSideMenu();
                }}
            />
        );
    };

    const registeredEventId = getLocalSelectedEvent()?.registered_event_id;

    const handleSaveCampaignDetails = () => {
        saveCampaignDetails({
            registered_event_id: registeredEventId || "",
            campaign_content_id: campaignData?.campaignContentId || "",
            exhibitor_name: campaignData?.exhibitorName || "",
            exhibitor_description: campaignData?.exhibitorDescription || "",
            exhibitor_contact_name: campaignData?.exhibitorContactName || "",
            exhibitor_contact_number: campaignData?.exhibitorContactNumber || "",
            leadster_ml_engine: selectedEngine?.label || "",
            exhibitor_file: selectedFile || null,
        });
    };

    return (
        <S.FormContainer onSubmit={handleSubmit(openSummary)}>
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
                                    placeholder="Digite o nome aqui"
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
                                <Input
                                    {...field}
                                    label="Descrição"
                                    placeholder="Digite a descrição aqui"
                                    maxLength={400}
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
                                    placeholder="Digite o nome aqui"
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
                                    placeholder="Digite o telefone aqui"
                                    maxLength={400}
                                />
                            )}
                        />
                    </S.FieldContainer>
                </S.FormLineWrapper>

                <InsertFile existingFile={selectedFile} onFileSelect={setSelectedFile} />
            </S.FormWrapper>

            <S.Footer>
                <Button disabled={!isFormValid} variant="primary-outline" onClick={handleSaveCampaignDetails}>Salvar campanha</Button>

                {/* TBD -> Wait backend develop this feature   */}
                { /*<Button disabled={!isFormValid} variant="primary" type="submit"> */}
                <Button disabled variant="primary" type="submit">
                    Ativar campanha
                </Button>
            </S.Footer>
            <ErrorMessage>
                {saveCampaignDetailsError
                    && 'Erro ao tentar Salvar campanha: '
                    + saveCampaignDetailsError}
            </ErrorMessage>
        </S.FormContainer>
    );
};

export { CampaignForm };
