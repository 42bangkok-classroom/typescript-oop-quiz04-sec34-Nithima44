import { MissionService } from './mission.service';
import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';

@Controller('missions')
export class MissionController {
    constructor(private readonly missionService: MissionService) {}

    @Get('summary')
    getSummary() {
        return this.missionService.getSummary();
    }
}