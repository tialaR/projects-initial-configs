import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routesNames } from "#utils/routesNames";
import { DefaultLayout } from "#layouts/DefaultLayout";
import { GeneralCampaign } from "#pages/GeneralCampaign";
import { CreateCampaigns } from "#pages/CreateCampaigns";
import { ExhibitorCampaign } from "#pages/ExhibitorCampaign";
import { ConfigureCampaign } from "#pages/ConfigureCampaign";
import { LoginFirstEvent } from "#pages/LoginFirstEvent";
import { ContentSideMenuProvider } from "#hooks/useContentSideMenu";
import { FollowCampaign } from "#pages/FollowCampaign";
import { ReportsAndResults } from "#pages/ReportsAndResults";
import { ReportsAndResultsDetail } from "#pages/ReportsAndResultsDetail";
import { CustomRoute } from "./CustomRoute";
import { NotFound } from "#pages/NotFound";
import { RouteWatcher } from "./RouteWatcher";
import { ToastInfoProvider } from "#hooks/useToastInfo";

const {
    LOGIN_FIRST_EVENT,
    GENERAL_CAMPAIGN,
    CREATE_CAMPAIGN,
    EXHIBITOR_CAMPAIGN,
    CONFIGURE_CAMPAIGN,
    FOLLOW_CAMPAIGN,
    REPORTS_AND_RESULTS,
    DETAIL_REPORTS_AND_RESULTS
} = routesNames;

const RouterConfig: React.FC = () => {
    return (
        <BrowserRouter>
            <ToastInfoProvider>
                <RouteWatcher />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ContentSideMenuProvider>
                                <DefaultLayout />
                            </ContentSideMenuProvider>
                        }
                    >
                        <Route index path={LOGIN_FIRST_EVENT} element={<LoginFirstEvent />} />

                        <Route path={GENERAL_CAMPAIGN} element={<CustomRoute isPrivate element={GeneralCampaign} />} />
                        <Route path={CREATE_CAMPAIGN} element={<CustomRoute isPrivate element={CreateCampaigns} />} />
                        <Route path={EXHIBITOR_CAMPAIGN} element={<CustomRoute isPrivate element={ExhibitorCampaign} />} />
                        <Route path={CONFIGURE_CAMPAIGN} element={<CustomRoute isPrivate element={ConfigureCampaign} />} />
                        <Route path={FOLLOW_CAMPAIGN} element={<CustomRoute isPrivate element={FollowCampaign} />} />
                        <Route path={REPORTS_AND_RESULTS} element={<CustomRoute isPrivate element={ReportsAndResults} />} />
                        <Route path={DETAIL_REPORTS_AND_RESULTS} element={<CustomRoute isPrivate element={ReportsAndResultsDetail} />} />

                        {/* Route 404 for pages that don't exist */}
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </ToastInfoProvider>
        </BrowserRouter>
    );
};

export { RouterConfig };
