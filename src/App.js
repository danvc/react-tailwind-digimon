import { useEffect, useState } from "react";
import "./App.css";

/**
 * Renders the animal card containing the info:
 * img : "https://digimon.shadowsmith.com/img/grankuwagamon.jpg"
 * level : "Mega"
 * name : "GranKuwagamon"
 * @param {*} monster
 * @returns
 */
const Card = ({ name, level, img }) => (
  <div className="p-4  grid grid-cols-1 gap-4 shadow-lg rounded-lg border-[1px]  border-gray-100 bg-yellow-300">
    <img src={img} alt={name} className="w-full rounded-lg" />
    <div className="text-xl text-center font-semibold">{name}</div>
    <div className="bg-yellow-100 p-3 rounded-lg">{level}</div>
  </div>
);

function App() {
  const [data, setData] = useState(null);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("https://digimon-api.vercel.app/api/digimon")
      .then((data) => data.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="p-28">
      <div className="grid grid-cols-1  mb-6">
        <input
          type="text"
          value={text}
          className="bg-yellow-50 rounded-xl text-lg leading-10 px-2 border-2 "
          placeholder="Text to find"
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {data
          ?.filter(
            (monster) =>
              monster.name.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
              monster.level.toLowerCase().indexOf(text.toLowerCase()) > -1
          )
          .map((monster) => (
            <Card {...monster} />
          ))}
      </div>
    </div>
  );
}

export default App;
