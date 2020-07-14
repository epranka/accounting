import React, { memo } from "react";
import { useParams, Link } from "@reach/router";
import styled from "styled-components";

const S = {};

const renderTitle = (title) => {
    if (typeof title === "function") {
        const Component = title;
        return <Component />;
    } else {
        return title;
    }
};

const Breadcrumbs = ({ breadcrumbs }) => {
    const params = useParams();
    const breadcrumbsItems = breadcrumbs(params);

    let key = 0;
    return (
        <S.Breadcrumbs>
            {breadcrumbsItems.map((breadcrumb, index) => {
                const result = [];
                if (index !== breadcrumbsItems.length) {
                    result.push(<S.Separator key={key++}>{"/"}</S.Separator>);
                }

                if (breadcrumb.link) {
                    result.push(
                        <S.Breadcrumb key={key++}>
                            <Link to={breadcrumb.link}>
                                {renderTitle(breadcrumb.title)}
                            </Link>
                        </S.Breadcrumb>
                    );
                } else {
                    result.push(
                        <S.Breadcrumb key={key++}>
                            {renderTitle(breadcrumb.title)}
                        </S.Breadcrumb>
                    );
                }
                return result;
            })}
        </S.Breadcrumbs>
    );
};

S.Breadcrumbs = styled.div`
    font-size: 14px;
    color: #5d5d5d;
`;

S.Breadcrumb = styled.span`
    margin-right: 5px;

    a {
        text-decoration: none;
        color: inherit;
    }
`;

S.Separator = styled.span`
    margin-right: 5px;
    font-weight: 500;
`;

export default memo(Breadcrumbs);
