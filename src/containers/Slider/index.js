import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false); // Indicateur de chargement

  useEffect(() => {
    if (data && data.focus && data.focus.length > 0) {
      setIsLoaded(true);
    }
  }, [data]);

  if (!data || !data.focus || data.focus.length === 0) {
    return <p>Chargement...</p>;
  }

  const byDateDesc = [...data.focus].sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % byDateDesc.length);
    }, 5000);

    return () => clearTimeout(timer);
  }, [byDateDesc.length]);

  if (!isLoaded) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="SlideCardList">
      {byDateDesc.map((event) => (
        <div
          key={`card-${event.id}`} // Utilise un id unique
          className={`SlideCard SlideCard--${
            index === byDateDesc.indexOf(event) ? "display" : "hide"
          }`}
        >
          {event.cover && <img src={event.cover} alt="forum" />}
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              {event.title && <h3>{event.title}</h3>}
              {event.description && <p>{event.description}</p>}
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}

      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((event) => (
            <input
              key={`radio-${event.id}`} // Utilisation d'un identifiant unique
              type="radio"
              name="radio-button"
              checked={index === byDateDesc.indexOf(event)}
              onChange={() => setIndex(byDateDesc.indexOf(event))}
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
