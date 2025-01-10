import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DefaultLayout } from '#layouts/DefaultLayout';
// import { Dashboard } from '#pages/Dashboard';
import { PreFireCampaign } from '#pages/PreFireCampaign';
import { CreateCampaigns } from '#pages/CreateCampaigns';
import { FollowCampaign } from '#pages/FollowCampaign';
import { ReportsAndExports } from '#pages/ReportsAndExports';
import { CenterModalProvider } from '#hooks/useCenterModal';
import { LoginFirstEvent } from '#pages/LoginFirstEvent';
import { ContentSideMenuProvider } from '#hooks/useContentSideMenu';

const RouterConfig: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <ContentSideMenuProvider>
                        <DefaultLayout />
                    </ContentSideMenuProvider>}
                >
                    <Route
                        index
                        element={<LoginFirstEvent />}
                    />
                    <Route path="criar-campanha" element={
                        <CenterModalProvider>
                            <CreateCampaigns />
                        </CenterModalProvider>
                    }
                    />
                    <Route
                        path="campanha-pre-disparo"
                        element={<PreFireCampaign />}
                    />

                    <Route path="acompanhar-campanha" element={<FollowCampaign />} />
                    <Route path="relatorios-e-exportacoes" element={<ReportsAndExports />} />
                </Route>
            </Routes>
        </BrowserRouter >
    );
};

export { RouterConfig };
