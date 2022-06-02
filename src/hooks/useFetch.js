import React, { useEffect, useState } from "react";

const useFetch = (apiMethod, ...param) => {
	const [response, setResponse] = useState(null);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (param) {
					const res = await apiMethod(...param);
					setResponse(res);
				} else {
					const res = await apiMethod();
					setResponse(res);
				}
			} catch (error) {
				setError(error);
			}
			setIsLoading(false);
		};
		fetchData();
	}, [apiMethod]);

	return { response, error, isLoading };
};

export default useFetch;
