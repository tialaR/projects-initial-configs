import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DefaultLayout } from '#layouts/DefaultLayout';
// import { Dashboard } from '#pages/Dashboard';
import { GeneralCampaign } from '#pages/GeneralCampaign';
// import { PreFireCampaign } from '#pages/PreFireCampaign';
import { CreateCampaigns } from '#pages/CreateCampaigns';
// import { FollowCampaign } from '#pages/FollowCampaign';
import { ReportsAndExports } from '#pages/ReportsAndExports';
import { CenterModalProvider } from '#hooks/useCenterModal';
import { LoginFirstEvent } from '#pages/LoginFirstEvent';
import { ContentSideMenuProvider } from '#hooks/useContentSideMenu';
import { routesNames } from '#utils/routesNames';

const {
    LOGIN_FIRST_EVENT,
    GENERAL_CAMPAIGN,
    CREATE_CAMPAIGN,
    EXHIBITOR_CAMPAIGN,
    FOLLOW_CAMPAIGN,
    REPORTS_AND_RESULTS,
} = routesNames;

const RouterConfig: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/'
                    element={
                        <ContentSideMenuProvider>
                            <DefaultLayout />
                        </ContentSideMenuProvider>}
                >
                    <Route
                        index
                        path={LOGIN_FIRST_EVENT}
                        element={<LoginFirstEvent />}
                    />
                    <Route
                        path={GENERAL_CAMPAIGN}
                        element={<GeneralCampaign />}
                    />
                    <Route path={CREATE_CAMPAIGN}
                        element={
                            <CenterModalProvider>
                                <CreateCampaigns />
                            </CenterModalProvider>
                        }
                    />
                    <Route
                        path={EXHIBITOR_CAMPAIGN}
                        element={<>Expositor</>}
                    />
                    <Route path={FOLLOW_CAMPAIGN} element={<>Acompanhar</>} />
                    <Route path={REPORTS_AND_RESULTS} element={<ReportsAndExports />} />
                </Route>
            </Routes>
        </BrowserRouter >
    );
};

export { RouterConfig };
