import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import prisma from "../prisma";

import { ProtoGrpcType } from "./generated/classrooms/classrooms";
import { Classroom } from "./generated/classrooms/Classroom";
import { ClassroomServiceHandlers } from "./generated/classrooms/ClassroomService";
import logger from "../logger";

const scheduleDef = protoLoader.loadSync("proto/classrooms.proto", {
  longs: Number,
  enums: String,
  defaults: true,
  oneofs: true,
});
const schedulePackageDef = grpc.loadPackageDefinition(scheduleDef) as unknown as ProtoGrpcType;

const classroomServiceHandlers: ClassroomServiceHandlers = {
  GetUserClassrooms: async (call, callback) => {
    const { tenantId, userId } = call.request;

    if (!tenantId || !userId) {
      logger.debug(
        { request: { service: "ClassroomService", function: "GetUserClassrooms", request: call.request } },
        "Missing required fields"
      );
      callback({ code: grpc.status.INVALID_ARGUMENT, message: "Missing required fields" });
      return;
    }

    const classrooms = await prisma.classroom.findMany({
      where: {
        tenantId,
        OR: [{ students: { hasSome: [userId] } }, { teachers: { hasSome: [userId] } }],
      },
      select: {
        id: true,
        name: true,
      },
    });

    let classroomsArray: Classroom[] = [];
    for (let classroom of classrooms) {
      classroomsArray.push({
        tenantId: tenantId,
        classroomId: classroom.id,
        name: classroom.name,
      });
    }

    logger.info(
      { request: { service: "ClassroomService", function: "GetUserClassrooms", request: call.request } },
      "Classrooms fetched"
    );
    callback(null, {
      userId: userId,
      tenantId: tenantId,
      classrooms: classroomsArray,
    });
  },
};

const server = new grpc.Server();
server.addService(schedulePackageDef.ClassroomService.service, classroomServiceHandlers);

export default server;
