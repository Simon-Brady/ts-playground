import { useState, useEffect } from "react";
import axios from "axios";
import { resolveError } from "../../components/utils";

const useHistoricalData = ({ checkedSymbols, dateRange }) => {
  const [isFetching, setIsFetching] = useState(true);
  const [historicalData, setHistoricalData] = useState(null);
  const [isErrored, setIsErrored] = useState(false);

  // Standardize Date Values to YYYY-MM-DD
  let dateQuery = dateRange.map((dateValue) =>
    dateValue.toLocaleDateString("en-GB").split("/").reverse().join("-")
  );

  console.log(dateQuery);

  /* 
		On Symbol Query/Date Range change, validate selected symbols and query the API
	 	returns object of dates with desired symbols per date.
		 eg: 
		 {
			"2018-01-02": {
				"WMT": {
					"ticker": "WMT",
					"name": "Walmart",
					"close": "98.59",
					"open": "99.30",
					"day_range": "1.27"
				},
				"TGT": {
					"ticker": "TGT",
					"name": "Target",
					"close": "67.63",
					"open": "65.95",
					"day_range": "2.18"
				}
			}, 
			...
		 }
		 Also has access to fetching flag and error state
	*/
  useEffect(() => {
    if (dateRange.length === 2) {
      let symbolQuery = false;
      setIsFetching(true);
      if (
        checkedSymbols &&
        Object.keys(checkedSymbols).length &&
        dateQuery.length
      ) {
        const symbolKeys = Object.keys(checkedSymbols);
        const validSymbols = symbolKeys.filter((symbol) => symbol);
        validSymbols.forEach(
          (checkedSymbol) =>
            (symbolQuery = symbolQuery
              ? symbolQuery + `,${checkedSymbol.toLowerCase()}`
              : checkedSymbol.toLowerCase())
        );
      }
      axios
        .get(
          `https://ce-test-api.fly.dev/api/historical/?ticker=${symbolQuery}&from=${dateQuery[0]}&to=${dateQuery[1]}`,
          {
            headers: { "api-token": "1337-time" },
          }
        )
        .then((response) => {
          setHistoricalData(response.data);
          setIsFetching(false);
        })
        .catch((error) => {
          setIsFetching(false);
          console.log("error?");
          resolveError({ setErrorMethod: setIsErrored, errorResponse: error });
        });
    }
  }, [checkedSymbols, dateRange]);

  return { historicalData, isErrored, isFetching, checkedSymbols };
};

export default useHistoricalData;
