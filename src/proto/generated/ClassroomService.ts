// Original file: proto/classrooms.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { User as _User, User__Output as _User__Output } from './User';
import type { UserClassrooms as _UserClassrooms, UserClassrooms__Output as _UserClassrooms__Output } from './UserClassrooms';

export interface ClassroomServiceClient extends grpc.Client {
  GetUserClassrooms(argument: _User, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_UserClassrooms__Output>): grpc.ClientUnaryCall;
  GetUserClassrooms(argument: _User, metadata: grpc.Metadata, callback: grpc.requestCallback<_UserClassrooms__Output>): grpc.ClientUnaryCall;
  GetUserClassrooms(argument: _User, options: grpc.CallOptions, callback: grpc.requestCallback<_UserClassrooms__Output>): grpc.ClientUnaryCall;
  GetUserClassrooms(argument: _User, callback: grpc.requestCallback<_UserClassrooms__Output>): grpc.ClientUnaryCall;
  getUserClassrooms(argument: _User, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_UserClassrooms__Output>): grpc.ClientUnaryCall;
  getUserClassrooms(argument: _User, metadata: grpc.Metadata, callback: grpc.requestCallback<_UserClassrooms__Output>): grpc.ClientUnaryCall;
  getUserClassrooms(argument: _User, options: grpc.CallOptions, callback: grpc.requestCallback<_UserClassrooms__Output>): grpc.ClientUnaryCall;
  getUserClassrooms(argument: _User, callback: grpc.requestCallback<_UserClassrooms__Output>): grpc.ClientUnaryCall;
  
}

export interface ClassroomServiceHandlers extends grpc.UntypedServiceImplementation {
  GetUserClassrooms: grpc.handleUnaryCall<_User__Output, _UserClassrooms>;
  
}

export interface ClassroomServiceDefinition extends grpc.ServiceDefinition {
  GetUserClassrooms: MethodDefinition<_User, _UserClassrooms, _User__Output, _UserClassrooms__Output>
}
