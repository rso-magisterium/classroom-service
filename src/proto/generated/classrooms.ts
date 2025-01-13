import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { ClassroomServiceClient as _ClassroomServiceClient, ClassroomServiceDefinition as _ClassroomServiceDefinition } from './ClassroomService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  Classroom: MessageTypeDefinition
  ClassroomService: SubtypeConstructor<typeof grpc.Client, _ClassroomServiceClient> & { service: _ClassroomServiceDefinition }
  User: MessageTypeDefinition
  UserClassrooms: MessageTypeDefinition
}

