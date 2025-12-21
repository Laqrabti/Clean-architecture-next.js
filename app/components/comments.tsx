"use client"

import { useCallback, useEffect, useMemo, useState } from "react"

interface Comments {
    id: number,
    data: string,
    Author: string
}

export const CommentsComponent = () => {
    const [comments, setComments] = useState<Comments[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const fetchComments = useCallback(
        async () => {
              setLoading(true)
              setError(null)

            try {
            const response = await fetch("api/comments")
            if (!response.ok) throw new Error(`Error fetching comments`)

            const fetchedComments = await response.json()
            setComments(fetchedComments)
            } catch (error) {
                setError(error instanceof Error ? error.message : "failed to fetch from the db")
                console.error("Fetch error:", error)
            } finally {
                setLoading(false)
            }
        }
    , [])


    useEffect(() => {
        fetchComments()
    }, [fetchComments])

    return (
        <div>
            {loading && <p>loading comments ...</p> }
            {error && <p>{error}</p> }
            {comments.map((comment) => 
                    <div key={comment.id}>
                      <p> {comment.id}</p>
                       <div>{comment.data}</div>
                    </div>     
            )}
        </div>
    )
}