interface IMission {
    id: number;
    codename: string;
    status: 'ACTIVE' | 'COMPLETED' | 'FAILED';
    targetName: string;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    startDate: Date;
    endDate: Date;
}