export type Screen =
  | "landing"
  | "capture"
  | "analysing"
  | "gate"
  | "results"
  | "booking";

export type Severity = "none" | "mild" | "moderate" | "significant";

export type ConcernIcon =
  | "wrinkles"
  | "texture"
  | "pigmentation"
  | "acne"
  | "laxity"
  | "redness"
  | "undereye"
  | "quality";

export type SuitabilityTier =
  | "Excellent Candidate"
  | "Good Candidate"
  | "Moderate Candidate";

export interface SkinConcern {
  id: number;
  name: string;
  finding: string;
  neoGenBenefit: string;
  severity: Severity;
  icon: ConcernIcon;
}

export interface AnalysisResult {
  fitzpatrickType: string;
  suitabilityScore: number;
  suitabilityTier: SuitabilityTier;
  overallSummary: string;
  concerns: SkinConcern[];
}

export interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  marketingConsent: boolean;
}

export interface AppState {
  screen: Screen;
  imageDataUrl: string | null;
  analysisResult: AnalysisResult | null;
  leadData: LeadData | null;
}
