// src/mission/mission.service.ts

import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { IMission } from './mission.interface';

@Injectable()
export class MissionService {
    private readonly missions = [
        { id: 1, codename: 'OPERATION_STORM', status: 'ACTIVE' },
        { id: 2, codename: 'SILENT_SNAKE', status: 'COMPLETED' },
        { id: 3, codename: 'RED_DAWN', status: 'FAILED' },
        { id: 4, codename: 'BLACKOUT', status: 'ACTIVE' },
        { id: 5, codename: 'ECHO_FALLS', status: 'COMPLETED' },
        { id: 6, codename: 'GHOST_RIDER', status: 'COMPLETED' }
    ];


    private readonly filePath = path.join(process.cwd(), 'data', 'missions.json');

    getSummary(): Record<string, number> {
        return this.missions.reduce((acc, currentMission) => {
            const status = currentMission.status;
            if (!acc[status]) acc[status] = 0;
            acc[status]++;
            return acc;
        }, {} as Record<string, number>);
    }

    async findAll(): Promise<IMission[]> {
        try {

            const fileData = await fs.readFile(this.filePath, 'utf-8');
            const rawMissions: IMission[] = JSON.parse(fileData);


            const transformedMissions = rawMissions.map((mission) => {
                let durationDays = -1;

                if (mission.endDate) {

                    const start = new Date(mission.startDate).getTime();
                    const end = new Date(mission.endDate).getTime();

                    const oneDayInMs = 1000 * 60 * 60 * 24;
                    durationDays = (end - start) / oneDayInMs;
                }


                return {
                    ...mission,
                    durationDays,
                };
            });

            return transformedMissions;
        } catch (error) {
            console.error('Error reading missions file:', error);
            return [];
        }
    }
}