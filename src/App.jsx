import { useState } from "react";
import { useSearchFetch } from "./useSearchFetch";

function App() {
  const [{ data, isLoading, isError }, doFetch] = useSearchFetch(
    "https://hn.algolia.com/api/v1/search?query=redux",
    { hits: [] }
  );
  const [query, setQuery] = useState("redux");

  return (
    <>
      <form
        onSubmit={(event) => {
          doFetch(`http://hn.algolia.com/api/v1/search?query=${query}`);
          event.preventDefault();
        }}
      >
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data.hits.map((item) => (
            <li key={item.objetId}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
