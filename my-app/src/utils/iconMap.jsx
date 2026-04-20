import React from "react";
import { LuScissors, LuBrush } from "react-icons/lu";
import { GiLipstick, GiHairStrands } from "react-icons/gi";
import { PiHairDryerLight } from "react-icons/pi";
import { TbFaceId } from "react-icons/tb";
import { HiOutlineSparkles } from "react-icons/hi";
import { RiMentalHealthLine } from "react-icons/ri";

export const iconMap = {
  scissors: <LuScissors />,
  brush: <LuBrush />,
  lipstick: <GiLipstick />,
  keratin: <GiHairStrands />,
  dryer: <PiHairDryerLight />,
  face: <TbFaceId />,
  sparkles: <HiOutlineSparkles />,
  health: <RiMentalHealthLine />,
};

export const iconOptions = [
  { id: "scissors", icon: <LuScissors />, label: "Makas / Kesim" },
  { id: "brush", icon: <LuBrush />, label: "Fırça / Boyama" },
  { id: "dryer", icon: <PiHairDryerLight />, label: "Fön / Şekillendirme" },
  { id: "lipstick", icon: <GiLipstick />, label: "Makyaj" },
  { id: "face", icon: <TbFaceId />, label: "Cilt / Yüz Bakımı" },
  { id: "keratin", icon: <GiHairStrands />, label: "Keratin / Saç Bakımı" },
  { id: "sparkles", icon: <HiOutlineSparkles />, label: "Parıltı / Özel" },
  { id: "health", icon: <RiMentalHealthLine />, label: "Sağlık / Bakım" },
];
