export interface Reading {
  id: string;
  title: string;
}

export interface PillSelectorProps {
  readings: Reading[];
  selected: string;
  onSelect: (id: string) => void;
  pillContainerRef: React.RefObject<HTMLDivElement>;
  underlineRef: React.RefObject<HTMLDivElement>;
} 