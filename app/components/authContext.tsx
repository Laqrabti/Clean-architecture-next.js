import { useCallback, useEffect, useState } from "react";

interface User {
    username: string,
    age: number
}

export const Mycomponent = ({userID}: {userID: string}) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<User>({
        username: "hassan",
        age: 23
    })
    

    const fetchData = useCallback( async () => {
            setLoading(true)

            try {
                await new Promise(resolve => setTimeout(resolve, 500))
                const response = await fetch(`api/users/${userID}`) 
                const data =  await response.json()
                setData(data)
                setLoading(false)
            } catch (error) {
                console.error("fetch failed:", error)
            } finally {
                setLoading(false)
            }
            
    }, [userID])

    useEffect(() => {
        fetchData()

        return 
    }, [userID])

}