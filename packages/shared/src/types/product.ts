export interface IProduct {
   _id?: string;
    title: string;
    pictures: string[];
    mrp: number;
    discountedPrice: number;
    stockAvailability: number;
    description?: string;
    features?: string[];
    usages?: string[];
    punchline?: string;
    character?: string;
    tags?: string[];

    dimensions?: {
      length: number;
      width: number;
      height: number;
      unit: string; // e.g. "cm", "in"
    };

    sizes?: string[];
    colors?: string[];
    material?: string;
    shape?: string;

    mov?: number;
    moq?: number;
}
