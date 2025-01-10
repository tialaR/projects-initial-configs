import { useEffect, useState } from "react";
import { MainTitle } from "#components/MainTitle";
import { Breadcrumb } from "#components/Breadcrumb";
import { routesNames } from "#utils/routesNames";
import { Button } from "#components/Button";
import { useContentSideMenu } from "#hooks/useContentSideMenu";
import { normalizeTableData } from "#utils/tableDataUtils";
import { DataListTable } from "#components/DataListTable";
import * as S from "./styles";
import { ProgressBar } from "#components/ProgressBar";
import { defaultTheme } from "#styles/themes/default";
import { formatPercentage } from "#utils/formatPercentage";
import { FullReportSummary } from "#components/FullReportSummary";
import { useCampaignReportDetail } from "#services/reports/useCampaignReportDetail";
import { getLocalSelectedEvent } from "#utils/localStorageItems";
import { useLocation } from "react-router-dom";
import { useCampaignLeadsList } from "#services/leads/useCampaignLeadsList";
import { ErrorMessage } from "#styles/components";
import { SkeletonBox } from "#components/SkeletonBox";
import React from "react";

const { REPORTS_AND_RESULTS, DETAIL_REPORTS_AND_RESULTS } = routesNames;

const ReportsAndResultsDetail: React.FC = () => {
    const { openContentSideMenu } = useContentSideMenu();

    const {
        data: reportData,
        loading: loadingReportDetail,
        error: errorReportDetail,
        fetchReport
    } = useCampaignReportDetail();

    const { fetchLeadsList } = useCampaignLeadsList();

    const [loadingLeadsId, setLoadingLeadsId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 100;

    const registeredEventId = getLocalSelectedEvent()?.registered_event_id;
    const location = useLocation();
    const campaignId = location.state?.reportCampaign?.campaign_id;
    const campaignName = location.state?.reportCampaign?.campaign_name;

    useEffect(() => {
        if (registeredEventId && campaignId) {
            fetchReport({ registered_event_id: registeredEventId, campaign_id: campaignId });
        }
    }, [registeredEventId, campaignId]);

    const handleOpenFullReport = ({ campaignContentId }: { campaignContentId: string }) => {
        openContentSideMenu(
            <FullReportSummary
                campaignContentId={campaignContentId}
            />
        )

    };

    const handleDownloadLeads = async ({ campaignContentId }: { campaignContentId: string }) => {
        if (registeredEventId && campaignContentId) {
            setLoadingLeadsId(campaignContentId);

            try {
                await fetchLeadsList({
                    registered_event_id: registeredEventId,
                    campaign_content_id: campaignContentId
                });
            } catch (error) {
                console.error("Erro ao baixar leads:", error);
            } finally {
                setLoadingLeadsId(null);
            }
        }
    };


    const formattedRowData = reportData?.[0]?.campaign_content?.map((content) => ({
        id: content.campaign_content_id,
        exhibitor: content.exhibitor_name,
        interactionPercentage: (
            <S.ProgressBarWrapper>
                <span>{formatPercentage(content.percent_leads_response)}</span>
                <ProgressBar
                    width={70}
                    color={defaultTheme.colors.primary.purple100}
                    percentage={content.percent_leads_response}
                />
            </S.ProgressBarWrapper>
        ),
        totalInteractions: content.leads_response ?? 0,
        deliveryPercentage: (
            <S.ProgressBarWrapper>
                <span>{formatPercentage(content.percent_leads_reached)}</span>
                <ProgressBar
                    width={70}
                    color={defaultTheme.colors.primary.purple100}
                    percentage={content.percent_leads_reached}
                />
            </S.ProgressBarWrapper>
        ),
        totalDeliveries: content.leads_reached_sent ?? 0,
        fullReport: (
            <Button variant="outline" onClick={() => handleOpenFullReport({ campaignContentId: content.campaign_content_id })} >
                Conferir
            </Button >
        ),
        contactsArchive: (
            <Button
                variant="outline"
                disabled={loadingLeadsId === content.campaign_content_id}
                onClick={() => handleDownloadLeads({ campaignContentId: content.campaign_content_id })}
            >
                {loadingLeadsId === content.campaign_content_id ? "Baixando..." : "Baixar Leads"}
            </Button>
        ),
    }));

    const { normalizedRows } = normalizeTableData(
        formattedRowData?.map((item) => ({
            id: item.id,
            row: [
                item.exhibitor,
                item.interactionPercentage,
                item.totalInteractions,
                item.deliveryPercentage,
                item.totalDeliveries,
                item.fullReport,
                item.contactsArchive
            ],
        })) || []
    );

    const columnsHead = [
        { id: 0, item: <span>Expositor</span> },
        { id: 1, item: <span>% de interação</span> },
        { id: 2, item: <span>Qtd. total de interação</span> },
        { id: 3, item: <span>% de entrega</span> },
        { id: 4, item: <span>Qtd. total de entrega</span> },
        { id: 5, item: <span>Relatório completo</span> },
        { id: 6, item: <span>Arquivo dos contatos</span> },
    ];

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const paginatedData = normalizedRows
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .map((item) => item.row);

    const renderReportDetails = ({ details }: { details: string[] }) => {
        if (loadingReportDetail) return <SkeletonBox />;

        if (!details || details.length === 0) {
            return <p>---</p>;
        }
        const hasEmptyValue = details.some(detail => !detail?.trim());
        if (hasEmptyValue) {
            return <p>---</p>;
        }

        return (
            <p>
                {details.map((detail, index) => (
                    <React.Fragment key={index}>
                        {detail}
                        {index < details.length - 1 && <br />}
                    </React.Fragment>
                ))}
            </p>
        );
    };


    if (errorReportDetail && !loadingReportDetail) {
        return (
            <div>
                <S.Header>
                    <Breadcrumb
                        items={[
                            { label: "Relatórios e resultados", href: REPORTS_AND_RESULTS },
                            { label: `${campaignName}`, href: DETAIL_REPORTS_AND_RESULTS }
                        ]}
                    />
                    <MainTitle>{campaignName}</MainTitle>
                </S.Header>

                {errorReportDetail && <ErrorMessage>{errorReportDetail}</ErrorMessage>}
            </div>
        )
    }

    return (
        <div>
            <S.Header>
                <Breadcrumb
                    items={[
                        { label: "Relatórios e resultados", href: REPORTS_AND_RESULTS },
                        { label: `${campaignName}`, href: DETAIL_REPORTS_AND_RESULTS }
                    ]}
                />
                <MainTitle>{campaignName}</MainTitle>
            </S.Header>
            <>
                <S.Section>
                    <S.Title>Detalhes da Campanha</S.Title>
                    <S.SpaceY32 />
                    <S.GridContainer>
                        <S.InfoBox>
                            <span>Telefone</span>
                            {renderReportDetails({ details: [String(reportData?.[0]?.phone_name), String(reportData?.[0]?.phone_number)] })}
                        </S.InfoBox>
                        <S.InfoBox>
                            <span>Template</span>
                            {renderReportDetails({ details: [String(reportData?.[0]?.template_name)] })}
                        </S.InfoBox>
                        <S.InfoBox>
                            <span>Data e hora</span>
                            {renderReportDetails({ details: [String(reportData?.[0]?.campaign_date), String(reportData?.[0]?.campaign_time)] })}
                        </S.InfoBox>
                        <S.InfoBox>
                            <span>Quantidade de disparos</span>
                            {renderReportDetails({
                                details: [String(reportData?.[0]?.leads_reached)]
                            })}{(reportData?.[0]?.leads_reached && !loadingReportDetail) ? <p> por expositor</p> : ""}
                        </S.InfoBox>
                    </S.GridContainer>
                </S.Section>
                <S.SpaceY32 />

                <DataListTable
                    title="Lista de expositores na campanha"
                    columns={columnsHead}
                    columnWidths={["24%", "12%", "12%", "12%", "12%", "14%", "14%"]}
                    hasSearchBar
                    searchPlaceholder="Pesquisar expositor"
                    isTableLoading={loadingReportDetail}
                    dataList={paginatedData}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalRows={normalizedRows.length}
                    handlePageChange={handlePageChange}
                />
            </>
        </div>
    );
};

export { ReportsAndResultsDetail };
