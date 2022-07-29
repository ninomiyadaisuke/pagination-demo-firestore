import { FC } from "react";
import { Topic } from "../../types/topics";
import "./TableRow.css";

type Props = {
  topic: Topic;
};

const TableRow: FC<Props> = (props) => {
  const { topic } = props;
  return (
    <div className="table-row">
      <span>
        <span>{topic.title}</span>
      </span>
      <span>{topic.text}</span>
    </div>
  );
};

export default TableRow;
