
export interface DeviceReport {
  id: string;
  certificateId: string;
  timestamp: string;
  fingerprint: string;
  sellerName: string;
  verificationStatus: 'verified' | 'pending' | 'flagged';
  system: {
    manufacturer: string;
    model: string;
    os: string;
    serial: string;
  };
  cpu: {
    model: string;
    cores: number;
    clockSpeed: string;
    peakTemp: number;
    healthScore: number;
  };
  gpu: {
    model: string;
    vram: string;
    driverVersion: string;
    stressTestResult: string;
  };
  memory: {
    capacity: string;
    speed: string;
    type: string;
    slotUsage: string;
  };
  storage: {
    model: string;
    type: string;
    healthPercent: number;
    powerOnHours: number;
    totalWrites: string;
  };
  battery: {
    designCapacity: number;
    fullChargeCapacity: number;
    wearLevel: number;
    cycleCount: number;
    status: string;
  };
}

export enum ReportBadge {
  GOLD = 'Gold Standard',
  BATTERY_EXCELLENT = 'Battery Optimal',
  STORAGE_VERIFIED = 'SSD Verified',
  THERMAL_STABLE = 'Thermal Peak',
}
