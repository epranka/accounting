import React, { memo } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Page from "./components/Page";
import PageHeader from "./components/PageHeader";
import { DataProvider } from "./mock/DataProvider";

const S = {};

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Rubik', sans-serif;
    padding: 0;
    margin: 0;
    background: #f9f9f9;
  }

  * {
    box-sizing: border-box;
  }
`;

function App() {
    return (
        <>
            <DataProvider>
                <S.App>
                    <S.Header />
                    <S.Page>
                        <PageHeader />
                        <Page />
                    </S.Page>
                </S.App>
            </DataProvider>
            <GlobalStyles />
        </>
    );
}

S.App = styled.div``;

S.Header = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: black;
    z-index: 9999;
`;

S.Page = styled.div`
    position: relative;
    padding-top: 200px;
    padding-bottom: 200px;
`;

export default memo(App);
