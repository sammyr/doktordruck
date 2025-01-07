export interface TextBlock {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize?: number;
  fontFamily?: string;
  fontStyle?: string;
  color?: string;
  selected?: boolean;
  zIndex: number;
}

export interface TextBlockUpdate {
  onTextBlockUpdate: (block: TextBlock) => void;
}
