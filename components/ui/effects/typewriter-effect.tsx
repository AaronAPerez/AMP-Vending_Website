"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

type TypewriterProps = {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
};

/**
 * TypewriterEffect Component
 * 
 * Animated text component that displays a series of words with a typewriter effect
 * Based on Aceternity UI component
 */
export const TypewriterEffect: React.FC<TypewriterProps> = ({
  words,
  className,
  cursorClassName,
}) => {
  // Handles the current word being displayed
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  // Handles the current visible characters
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  // Whether we're currently deleting characters
  const [isDeleting, setIsDeleting] = useState(false);
  // The current word being processed
  const currentWord = words[currentWordIndex].text;

  useEffect(() => {
    // Timer for typing effect
    const typingTimer = setTimeout(() => {
      // If we're deleting characters
      if (isDeleting) {
        // Decrease visible characters
        setCurrentCharacterIndex((prev) => prev - 1);
        
        // If all characters are deleted
        if (currentCharacterIndex <= 0) {
          setIsDeleting(false);
          // Move to next word
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      } else {
        // Increase visible characters
        setCurrentCharacterIndex((prev) => prev + 1);
        
        // If all characters are visible
        if (currentCharacterIndex >= currentWord.length) {
          // Wait longer at the end of a word
          setTimeout(() => {
            setIsDeleting(true);
          }, 1500);
        }
      }
    }, isDeleting ? 25 : 50); // Delete faster than type

    return () => clearTimeout(typingTimer);
  }, [currentCharacterIndex, currentWord, isDeleting, words.length, currentWordIndex]);

  return (
    <div className={cn("flex space-x-1 my-6", className)}>
      <motion.div
        className="overflow-hidden pb-2"
        initial={{ width: "0%" }}
        animate={{ width: "fit-content" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="flex items-baseline">
          {words.map((word, index) => {
            const isCurrentWord = index === currentWordIndex;
            // Current string to display
            const displayString = isCurrentWord
              ? word.text.substring(0, currentCharacterIndex)
              : "";

            return (
              <div key={index} className="relative">
                {isCurrentWord && (
                  <span
                    className={cn(
                      "text-4xl md:text-6xl lg:text-7xl font-bold",
                      word.className
                    )}
                  >
                    {displayString}
                  </span>
                )}

                {/* Add spacing between words */}
                {isCurrentWord && <span className="ml-1"></span>}
              </div>
            );
          })}

          {/* Animated cursor */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className={cn(
              "inline-block h-8 md:h-12 lg:h-14 w-[2px] bg-[#FD5A1E] ml-1",
              cursorClassName
            )}
          ></motion.span>
        </div>
      </motion.div>
    </div>
  );
};