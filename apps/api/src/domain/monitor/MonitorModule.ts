import { Module } from "@nestjs/common";
import { MonitorController } from "./MonitorController.js";

@Module({
    controllers: [MonitorController]
})
export class MonitorModule { }