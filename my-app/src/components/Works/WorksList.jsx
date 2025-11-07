import React, { useRef, useEffect } from "react";
import WorksCard from "./WorksCard";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { LuScissors, LuBrush } from "react-icons/lu";
import { GiLipstick, GiHairStrands } from "react-icons/gi";
import { PiHairDryerLight } from "react-icons/pi";
import { TbFaceId } from "react-icons/tb";
import "../../styles/Works.css";

const data = [
  { icon: <LuScissors />, title: "Kadın Saç Kesimi", desc: "Profesyonel kadın saç kesimi ve şekillendirme" },
  { icon: <LuBrush />, title: "Saç Boyama", desc: "Kaliteli boyama ürünleri ile tam kafa boya" },
  { icon: <GiLipstick />, title: "Makyaj", desc: "Modern makyaj teknikleri" },
  { icon: <GiHairStrands />, title: "Keratin Bakım", desc: "Saç düzleştirme ve bakım" },
  { icon: <PiHairDryerLight />, title: "Fön & Maşa", desc: "Özel gün saç modelleri" },
  { icon: <TbFaceId />, title: "Saç Bakım", desc: "Derin bakım ve onarım maskesi" },
];

const WorksList = () => {
  const scrollRef = useRef(null);

  const scrollRight = () => scrollRef.current.scrollBy({ left: 260, behavior: "smooth" });
  const scrollLeft = () => scrollRef.current.scrollBy({ left: -260, behavior: "smooth" });

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

        if (scrollLeft + clientWidth >= scrollWidth) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 1, behavior: "smooth" }); 
        }
      }
    }, 20); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="position-relative py-4">
      <div className="d-flex overflow-auto works-scroll" ref={scrollRef}>
        <div className="works-row">
          {data.map((item, index) => (
            <WorksCard key={index} icon={item.icon} title={item.title} desc={item.desc} />
          ))}
        </div>
      </div>

      <button className="arrow-btn left" onClick={scrollLeft}>
        <FiChevronLeft size={22} />
      </button>
      <button className="arrow-btn right" onClick={scrollRight}>
        <FiChevronRight size={22} />
      </button>
    </div>
  );
};

export default WorksList;
