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

export type FormValues = {
    exhibitorName: string;
    exhibitorDescription: string;
    exhibitorContactName: string;
    exhibitorPhone: string;
};

type ConfigurateCampaignFormProps = {
    children?: React.ReactNode;
    selectedEngine: EngineOption | null;
    campaignName: string
}

const { FOLLOW_CAMPAIGN } = routesNames;

const CampaignForm: React.FC<ConfigurateCampaignFormProps> = ({
    children,
    selectedEngine,
    campaignName,
}) => {
    const navigate = useNavigate();
    const { openContentSideMenu, closeContentSideMenu } = useContentSideMenu();

    const { control, handleSubmit } = useForm<FormValues>({
        defaultValues: {
            exhibitorName: "",
            exhibitorDescription: "",
            exhibitorContactName: "",
            exhibitorPhone: "",
        },
        mode: "onChange",
    });

    const { isValid } = useFormState({ control });

    const isFormValid = isValid && selectedEngine && campaignName;

    const isFormDataComplete = (
        formData: FormValues
    ) => {
        return (
            !!formData.exhibitorName &&
            !!formData.exhibitorDescription &&
            !!formData.exhibitorPhone &&
            !!formData.exhibitorContactName &&
            !!selectedEngine &&
            !!campaignName
        );
    };

    const openSummary = (data: FormValues) => {

        const updatedFormData = {
            ...data,
            selectedEngine: selectedEngine?.label ?? '',
            campaignName,
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
            />);
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
                            render={({ field }) => {
                                const { onChange } = field;
                                return (
                                    <Input
                                        {...field}
                                        onChange={onChange}
                                        label="Nome do expositor"
                                        placeholder="Digite o nome aqui"
                                        maxLength={200}
                                    />
                                )
                            }}
                        />
                    </S.FieldContainer>
                </S.FormLineWrapper>

                <S.FormLineWrapper>
                    <S.FieldContainer>
                        <Controller
                            name="exhibitorDescription"
                            control={control}
                            render={({ field }) => {
                                const { onChange } = field;
                                return (
                                    <Input
                                        {...field}
                                        onChange={onChange}
                                        label="Nome do expositor"
                                        placeholder="Digite a descrição aqui"
                                        maxLength={400}
                                    />
                                )
                            }}
                        />
                    </S.FieldContainer>
                </S.FormLineWrapper>

                <S.FormLineWrapper>
                    <S.FieldContainer>
                        <Controller
                            name="exhibitorContactName"
                            control={control}
                            render={({ field }) => {
                                const { onChange } = field;
                                return (
                                    <Input
                                        {...field}
                                        onChange={onChange}
                                        label="Nome do contato do Expositor"
                                        placeholder="Digite o nome aqui"
                                        maxLength={200}
                                    />
                                )
                            }}
                        />
                    </S.FieldContainer>
                    <S.FieldContainer>
                        <Controller
                            name="exhibitorPhone"
                            control={control}
                            render={({ field }) => {
                                const { onChange } = field;
                                return (
                                    <Input
                                        {...field}
                                        onChange={onChange}
                                        label="Telefone do contato do Expositor (whatsApp)"
                                        placeholder="Digite o telefone aqui"
                                        maxLength={400}
                                    />
                                )
                            }}
                        />
                    </S.FieldContainer>
                </S.FormLineWrapper>

                <InsertFile />
            </S.FormWrapper>
            <S.Footer>
                <Button variant="primary-outline">
                    Salvar campanha
                </Button>
                <Button disabled={!isFormValid} variant="primary" type="submit">
                    Ativar campanha
                </Button>
            </S.Footer>
        </S.FormContainer>
    );
};

export { CampaignForm };
