import React, { memo } from "react";
import { Router } from "@reach/router";
import routes from "../routes";

const Page = () => {
    return (
        <Router>
            {routes.map((Route, key) => {
                return <Route.Component key={key} path={Route.path} />;
            })}
        </Router>
    );
};

export default memo(Page);
