import {
  EventPattern,
  Payload,
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { Client } from '@temporalio/client';
import { reportGenerationWorkflow } from './report.workflow';
import type { ReportRequest } from './report.workflow';

@Controller()
export class ReportConsumer {

  private client: Client;

  constructor() {
    this.client = new Client();
  }

  @EventPattern('report-requested')
  async handleReport(@Payload() payload: ReportRequest) {
    const handle = await this.client.workflow.start(reportGenerationWorkflow, {
      taskQueue: 'report-queue',
      workflowId: `report-${Date.now()}-${Math.random()}`,
      args: [payload],
    });

    console.log(`[ReportConsumer] Workflow iniciado con ID: ${handle.workflowId}`);

    // For demo, return the workflow ID immediately
    return { workflowId: handle.workflowId };
  }
}
