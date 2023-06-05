import { useEffect, useState } from "react";

function App() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [haveSmashed, setHaveSmashed] = useState(0);
  const [havePassed, setHavePassed] = useState(0);
  const [end, setEnd] = useState(false);

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

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <>
      <main>
        <article className="bg-white px-8 py-4 rounded-lg">
          <section>
            {end ? (
              <div className="text-center">
                <h1 className="text-2xl">Here's how many times you smashed:</h1>
                <p className="font-bold text-xl mb-6">{haveSmashed} </p>
                <h1 className="text-2xl">Here's how many times you passed:</h1>
                <p className="font-bold text-xl mb-6">{havePassed} </p>
                <div className="mt-6">
                  <button
                    onClick={() => setEnd(false)}
                    className="font-bold bg-orange-500 text-white px-4 py-3 rounded-lg"
                  >
                    Do you want to retry?
                  </button>
                </div>
              </div>
            ) : (
              <>
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
                    className="bg-orange-700 text-white px-4 py-2"
                  >
                    Smash
                  </button>
                  <button
                    onClick={handlePass}
                    className="bg-red-700 text-white px-4 py-2"
                  >
                    Pass
                  </button>
                </div>
              </>
            )}
          </section>
        </article>
      </main>
    </>
  );
}

export default App;
