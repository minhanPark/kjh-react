import React from "react";
import MyReact from "../lib/MyReact";
import { Form, ErrorMessage, Field } from "../lib/MyForm";

const Board = ({ posts, tag }) => {
  MyReact.resetCursor();

  const filterPosts = () => {
    console.log("filterPosts");
    return posts.filter((post) => (tag ? post.tag === tag : true));
  };

  const filteredPosts = MyReact.useMemo(filterPosts, [posts, tag]);

  return (
    <ul>
      {filteredPosts.map(({ id, content, tag }) => (
        <li key={id}>
          {content} <span>#{tag}</span>
        </li>
      ))}
    </ul>
  );
};

export default () => {
  const [tag, setTag] = React.useState("");
  return (
    <>
      <button onClick={() => setTag("")}>All</button>
      <button onClick={() => setTag("tag1")}>Tag1</button>
      <button onClick={() => setTag("tag2")}>Tag2</button>
      <Board
        posts={[
          { id: "id1", content: "content1", tag: "tag1" },
          { id: "id2", content: "content2", tag: "tag1" },
          { id: "id3", content: "content3", tag: "tag2" },
        ]}
        tag={tag}
      />
    </>
  );
};
