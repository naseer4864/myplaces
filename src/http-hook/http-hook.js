import { useState, useCallback, useRef, useEffect } from "react";


export const useHttpClient = () => {
    const [error, setError] = useState(false);
    const [isLoading, setIsloading] = useState(false);

    const activeHttpRequest = useRef([])

    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setIsloading(true);

        const httpAbortCtrll = new AbortController()
        activeHttpRequest.current.push(httpAbortCtrll);

        try {
            const response = await fetch(url, {
                method,
                body,
                headers,
                signal: httpAbortCtrll.signal
            });
            setIsloading(false);

            const responseData = await response.json();

            activeHttpRequest.current = activeHttpRequest.current.filter(reqCtrll => reqCtrll !== httpAbortCtrll);

            if(!response.ok){
                throw new Error(responseData.message);
            }
        } catch (error) {
            setError(error.message);
            throw error;
        }
        setIsloading(false)
    }, []);


    useEffect(() => {
        return () => {
            activeHttpRequest.current.forEach(abortCtrll => abortCtrll.abort())
        }
    }, [])

    return {isLoading, error, sendRequest,}
}