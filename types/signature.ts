export interface SignaturePoint {
  x: number;
  y: number;
}

export interface Signature {
  id: string;
  strokes: SignaturePoint[][];
  name: string;
  note: string | null;
  country: string | null;
  createdAt: number;
}
