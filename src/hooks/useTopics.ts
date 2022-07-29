import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react'
import { fetchTopics } from '../lib/topics'
import { Topic } from '../types/topics'

export const useTopics = (pageKey: number, status: 'next' | 'prev' | undefined, position: number, max: number) => {

  const [searchTopics, setSearchTopics] = useState(true)
  const queryClient = useQueryClient();
  const nextPosition = position + max

  useEffect(() => {
    queryClient.prefetchQuery(['topics', pageKey + 1], () => fetchTopics('next', nextPosition, max)).then(() => {
      const nextTopics = queryClient.getQueryData(['topics', pageKey + 1]) as Topic[]
      const topicsCheck = nextTopics.length !== 0
      setSearchTopics(topicsCheck)
    })
  }, [queryClient, pageKey, nextPosition, max])


  const fallback: Topic[] = []
  const { data: topics = fallback } = useQuery(['topics', pageKey], () => fetchTopics(status, position, max), {
    keepPreviousData: true,
  })
  return { topics, searchTopics }
}