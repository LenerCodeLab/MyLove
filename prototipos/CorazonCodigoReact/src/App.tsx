import { useEffect, useState } from "react";
import { MusicPlayer } from "./components/MusicPlayer";
import { ProgressNav } from "./components/ProgressNav";
import { AnatomicalHeart } from "./sections/AnatomicalHeart";
import { Constellation } from "./sections/Constellation";
import { ExamCongratulations } from "./sections/ExamCongratulations";
import { FinalSection } from "./sections/FinalSection";
import { FutureTogether } from "./sections/FutureTogether";
import { GamesSection } from "./sections/GamesSection";
import { HeroSection } from "./sections/HeroSection";
import { HiddenDetails } from "./sections/HiddenDetails";
import { LoveLetters } from "./sections/LoveLetters";
import { LoveMonitor } from "./sections/LoveMonitor";
import { PhotoGallery } from "./sections/PhotoGallery";
import { RelationshipCounter } from "./sections/RelationshipCounter";
import { RelationshipTimeline } from "./sections/RelationshipTimeline";
import { SecretMessage } from "./sections/SecretMessage";
import { WelcomeScreen } from "./sections/WelcomeScreen";
import { YellowFlowersSection } from "./sections/YellowFlowersSection";

export function App() {
  const [entered, setEntered] = useState(() => localStorage.getItem("yl.entered") === "true");

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    }, { threshold: 0.12 });

    document.querySelectorAll(".section").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [entered]);

  function enter() {
    localStorage.setItem("yl.entered", "true");
    setEntered(true);
  }

  if (!entered) {
    return (
      <>
        <WelcomeScreen onEnter={enter} />
        <MusicPlayer canPlay={entered} />
      </>
    );
  }

  return (
    <>
      <ProgressNav />
      <MusicPlayer canPlay={entered} />
      <main className="app-shell">
        <HeroSection />
        <ExamCongratulations />
        <YellowFlowersSection />
        <PhotoGallery />
        <LoveLetters />
        <GamesSection />
        <LoveMonitor />
        <AnatomicalHeart />
        <RelationshipTimeline />
        <FutureTogether />
        <SecretMessage />
        <Constellation />
        <RelationshipCounter />
        <HiddenDetails />
        <FinalSection />
      </main>
    </>
  );
}
