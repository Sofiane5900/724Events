import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [sortedEvents, setSortedEvents] = useState([]);

  useEffect(() => {
    if (data && data.focus) {
      // Tri des événements par date en ordre décroissant
      const sortedByDateDesc = data.focus.slice().sort((evtA, evtB) =>
        new Date(evtB.date) - new Date(evtA.date)
      );
      setSortedEvents(sortedByDateDesc);
    }
  }, [data]);

  useEffect(() => {
    // Déclencher le changement de carte toutes les 5 secondes
    const interval = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex < sortedEvents.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [sortedEvents]);

  return (
    <div className="SlideCardList">
      {sortedEvents.map((event, idx) => (
        <div
          key={event.title}
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
        >
          <img src={event.cover} alt="forum" />
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
          {sortedEvents.map((event, radioIdx) => (
            <input
              key={event.id}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
