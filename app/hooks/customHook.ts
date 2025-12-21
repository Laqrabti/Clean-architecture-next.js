import { useEffect, useMemo, useState } from "react";

export const CommentPage = () => {
    const [comments, setComemnts] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setiIsloading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setiIsloading(true)
            setError(null)
            try {
                const response = await fetch(`api/users`)
                if (!response.ok) {
                    throw new Error(`http: ${response.status}`)
                }
                const data = await response.json()
                setComemnts(data)
            } catch (error) {
                setError(error instanceof Error ? error.message : null)
            } finally {
                setiIsloading(false)
            }
        }
        fetchData()

        const memoizedValue = useMemo(() => {
            return comments.length
        }, [comments])

        console.warn(memoizedValue)
        
        
         //     const handleFetchComments = async () => {
        //     setiIsloading(true)
        //     setError(null)

        //     try {
        //         fetch(`api/comments`)
        //         .then(response => response.json())
        //         .then(data => setComemnts(data))
        //      } catch (error) {
        //         throw new Error("Encountering error of type: ", error.message)
        //      } finally {
        //         setiIsloading(false)
        //      }
        // }


       
 }, [])
}


