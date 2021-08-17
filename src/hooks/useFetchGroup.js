import { getGroup } from "../services/group-services"
import { useState, useEffect } from "react";

export function useFetchGroup(groupId){
    
    const [group, setGroup] = useState(null);
    const [loading, setloading] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const getData = async () => {
            setloading(true);
            const data = await getGroup(groupId);
            setGroup(data);
            setloading(false);
        }
        getData();
      
    },[groupId])

    return [group, loading, error]
}