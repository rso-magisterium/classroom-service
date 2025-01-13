import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "./generated/schedule/schedule";

const scheduleDef = protoLoader.loadSync("proto/schedule.proto", {
  longs: Number,
  enums: String,
  defaults: true,
  oneofs: true,
});
const schedulePackageDef = grpc.loadPackageDefinition(scheduleDef) as unknown as ProtoGrpcType;

if (process.env.SCHEDULE_SERVICE_URL_GRPC == null) {
  console.error("Schedule service gRPC URL is not set");
  process.exit(101);
}

const client = new schedulePackageDef.ScheduleService(
  process.env.SCHEDULE_SERVICE_URL_GRPC,
  grpc.credentials.createInsecure()
);

export default client;
