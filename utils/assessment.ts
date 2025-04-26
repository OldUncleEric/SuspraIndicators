export interface PhysicalAddress {
  street: string;
  state: string;
  country: string;
  postalCode?: string;
}

export interface Assessment {
  address: PhysicalAddress;
  totalArea: number;
  buildingArea: number;
  buildingVolume: number;
  occupancy: number;
  startDate: string;
  endDate: string;
  mode: 'quick' | 'regular' | 'detailed';
  key?: string;
}

export function generateAssessmentKey(assessment: Assessment) {
  if ('key' in assessment) {
    return;
  }
  assessment.key = [
    assessment.mode,
    assessment.address.street,
    assessment.startDate,
    assessment.endDate,
  ].join('\u{1f}');
}
