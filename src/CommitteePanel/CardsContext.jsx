import { createContext, useState, useEffect } from "react";
import fardin from "../assets/images/Committee/Fardin.jpg";
import alamin from "../assets/images/Committee/Alamin.jpg";
import ahir from "../assets/images/Committee/Ahir.jpg";
import redoy from "../assets/images/Committee/Redoy.jpg";
import wale from "../assets/images/Committee/Wale.jpg";
import laboni from "../assets/images/Committee/Laboni.jpg";
import naim from "../assets/images/Committee/Naim.jpg";
import asif from "../assets/images/Committee/Asif.jpg";
import shajalal from "../assets/images/Committee/Shahjalal.jpg";
import rabbi from "../assets/images/Committee/Rabbi.jpg";
import mehedi from "../assets/images/Committee/Mehedi.jpg";
import mahmudul from "../assets/images/Committee/mahmudul.jpg";
import tusme from "../assets/images/Committee/Tusme.jpg";
import nadim from "../assets/images/Committee/Nadim.jpg";
import sahed from "../assets/images/Committee/Sahed.jpg";
import shiam from "../assets/images/Committee/Shiam.jpg";
import zayada from "../assets/images/Committee/Zayada.jpg";
import kanchon from "../assets/images/Committee/Kanchon.jpg";
import nur from "../assets/images/Committee/Nur.jpg";
import mithila from "../assets/images/Committee/Mithila.jpg";
import moinul from "../assets/images/Committee/Moinul.jpg";

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
      {
        imgSrc: asif,
        alt: "",
        name: "Md Asif Al Fattah Shohag",
        role: "IT Secretary",
        facebook: "https://www.facebook.com/asif.alfattah",
      },
      {
        imgSrc: shajalal,
        alt: "",
        name: "Mullah Mohammad Shajalal",
        role: "Assistant IT Secretary",
        facebook: "https://www.facebook.com/shahjalal2075",
      },
      {
        imgSrc: rabbi,
        alt: "",
        name: "Ratul Hasan Rabbi",
        role: "Publication Secretary",
        facebook: "https://www.facebook.com/rhr18818",
      },
      {
        imgSrc: mehedi,
        alt: "",
        name: "Howlader Mehedi Hasan",
        role: "Assistant Publication Secretary",
        facebook: "https://www.facebook.com/hmh2003",
      },
      {
        imgSrc: mahmudul,
        alt: "",
        name: "Md. Mahmudul Haque",
        role: "Librarian Secretary",
        facebook: "https://www.facebook.com/cse.joy.nwu",
      },
      {
        imgSrc: tusme,
        alt: "",
        name: "Tasnuva Sultana Tusme",
        role: "Executive Member",
        facebook: "https://www.facebook.com/tasnuva3221",
      },
      {
        imgSrc: nadim,
        alt: "",
        name: "Nadim Hasan Emon",
        role: "Executive Member",
        facebook: "https://www.facebook.com/nadim.hasanemon.7",
      },
      {
        imgSrc: sahed,
        alt: "",
        name: "Md. Sahed Hossain",
        role: "Executive Member",
        facebook: "https://www.facebook.com/itsRafsanSahad",
      },
      {
        imgSrc: shiam,
        alt: "",
        name: "Sk. Md. Shiam",
        role: "Executive Member",
        facebook: "https://www.facebook.com/skshiam.rahan",
      },
      {
        imgSrc: zayada,
        alt: "",
        name: "Zayada Akter",
        role: "Executive Member",
        facebook: "https://www.facebook.com/zayada.akter.611174",
      },
      {
        imgSrc: kanchon,
        alt: "",
        name: "Rafsanul Islam Kanchon",
        role: "Executive Member",
        facebook: "https://www.facebook.com/rafsanul.kanchon",
      },
      {
        imgSrc: nur,
        alt: "",
        name: "Nur Hamim",
        role: "Executive Member",
        facebook: "https://www.facebook.com/link.diye.ki.hobe.bro",
      },
      {
        imgSrc: mithila,
        alt: "",
        name: "Mithila Mondol",
        role: "Executive Member",
        facebook: "https://www.facebook.com/profile.php?id=100094599941522",
      },
      {
        imgSrc: moinul,
        alt: "",
        name: "Moinul Islam",
        role: "Executive Member",
        facebook: "https://www.facebook.com/moinulislam07",
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
