import { useState, useEffect } from 'react';
import axios from 'axios';

const useUrlLoder = (url: string, deps: any[] = []) => {
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        axios.get(url).then(res => {
            setData(res.data)
            setLoading(false)
        })
        console.log(deps, 'deps');

    }, deps)
    return [data, loading]
}
export default useUrlLoder
