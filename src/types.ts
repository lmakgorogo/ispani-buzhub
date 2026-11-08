export type BusinessStructureType = 
  | 'sole_proprietorship'
  | 'pty_ltd'
  | 'npc'
  | 'inc'
  | 'partnership'
  | 'cooperative';

export interface BusinessStructure {
  id: BusinessStructureType;
  name: string;
  fullName: string;
  bestFor: string;
  legalEntity: boolean;
  cipcRequired: boolean;
  liability: 'Unlimited Personal' | 'Limited to Shares' | 'Limited / Board Gov' | 'Joint & Several (Directors)' | 'Joint & Several (Partners)' | 'Limited to Member Shares';
  costRange: string;
  setupTime: string;
  taxTreatment: string;
  pros: string[];
  cons: string[];
  keyRegulation: string;
}

export interface CipcStep {
  step: number;
  title: string;
  timeframe: string;
  fee: string;
  description: string;
  requirements: string[];
  tips: string;
  officialUrl?: string;
  actionText?: string;
}

export interface TaxObligation {
  id: string;
  name: string;
  threshold: string;
  rate: string;
  frequency: string;
  formName: string;
  description: string;
  penalties: string;
  officialUrl?: string;
}

export interface FundingProgram {
  id: string;
  name: string;
  agency: 'SEDFA' | 'NYDA' | 'DSBD' | 'TIA' | 'dtic' | 'SETA' | 'YES' | 'IDC';
  category: 'Grant' | 'Incubator' | 'Learnership' | 'Blended Capital' | 'Cost-Sharing';
  fundingRange: string;
  targetAudience: string;
  eligibility: string[];
  keyBenefits: string[];
  applicationMethod: string;
  turnaroundTime: string;
  isYouthTargeted?: boolean;
  isTechInnovation?: boolean;
  officialUrl: string;
  portalName: string;
}

export interface PrerequisiteItem {
  id: string;
  title: string;
  issuer: string;
  importance: 'Critical' | 'High' | 'Recommended';
  description: string;
  howToObtain: string;
  estimatedCost: string;
  turnaroundTime: string;
  officialUrl?: string;
  linkText?: string;
}
