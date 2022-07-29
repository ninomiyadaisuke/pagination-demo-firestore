import { topicRef } from '../firebase/index'
import { Topic } from '../types/topics'
import { getDocs, query, limit, orderBy, startAfter, endBefore, limitToLast } from 'firebase/firestore'

export const fetchTopics = async (status: 'next' | 'prev' | undefined, position: number, max: number) => {
  const first = query(topicRef, orderBy('topicId'), limit(max))
  const next = query(topicRef, orderBy('topicId'), limit(max), startAfter(position))
  const prev = query(topicRef, orderBy('topicId'), limitToLast(max), endBefore(position))

  const check = status === 'next' ? next : status === undefined ? first : prev


  return await getDocs(check).then((snapshots) => {
    const topics: Topic[] = []
    snapshots.forEach((doc) => {
      topics.push(doc.data() as Topic)
    })
    return topics
  })
}

