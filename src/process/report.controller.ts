import { Controller, Post, Body } from '@nestjs/common';
import { Client } from '@temporalio/client';
import { reportGenerationWorkflow } from './report.workflow';
import type { ReportRequest } from './report.workflow';

@Controller('report')
export class ReportController {

  private client: Client;

  constructor() {
    this.client = new Client();
  }

  @Post('generate')
  async generateReport(@Body() payload: ReportRequest) {
    
    const handle = await this.client.workflow.start(reportGenerationWorkflow, {
      taskQueue: 'report-queue',
      workflowId: `report-${Date.now()}-${Math.random()}`,
      args: [payload],
    });

    console.log(`[ReportController] Workflow iniciado con ID: ${handle.workflowId}`);
    return { 
      workflowId: handle.workflowId,
      message: 'Reporte en proceso, se te enviará al correo una vez listo' 
    };
  }
}
