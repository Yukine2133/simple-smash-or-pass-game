import { useEffect, useState } from "react";

function App() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [haveSmashed, setHaveSmashed] = useState(0);
  const [havePassed, setHavePassed] = useState(0);
  const [end, setEnd] = useState(false);
  const [start, setStart] = useState(true);

  const fetchImage = async () => {
    const res = await fetch("/data.json");
    const data = await res.json();
    setImages(data);
  };

  const handleSmash = () => {
    setHaveSmashed(haveSmashed + 1);
    handleNextImage();
  };

  const handlePass = () => {
    setHavePassed(havePassed + 1);
    handleNextImage();
  };

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex >= images.length) {
        setEnd(true);
        setCurrentIndex(0);
        return;
      }
      return nextIndex;
    });
  };

  const handleRetry = () => {
    setEnd(false);
    setHaveSmashed(0);
    setHavePassed(0);
  };

  useEffect(() => {
    fetchImage();
  }, []);

  if (start) {
    return (
      <div className="text-center x-8 py-4 rounded-lg">
        <h1 className="text-white text-2xl font-bold mb-4">
          Welcome to Smash or Pass!
        </h1>
        <h3 className="text-white text-xl">
          Click the button below to start the game
        </h3>
        <button
          className="rounded-md text-white px-6 py-2 bg-green-400 mt-6"
          onClick={() => setStart(false)}
        >
          Start Game
        </button>
      </div>
    );
  }

  if (end) {
    return (
      <div className="text-center text-white">
        <h1 className=" font-bold text-2xl mb-4">End!</h1>
        <h1>Here is how many times you smashed:</h1>
        <p className="font-bold text-xl mb-6">{haveSmashed}</p>
        <h1>Here is how many times you passed:</h1>
        <p className="font-bold text-xl mb-8">{havePassed}</p>
        <button
          className="rounded-md bg-orange text-white px-6 py-2"
          onClick={handleRetry}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <main>
      <article className="bg-gray-200 px-8 py-4 rounded-lg">
        <div>
          <img
            className="rounded-lg"
            src={images[currentIndex]?.url}
            alt="Current Image"
          />
        </div>
        <div className="flex gap-4 justify-center mt-4">
          <button
            onClick={handleSmash}
            className="bg-orange text-white rounded-md px-4 py-2"
          >
            Smash
          </button>
          <button
            onClick={handlePass}
            className="bg-red-500 rounded-md text-white px-6 py-2"
          >
            Pass
          </button>
        </div>
      </article>
    </main>
  );
}

export default App;
