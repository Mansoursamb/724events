/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Assurez-vous que les hooks sont appelés de manière inconditionnelle
  const byDateDesc =
    data && data.focus
      ? [...data.focus].sort((evtA, evtB) =>
          new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
        )
      : [];

  useEffect(() => {
    if (byDateDesc.length > 0) {
      const timer = setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % byDateDesc.length);
      }, 5000);

      return () => clearTimeout(timer);
    }
    // Ajoutez un retour vide pour satisfaire ESLint
    return undefined;
  }, [index, byDateDesc.length]);

  const handlePaginationClick = (idx) => {
    setIndex(idx);
  };

  if (!data || !data.focus || data.focus.length === 0) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="SlideCardList">
      {byDateDesc.map((event, idx) => (
        <div
          key={event.id || `event-${idx}`}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt={event.title} />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}

      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((_, radioIdx) => (
            <input
              key={`radio-${radioIdx}`}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => handlePaginationClick(radioIdx)}
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
