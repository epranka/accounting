import React, { memo } from "react";
import styled from "styled-components";
import { Router } from "@reach/router";
import routes from "../routes";
import Breadcrumbs from "./Breadcrumbs";

const S = {};

const PageHeader = () => {
    return (
        <S.PageHeader>
            <div className="container">
                <Router primary={false}>
                    {routes.map((Route, key) => {
                        return (
                            <Breadcrumbs
                                key={key}
                                path={Route.path}
                                breadcrumbs={Route.breadcrumbs}
                            />
                        );
                    })}
                </Router>
            </div>
        </S.PageHeader>
    );
};

S.PageHeader = styled.div`
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: #d8d8d8;
    height: 200px;
    padding-top: 100px;
`;

export default memo(PageHeader);
