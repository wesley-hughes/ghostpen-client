import { useEffect, useState } from "react";
import { getTags } from "../../managers/TagManager";

export const TagForm = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getTags((data) => setTags(data));
  }, []);

  return (
    <>
    {tags.map((tag) => <div>{tag.label}</div>
    )}
    </>
  )
};
