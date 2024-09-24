import { useEffect } from 'react';

const useFetch = (apiUrl) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // const response = fetch(`${apiUrl}`, {
    //     method: 'GET',
    //     headers: {
    //         Authorization: `Bearer ${Cookies.get('Access-Token')}`,
    //     },
    // });

    useEffect(() => {
        const fetchData = async () => {};
        fetchData();
    }, []);

    return { data, error, loading };
};

export default useFetch;
