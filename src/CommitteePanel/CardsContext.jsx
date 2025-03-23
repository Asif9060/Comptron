import { createContext, useState, useEffect } from "react";
import fardin from "../assets/images/Committee/Fardin.jpg";
import alamin from "../assets/images/Committee/Alamin.jpg";
import ahir from "../assets/images/Committee/Ahir.jpg";
import redoy from "../assets/images/Committee/Redoy.jpg";
import wale from "../assets/images/Committee/Wale.jpg";
import laboni from "../assets/images/Committee/Laboni.jpg";
import naim from "../assets/images/Committee/Naim.jpg";
// import asif from "../assets/images/Committee/Asif.jpg";
// import shajalal from "../assets/images/Committee/Shahjalal.jpg";
// import rabbi from "../assets/images/Committee/Rabbi.jpg";
// import mehedi from "../assets/images/Committee/Mehedi.jpg";
// import mahmudul from "../assets/images/Committee/mahmudul.jpg";
// import tusme from "../assets/images/Committee/Tusme.jpg";
// import nadim from "../assets/images/Committee/Nadim.jpg";
// import sahed from "../assets/images/Committee/Sahed.jpg";
// import shiam from "../assets/images/Committee/Shiam.jpg";
// import zayada from "../assets/images/Committee/Zayada.jpg";
// import kanchon from "../assets/images/Committee/Kanchon.jpg";
// import nur from "../assets/images/Committee/Nur.jpg";
// import mithila from "../assets/images/Committee/Mithila.jpg";
// import moinul from "../assets/images/Committee/Moinul.jpg";

export const CardsContext = createContext();

export const CardsProvider = ({ children }) => {
  // Load from local storage or use default data
  const storedData = JSON.parse(localStorage.getItem("cardsData"));

  const [cardsData, setCardsData] = useState(
    storedData || [
      {
        imgSrc: fardin,
        alt: "",
        name: "Tanzil Parvez Fardin",
        role: "President",
        facebook: "https://www.facebook.com/itzfardinhere",
      },
      {
        imgSrc: alamin,
        alt: "",
        name: "Md. Al-Amin Saikh",
        role: "Vice-President",
        facebook: "https://www.facebook.com/alaminshaikh1703",
      },
      {
        imgSrc: ahir,
        alt: "",
        name: "Sourov Hasan Ahir",
        role: "General Secretary",
        facebook: "https://www.facebook.com/ahir.suvo.2024",
      },
      {
        imgSrc: redoy,
        alt: "",
        name: "Md. Tanvir Jahan Redoy",
        role: "Joint Secretary",
        facebook: "https://www.facebook.com/tanvir.redoy.14",
      },
      {
        imgSrc: wale,
        alt: "",
        name: "Md. Waleullah",
        role: "Treasurer",
        facebook: "https://www.facebook.com/mdismail.munna.14",
      },
      {
        imgSrc: laboni,
        alt: "",
        name: "Farjana Akter Laboni",
        role: "Publicity and Public Relation Secretary",
        facebook: "https://www.facebook.com/falabonno.disha",
      },
      {
        imgSrc: naim,
        alt: "",
        name: "Sheikh Naim Hossain",
        role: "Assistant Publicity and Public Relation Secretary",
        facebook: "https://www.facebook.com/naim001.official",
      },
    ]
  );

  // Save to local storage whenever cardsData changes
  useEffect(() => {
    localStorage.setItem("cardsData", JSON.stringify(cardsData));
  }, [cardsData]);

  return (
    <CardsContext.Provider value={{ cardsData, setCardsData }}>
      {children}
    </CardsContext.Provider>
  );
};
