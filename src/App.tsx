import { useState, useCallback } from "react";
import "./App.css";
import { useTopics } from "./hooks/useTopics";
import TableHeader from "./components/tableHeader/TableHeader";
import TableRow from "./components/tableRow/TableRow";
import Pagination from "./components/pagination/Pagination";

function App() {
  const max = 5;
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<"next" | "prev" | undefined>(undefined);
  const [position, setPosition] = useState<number>(0);
  const { topics, searchTopics } = useTopics(page, status, position, max);

  const prevClick = useCallback(() => {
    setPage((page) => page - 1);
    setStatus("prev");
    setPosition(topics[0].topicId);
  }, [setPage, setStatus, setPosition, topics]);


  const nextClick = useCallback(() => {
    setPage((page) => page + 1);
    setStatus("next");
    setPosition(topics[max - 1].topicId);
  }, [setPage, setStatus, setPosition, topics]);


  return (
    <>
      <TableHeader />
      {topics &&
        topics.map((topic) => <TableRow key={topic.topicId} topic={topic} />)}
      <Pagination
        page={page}
        searchTopics={searchTopics}
        prevClick={prevClick}
        nextClick={nextClick}
      />
    </>
  );
}

export default App;
