// Original file: proto/classrooms.proto

import type { Classroom as _Classroom, Classroom__Output as _Classroom__Output } from './Classroom';

export interface UserClassrooms {
  'userId'?: (string);
  'tenantId'?: (string);
  'classrooms'?: (_Classroom)[];
}

export interface UserClassrooms__Output {
  'userId': (string);
  'tenantId': (string);
  'classrooms': (_Classroom__Output)[];
}
