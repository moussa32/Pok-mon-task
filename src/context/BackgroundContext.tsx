import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router";

interface BackgroundContextType {
  gradientFrom: string;
  gradientTo: string;
  updateGradient: (from: string, to: string) => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(
  undefined
);

export const BackgroundProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [gradientFrom, setGradientFrom] = useState("#effcf3");
  const [gradientTo, setGradientTo] = useState("#d4fbe6");
  const location = useLocation();

  const updateGradient = (from: string, to: string) => {
    setGradientFrom(from);
    setGradientTo(to);
  };

  // Set initial gradient based on route
  useEffect(() => {
    if (location.pathname.startsWith("/pokemon/")) {
      updateGradient("#fbe7f3", "#faf4ff");
    } else {
      updateGradient("#effcf3", "#d4fbe6");
    }
  }, [location.pathname]);

  return (
    <BackgroundContext.Provider
      value={{ gradientFrom, gradientTo, updateGradient }}
    >
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackground = () => {
  const context = useContext(BackgroundContext);
  if (context === undefined) {
    throw new Error("useBackground must be used within a BackgroundProvider");
  }
  return context;
};
