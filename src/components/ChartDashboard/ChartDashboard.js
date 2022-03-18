import React from "react";
import { Loader } from "../Loader";
import { useSymbols } from "../../hooks/useSymbols";
import { Chart, HeatmapChart } from "../Charts";
import styled from "@emotion/styled";
import exampleSymbols from "../../fixtures/exampleSymbols.json";

const StyledDashboardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  &&.ce-center {
    height: 100vh;
    justify-content: center;
    align-items: center;
  }
`;

const ChartDashboard = () => {
  const { symbols, isErrored } = useSymbols();
  return (
    <StyledDashboardContainer
      className={`${isErrored || !symbols ? "ce-center" : "ce-chart"}`}
    >
      {symbols.length && !isErrored ? (
        symbols.map((symbol, key) => (
          <>
            <Chart
              key={key}
              symbols={symbols || exampleSymbols}
              symbol={symbol}
            />
          </>
        ))
      ) : (
        <>
          {isErrored ? (
            <p>Whoops! Looks like I can't find symbol data :(</p>
          ) : (
            <Loader />
          )}
        </>
      )}
      {/* <HeatmapChart /> */}
    </StyledDashboardContainer>
  );
};

export default ChartDashboard;
