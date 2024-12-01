"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { characters, Character, Mode } from "@/lib/characters";

interface CharacterSelectionProps {
  onSelect: (character: Character) => void;
  mode: Mode;
}

export default function CharacterSelection({
  onSelect,
  mode,
}: CharacterSelectionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    // Select first character by default
    const firstCharacter = characters[mode][0];
    if (firstCharacter) {
      setSelectedId(firstCharacter.id);
      onSelect(firstCharacter);
    }
  }, [mode, onSelect]);

  const handleSelect = (character: Character) => {
    setSelectedId(character.id);
    onSelect(character);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold mb-2">Choose Your Character</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {characters[mode].map((character, index) => (
            <motion.div
              key={character.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CardContainer>
                <CardBody
                  className={`relative group/card border-purple-800/60 bg-purple-950/30 backdrop-blur-sm dark:hover:shadow-2xl w-auto h-auto rounded-xl p-4 border ${
                    selectedId === character.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => handleSelect(character)}
                >
                  <CardItem
                    translateZ="30"
                    className="text-lg font-bold text-neutral-600 dark:text-white"
                  >
                    {character.name}
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="40"
                    className="text-neutral-500 text-xs max-w-sm mt-1 dark:text-neutral-300"
                  >
                    {character.description}
                  </CardItem>
                  <CardItem translateZ="80" className="w-full mt-2">
                    <Image
                      src={character.image}
                      height={300}
                      width={300}
                      className="h-40 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      alt={character.name}
                    />
                  </CardItem>
                </CardBody>
              </CardContainer>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
