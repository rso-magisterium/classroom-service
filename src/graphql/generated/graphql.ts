import gql from "graphql-tag";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
};

export type AffectedRowsOutput = {
  __typename?: "AffectedRowsOutput";
  count: Scalars["Int"]["output"];
};

export type AggregateTenant = {
  __typename?: "AggregateTenant";
  _count?: Maybe<TenantCountAggregate>;
  _max?: Maybe<TenantMaxAggregate>;
  _min?: Maybe<TenantMinAggregate>;
};

export type AggregateUser = {
  __typename?: "AggregateUser";
  _count?: Maybe<UserCountAggregate>;
  _max?: Maybe<UserMaxAggregate>;
  _min?: Maybe<UserMinAggregate>;
};

export type CreateManyAndReturnTenant = {
  __typename?: "CreateManyAndReturnTenant";
  admin: User;
  adminId: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type CreateManyAndReturnUser = {
  __typename?: "CreateManyAndReturnUser";
  createdAt: Scalars["DateTime"]["output"];
  email: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  password?: Maybe<Scalars["String"]["output"]>;
  superAdmin: Scalars["Boolean"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type IntFilter = {
  equals?: InputMaybe<Scalars["Int"]["input"]>;
  gt?: InputMaybe<Scalars["Int"]["input"]>;
  gte?: InputMaybe<Scalars["Int"]["input"]>;
  in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  lt?: InputMaybe<Scalars["Int"]["input"]>;
  lte?: InputMaybe<Scalars["Int"]["input"]>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars["Int"]["input"]>>;
};

export type Mutation = {
  __typename?: "Mutation";
  createManyAndReturnTenant: Array<CreateManyAndReturnTenant>;
  createManyAndReturnUser: Array<CreateManyAndReturnUser>;
  createManyTenant: AffectedRowsOutput;
  createManyUser: AffectedRowsOutput;
  createOneTenant: Tenant;
  createOneUser: User;
  deleteManyTenant: AffectedRowsOutput;
  deleteManyUser: AffectedRowsOutput;
  deleteOneTenant?: Maybe<Tenant>;
  deleteOneUser?: Maybe<User>;
  updateManyTenant: AffectedRowsOutput;
  updateManyUser: AffectedRowsOutput;
  updateOneTenant?: Maybe<Tenant>;
  updateOneUser?: Maybe<User>;
  upsertOneTenant: Tenant;
  upsertOneUser: User;
};

export type MutationCreateManyAndReturnTenantArgs = {
  data: Array<TenantCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type MutationCreateManyAndReturnUserArgs = {
  data: Array<UserCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type MutationCreateManyTenantArgs = {
  data: Array<TenantCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type MutationCreateManyUserArgs = {
  data: Array<UserCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type MutationCreateOneTenantArgs = {
  data: TenantCreateInput;
};

export type MutationCreateOneUserArgs = {
  data: UserCreateInput;
};

export type MutationDeleteManyTenantArgs = {
  where?: InputMaybe<TenantWhereInput>;
};

export type MutationDeleteManyUserArgs = {
  where?: InputMaybe<UserWhereInput>;
};

export type MutationDeleteOneTenantArgs = {
  where: TenantWhereUniqueInput;
};

export type MutationDeleteOneUserArgs = {
  where: UserWhereUniqueInput;
};

export type MutationUpdateManyTenantArgs = {
  data: TenantUpdateManyMutationInput;
  where?: InputMaybe<TenantWhereInput>;
};

export type MutationUpdateManyUserArgs = {
  data: UserUpdateManyMutationInput;
  where?: InputMaybe<UserWhereInput>;
};

export type MutationUpdateOneTenantArgs = {
  data: TenantUpdateInput;
  where: TenantWhereUniqueInput;
};

export type MutationUpdateOneUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type MutationUpsertOneTenantArgs = {
  create: TenantCreateInput;
  update: TenantUpdateInput;
  where: TenantWhereUniqueInput;
};

export type MutationUpsertOneUserArgs = {
  create: UserCreateInput;
  update: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars["Int"]["input"]>;
  gt?: InputMaybe<Scalars["Int"]["input"]>;
  gte?: InputMaybe<Scalars["Int"]["input"]>;
  in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  lt?: InputMaybe<Scalars["Int"]["input"]>;
  lte?: InputMaybe<Scalars["Int"]["input"]>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars["Int"]["input"]>>;
};

export type NestedIntNullableFilter = {
  equals?: InputMaybe<Scalars["Int"]["input"]>;
  gt?: InputMaybe<Scalars["Int"]["input"]>;
  gte?: InputMaybe<Scalars["Int"]["input"]>;
  in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  lt?: InputMaybe<Scalars["Int"]["input"]>;
  lte?: InputMaybe<Scalars["Int"]["input"]>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars["Int"]["input"]>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars["String"]["input"]>;
  endsWith?: InputMaybe<Scalars["String"]["input"]>;
  equals?: InputMaybe<Scalars["String"]["input"]>;
  gt?: InputMaybe<Scalars["String"]["input"]>;
  gte?: InputMaybe<Scalars["String"]["input"]>;
  in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  lt?: InputMaybe<Scalars["String"]["input"]>;
  lte?: InputMaybe<Scalars["String"]["input"]>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars["String"]["input"]>>;
  startsWith?: InputMaybe<Scalars["String"]["input"]>;
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars["String"]["input"]>;
  endsWith?: InputMaybe<Scalars["String"]["input"]>;
  equals?: InputMaybe<Scalars["String"]["input"]>;
  gt?: InputMaybe<Scalars["String"]["input"]>;
  gte?: InputMaybe<Scalars["String"]["input"]>;
  in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  lt?: InputMaybe<Scalars["String"]["input"]>;
  lte?: InputMaybe<Scalars["String"]["input"]>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars["String"]["input"]>>;
  startsWith?: InputMaybe<Scalars["String"]["input"]>;
};

export type NestedStringNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedStringNullableFilter>;
  _min?: InputMaybe<NestedStringNullableFilter>;
  contains?: InputMaybe<Scalars["String"]["input"]>;
  endsWith?: InputMaybe<Scalars["String"]["input"]>;
  equals?: InputMaybe<Scalars["String"]["input"]>;
  gt?: InputMaybe<Scalars["String"]["input"]>;
  gte?: InputMaybe<Scalars["String"]["input"]>;
  in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  lt?: InputMaybe<Scalars["String"]["input"]>;
  lte?: InputMaybe<Scalars["String"]["input"]>;
  not?: InputMaybe<NestedStringNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars["String"]["input"]>>;
  startsWith?: InputMaybe<Scalars["String"]["input"]>;
};

export type NestedStringWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedStringFilter>;
  _min?: InputMaybe<NestedStringFilter>;
  contains?: InputMaybe<Scalars["String"]["input"]>;
  endsWith?: InputMaybe<Scalars["String"]["input"]>;
  equals?: InputMaybe<Scalars["String"]["input"]>;
  gt?: InputMaybe<Scalars["String"]["input"]>;
  gte?: InputMaybe<Scalars["String"]["input"]>;
  in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  lt?: InputMaybe<Scalars["String"]["input"]>;
  lte?: InputMaybe<Scalars["String"]["input"]>;
  not?: InputMaybe<NestedStringWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars["String"]["input"]>>;
  startsWith?: InputMaybe<Scalars["String"]["input"]>;
};

export type NestedUuidFilter = {
  equals?: InputMaybe<Scalars["String"]["input"]>;
  gt?: InputMaybe<Scalars["String"]["input"]>;
  gte?: InputMaybe<Scalars["String"]["input"]>;
  in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  lt?: InputMaybe<Scalars["String"]["input"]>;
  lte?: InputMaybe<Scalars["String"]["input"]>;
  not?: InputMaybe<NestedUuidFilter>;
  notIn?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type NestedUuidWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedStringFilter>;
  _min?: InputMaybe<NestedStringFilter>;
  equals?: InputMaybe<Scalars["String"]["input"]>;
  gt?: InputMaybe<Scalars["String"]["input"]>;
  gte?: InputMaybe<Scalars["String"]["input"]>;
  in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  lt?: InputMaybe<Scalars["String"]["input"]>;
  lte?: InputMaybe<Scalars["String"]["input"]>;
  not?: InputMaybe<NestedUuidWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars["String"]["input"]>;
};

export enum NullsOrder {
  First = "first",
  Last = "last",
}

export type Query = {
  __typename?: "Query";
  aggregateTenant: AggregateTenant;
  aggregateUser: AggregateUser;
  findFirstTenant?: Maybe<Tenant>;
  findFirstTenantOrThrow?: Maybe<Tenant>;
  findFirstUser?: Maybe<User>;
  findFirstUserOrThrow?: Maybe<User>;
  getTenant?: Maybe<Tenant>;
  getUser?: Maybe<User>;
  groupByTenant: Array<TenantGroupBy>;
  groupByUser: Array<UserGroupBy>;
  tenant?: Maybe<Tenant>;
  tenants: Array<Tenant>;
  user?: Maybe<User>;
  users: Array<User>;
};

export type QueryAggregateTenantArgs = {
  cursor?: InputMaybe<TenantWhereUniqueInput>;
  orderBy?: InputMaybe<Array<TenantOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<TenantWhereInput>;
};

export type QueryAggregateUserArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<UserWhereInput>;
};

export type QueryFindFirstTenantArgs = {
  cursor?: InputMaybe<TenantWhereUniqueInput>;
  distinct?: InputMaybe<Array<TenantScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TenantOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<TenantWhereInput>;
};

export type QueryFindFirstTenantOrThrowArgs = {
  cursor?: InputMaybe<TenantWhereUniqueInput>;
  distinct?: InputMaybe<Array<TenantScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TenantOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<TenantWhereInput>;
};

export type QueryFindFirstUserArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<UserWhereInput>;
};

export type QueryFindFirstUserOrThrowArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<UserWhereInput>;
};

export type QueryGetTenantArgs = {
  where: TenantWhereUniqueInput;
};

export type QueryGetUserArgs = {
  where: UserWhereUniqueInput;
};

export type QueryGroupByTenantArgs = {
  by: Array<TenantScalarFieldEnum>;
  having?: InputMaybe<TenantScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<TenantOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<TenantWhereInput>;
};

export type QueryGroupByUserArgs = {
  by: Array<UserScalarFieldEnum>;
  having?: InputMaybe<UserScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<UserOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<UserWhereInput>;
};

export type QueryTenantArgs = {
  where: TenantWhereUniqueInput;
};

export type QueryTenantsArgs = {
  cursor?: InputMaybe<TenantWhereUniqueInput>;
  distinct?: InputMaybe<Array<TenantScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TenantOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<TenantWhereInput>;
};

export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};

export type QueryUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<UserWhereInput>;
};

export enum QueryMode {
  Default = "default",
  Insensitive = "insensitive",
}

export enum SortOrder {
  Asc = "asc",
  Desc = "desc",
}

export type SortOrderInput = {
  nulls?: InputMaybe<NullsOrder>;
  sort: SortOrder;
};

export type StringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars["String"]["input"]>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars["String"]["input"]>;
  endsWith?: InputMaybe<Scalars["String"]["input"]>;
  equals?: InputMaybe<Scalars["String"]["input"]>;
  gt?: InputMaybe<Scalars["String"]["input"]>;
  gte?: InputMaybe<Scalars["String"]["input"]>;
  in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  lt?: InputMaybe<Scalars["String"]["input"]>;
  lte?: InputMaybe<Scalars["String"]["input"]>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars["String"]["input"]>>;
  startsWith?: InputMaybe<Scalars["String"]["input"]>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars["String"]["input"]>;
  endsWith?: InputMaybe<Scalars["String"]["input"]>;
  equals?: InputMaybe<Scalars["String"]["input"]>;
  gt?: InputMaybe<Scalars["String"]["input"]>;
  gte?: InputMaybe<Scalars["String"]["input"]>;
  in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  lt?: InputMaybe<Scalars["String"]["input"]>;
  lte?: InputMaybe<Scalars["String"]["input"]>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars["String"]["input"]>>;
  startsWith?: InputMaybe<Scalars["String"]["input"]>;
};

export type StringNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedStringNullableFilter>;
  _min?: InputMaybe<NestedStringNullableFilter>;
  contains?: InputMaybe<Scalars["String"]["input"]>;
  endsWith?: InputMaybe<Scalars["String"]["input"]>;
  equals?: InputMaybe<Scalars["String"]["input"]>;
  gt?: InputMaybe<Scalars["String"]["input"]>;
  gte?: InputMaybe<Scalars["String"]["input"]>;
  in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  lt?: InputMaybe<Scalars["String"]["input"]>;
  lte?: InputMaybe<Scalars["String"]["input"]>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars["String"]["input"]>>;
  startsWith?: InputMaybe<Scalars["String"]["input"]>;
};

export type StringWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedStringFilter>;
  _min?: InputMaybe<NestedStringFilter>;
  contains?: InputMaybe<Scalars["String"]["input"]>;
  endsWith?: InputMaybe<Scalars["String"]["input"]>;
  equals?: InputMaybe<Scalars["String"]["input"]>;
  gt?: InputMaybe<Scalars["String"]["input"]>;
  gte?: InputMaybe<Scalars["String"]["input"]>;
  in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  lt?: InputMaybe<Scalars["String"]["input"]>;
  lte?: InputMaybe<Scalars["String"]["input"]>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars["String"]["input"]>>;
  startsWith?: InputMaybe<Scalars["String"]["input"]>;
};

export type Tenant = {
  __typename?: "Tenant";
  _count?: Maybe<TenantCount>;
  admin: User;
  adminId: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  users: Array<User>;
};

export type TenantUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<UserWhereInput>;
};

export type TenantCount = {
  __typename?: "TenantCount";
  users: Scalars["Int"]["output"];
};

export type TenantCountUsersArgs = {
  where?: InputMaybe<UserWhereInput>;
};

export type TenantCountAggregate = {
  __typename?: "TenantCountAggregate";
  _all: Scalars["Int"]["output"];
  adminId: Scalars["Int"]["output"];
  createdAt: Scalars["Int"]["output"];
  id: Scalars["Int"]["output"];
  name: Scalars["Int"]["output"];
  updatedAt: Scalars["Int"]["output"];
};

export type TenantCountOrderByAggregateInput = {
  adminId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type TenantCreateInput = {
  admin: UserCreateNestedOneWithoutAdminOfTenantsInput;
  id?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  users?: InputMaybe<UserCreateNestedManyWithoutTenantsInput>;
};

export type TenantCreateManyInput = {
  adminId: Scalars["String"]["input"];
  id?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
};

export type TenantCreateNestedManyWithoutUsersInput = {
  connect?: InputMaybe<Array<TenantWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TenantCreateOrConnectWithoutUsersInput>>;
  create?: InputMaybe<Array<TenantCreateWithoutUsersInput>>;
};

export type TenantCreateOrConnectWithoutUsersInput = {
  create: TenantCreateWithoutUsersInput;
  where: TenantWhereUniqueInput;
};

export type TenantCreateWithoutUsersInput = {
  admin: UserCreateNestedOneWithoutAdminOfTenantsInput;
  id?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
};

export type TenantGroupBy = {
  __typename?: "TenantGroupBy";
  _count?: Maybe<TenantCountAggregate>;
  _max?: Maybe<TenantMaxAggregate>;
  _min?: Maybe<TenantMinAggregate>;
  adminId: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type TenantListRelationFilter = {
  every?: InputMaybe<TenantWhereInput>;
  none?: InputMaybe<TenantWhereInput>;
  some?: InputMaybe<TenantWhereInput>;
};

export type TenantMaxAggregate = {
  __typename?: "TenantMaxAggregate";
  adminId?: Maybe<Scalars["String"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type TenantMaxOrderByAggregateInput = {
  adminId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type TenantMinAggregate = {
  __typename?: "TenantMinAggregate";
  adminId?: Maybe<Scalars["String"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type TenantMinOrderByAggregateInput = {
  adminId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type TenantOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type TenantOrderByWithAggregationInput = {
  _count?: InputMaybe<TenantCountOrderByAggregateInput>;
  _max?: InputMaybe<TenantMaxOrderByAggregateInput>;
  _min?: InputMaybe<TenantMinOrderByAggregateInput>;
  adminId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type TenantOrderByWithRelationInput = {
  admin?: InputMaybe<UserOrderByWithRelationInput>;
  adminId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  users?: InputMaybe<UserOrderByRelationAggregateInput>;
};

export enum TenantScalarFieldEnum {
  AdminId = "adminId",
  CreatedAt = "createdAt",
  Id = "id",
  Name = "name",
  UpdatedAt = "updatedAt",
}

export type TenantScalarWhereInput = {
  AND?: InputMaybe<Array<TenantScalarWhereInput>>;
  NOT?: InputMaybe<Array<TenantScalarWhereInput>>;
  OR?: InputMaybe<Array<TenantScalarWhereInput>>;
  adminId?: InputMaybe<UuidFilter>;
  id?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
};

export type TenantScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<TenantScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<TenantScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<TenantScalarWhereWithAggregatesInput>>;
  adminId?: InputMaybe<UuidWithAggregatesFilter>;
  id?: InputMaybe<UuidWithAggregatesFilter>;
  name?: InputMaybe<StringWithAggregatesFilter>;
};

export type TenantUpdateInput = {
  admin?: InputMaybe<UserUpdateOneRequiredWithoutAdminOfTenantsNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  users?: InputMaybe<UserUpdateManyWithoutTenantsNestedInput>;
};

export type TenantUpdateManyMutationInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type TenantUpdateManyWithWhereWithoutUsersInput = {
  data: TenantUpdateManyMutationInput;
  where: TenantScalarWhereInput;
};

export type TenantUpdateManyWithoutUsersNestedInput = {
  connect?: InputMaybe<Array<TenantWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TenantCreateOrConnectWithoutUsersInput>>;
  create?: InputMaybe<Array<TenantCreateWithoutUsersInput>>;
  delete?: InputMaybe<Array<TenantWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<TenantScalarWhereInput>>;
  disconnect?: InputMaybe<Array<TenantWhereUniqueInput>>;
  set?: InputMaybe<Array<TenantWhereUniqueInput>>;
  update?: InputMaybe<Array<TenantUpdateWithWhereUniqueWithoutUsersInput>>;
  updateMany?: InputMaybe<Array<TenantUpdateManyWithWhereWithoutUsersInput>>;
  upsert?: InputMaybe<Array<TenantUpsertWithWhereUniqueWithoutUsersInput>>;
};

export type TenantUpdateWithWhereUniqueWithoutUsersInput = {
  data: TenantUpdateWithoutUsersInput;
  where: TenantWhereUniqueInput;
};

export type TenantUpdateWithoutUsersInput = {
  admin?: InputMaybe<UserUpdateOneRequiredWithoutAdminOfTenantsNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type TenantUpsertWithWhereUniqueWithoutUsersInput = {
  create: TenantCreateWithoutUsersInput;
  update: TenantUpdateWithoutUsersInput;
  where: TenantWhereUniqueInput;
};

export type TenantWhereInput = {
  AND?: InputMaybe<Array<TenantWhereInput>>;
  NOT?: InputMaybe<Array<TenantWhereInput>>;
  OR?: InputMaybe<Array<TenantWhereInput>>;
  admin?: InputMaybe<UserRelationFilter>;
  adminId?: InputMaybe<UuidFilter>;
  id?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
  users?: InputMaybe<UserListRelationFilter>;
};

export type TenantWhereUniqueInput = {
  AND?: InputMaybe<Array<TenantWhereInput>>;
  NOT?: InputMaybe<Array<TenantWhereInput>>;
  OR?: InputMaybe<Array<TenantWhereInput>>;
  admin?: InputMaybe<UserRelationFilter>;
  adminId?: InputMaybe<UuidFilter>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  users?: InputMaybe<UserListRelationFilter>;
};

export type User = {
  __typename?: "User";
  _count?: Maybe<UserCount>;
  adminOfTenants: Array<Tenant>;
  createdAt: Scalars["DateTime"]["output"];
  email: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  providers: Array<UserProvider>;
  superAdmin: Scalars["Boolean"]["output"];
  tenants: Array<Tenant>;
  updatedAt: Scalars["DateTime"]["output"];
};

export type UserAdminOfTenantsArgs = {
  cursor?: InputMaybe<TenantWhereUniqueInput>;
  distinct?: InputMaybe<Array<TenantScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TenantOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<TenantWhereInput>;
};

export type UserProvidersArgs = {
  cursor?: InputMaybe<UserProviderWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserProviderScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserProviderOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<UserProviderWhereInput>;
};

export type UserTenantsArgs = {
  cursor?: InputMaybe<TenantWhereUniqueInput>;
  distinct?: InputMaybe<Array<TenantScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TenantOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<TenantWhereInput>;
};

export type UserCount = {
  __typename?: "UserCount";
  adminOfTenants: Scalars["Int"]["output"];
  providers: Scalars["Int"]["output"];
  tenants: Scalars["Int"]["output"];
};

export type UserCountAdminOfTenantsArgs = {
  where?: InputMaybe<TenantWhereInput>;
};

export type UserCountProvidersArgs = {
  where?: InputMaybe<UserProviderWhereInput>;
};

export type UserCountTenantsArgs = {
  where?: InputMaybe<TenantWhereInput>;
};

export type UserCountAggregate = {
  __typename?: "UserCountAggregate";
  _all: Scalars["Int"]["output"];
  createdAt: Scalars["Int"]["output"];
  email: Scalars["Int"]["output"];
  id: Scalars["Int"]["output"];
  name: Scalars["Int"]["output"];
  password: Scalars["Int"]["output"];
  superAdmin: Scalars["Int"]["output"];
  updatedAt: Scalars["Int"]["output"];
};

export type UserCountOrderByAggregateInput = {
  email?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type UserCreateInput = {
  email: Scalars["String"]["input"];
  id?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  tenants?: InputMaybe<TenantCreateNestedManyWithoutUsersInput>;
};

export type UserCreateManyInput = {
  email: Scalars["String"]["input"];
  id?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type UserCreateNestedManyWithoutTenantsInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCreateOrConnectWithoutTenantsInput>>;
  create?: InputMaybe<Array<UserCreateWithoutTenantsInput>>;
};

export type UserCreateNestedOneWithoutAdminOfTenantsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutAdminOfTenantsInput>;
  create?: InputMaybe<UserCreateWithoutAdminOfTenantsInput>;
};

export type UserCreateOrConnectWithoutAdminOfTenantsInput = {
  create: UserCreateWithoutAdminOfTenantsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutTenantsInput = {
  create: UserCreateWithoutTenantsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateWithoutAdminOfTenantsInput = {
  email: Scalars["String"]["input"];
  id?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  tenants?: InputMaybe<TenantCreateNestedManyWithoutUsersInput>;
};

export type UserCreateWithoutTenantsInput = {
  email: Scalars["String"]["input"];
  id?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type UserGroupBy = {
  __typename?: "UserGroupBy";
  _count?: Maybe<UserCountAggregate>;
  _max?: Maybe<UserMaxAggregate>;
  _min?: Maybe<UserMinAggregate>;
  createdAt: Scalars["DateTime"]["output"];
  email: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  password?: Maybe<Scalars["String"]["output"]>;
  superAdmin: Scalars["Boolean"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type UserListRelationFilter = {
  every?: InputMaybe<UserWhereInput>;
  none?: InputMaybe<UserWhereInput>;
  some?: InputMaybe<UserWhereInput>;
};

export type UserMaxAggregate = {
  __typename?: "UserMaxAggregate";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  email?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  password?: Maybe<Scalars["String"]["output"]>;
  superAdmin?: Maybe<Scalars["Boolean"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type UserMaxOrderByAggregateInput = {
  email?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type UserMinAggregate = {
  __typename?: "UserMinAggregate";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  email?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  password?: Maybe<Scalars["String"]["output"]>;
  superAdmin?: Maybe<Scalars["Boolean"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type UserMinOrderByAggregateInput = {
  email?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type UserOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type UserOrderByWithAggregationInput = {
  _count?: InputMaybe<UserCountOrderByAggregateInput>;
  _max?: InputMaybe<UserMaxOrderByAggregateInput>;
  _min?: InputMaybe<UserMinOrderByAggregateInput>;
  email?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrderInput>;
};

export type UserOrderByWithRelationInput = {
  email?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrderInput>;
  tenants?: InputMaybe<TenantOrderByRelationAggregateInput>;
};

export type UserProvider = {
  __typename?: "UserProvider";
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  provider: Scalars["String"]["output"];
  providerId: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  userId: Scalars["String"]["output"];
};

export type UserProviderOrderByWithRelationInput = {
  id?: InputMaybe<SortOrder>;
  provider?: InputMaybe<SortOrder>;
  providerId?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
};

export type UserProviderProviderProviderIdCompoundUniqueInput = {
  provider: Scalars["String"]["input"];
  providerId: Scalars["String"]["input"];
};

export enum UserProviderScalarFieldEnum {
  AccessToken = "accessToken",
  CreatedAt = "createdAt",
  Id = "id",
  Provider = "provider",
  ProviderId = "providerId",
  UpdatedAt = "updatedAt",
  UserId = "userId",
}

export type UserProviderWhereInput = {
  AND?: InputMaybe<Array<UserProviderWhereInput>>;
  NOT?: InputMaybe<Array<UserProviderWhereInput>>;
  OR?: InputMaybe<Array<UserProviderWhereInput>>;
  id?: InputMaybe<IntFilter>;
  provider?: InputMaybe<StringFilter>;
  providerId?: InputMaybe<StringFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type UserProviderWhereUniqueInput = {
  AND?: InputMaybe<Array<UserProviderWhereInput>>;
  NOT?: InputMaybe<Array<UserProviderWhereInput>>;
  OR?: InputMaybe<Array<UserProviderWhereInput>>;
  id?: InputMaybe<Scalars["Int"]["input"]>;
  provider?: InputMaybe<StringFilter>;
  providerId?: InputMaybe<StringFilter>;
  provider_providerId?: InputMaybe<UserProviderProviderProviderIdCompoundUniqueInput>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type UserRelationFilter = {
  is?: InputMaybe<UserWhereInput>;
  isNot?: InputMaybe<UserWhereInput>;
};

export enum UserScalarFieldEnum {
  CreatedAt = "createdAt",
  Email = "email",
  Id = "id",
  Name = "name",
  Password = "password",
  SuperAdmin = "superAdmin",
  UpdatedAt = "updatedAt",
}

export type UserScalarWhereInput = {
  AND?: InputMaybe<Array<UserScalarWhereInput>>;
  NOT?: InputMaybe<Array<UserScalarWhereInput>>;
  OR?: InputMaybe<Array<UserScalarWhereInput>>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringNullableFilter>;
};

export type UserScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<UserScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<UserScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<UserScalarWhereWithAggregatesInput>>;
  email?: InputMaybe<StringWithAggregatesFilter>;
  id?: InputMaybe<UuidWithAggregatesFilter>;
  name?: InputMaybe<StringNullableWithAggregatesFilter>;
};

export type UserUpdateInput = {
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  tenants?: InputMaybe<TenantUpdateManyWithoutUsersNestedInput>;
};

export type UserUpdateManyMutationInput = {
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type UserUpdateManyWithWhereWithoutTenantsInput = {
  data: UserUpdateManyMutationInput;
  where: UserScalarWhereInput;
};

export type UserUpdateManyWithoutTenantsNestedInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCreateOrConnectWithoutTenantsInput>>;
  create?: InputMaybe<Array<UserCreateWithoutTenantsInput>>;
  delete?: InputMaybe<Array<UserWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UserScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UserWhereUniqueInput>>;
  set?: InputMaybe<Array<UserWhereUniqueInput>>;
  update?: InputMaybe<Array<UserUpdateWithWhereUniqueWithoutTenantsInput>>;
  updateMany?: InputMaybe<Array<UserUpdateManyWithWhereWithoutTenantsInput>>;
  upsert?: InputMaybe<Array<UserUpsertWithWhereUniqueWithoutTenantsInput>>;
};

export type UserUpdateOneRequiredWithoutAdminOfTenantsNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutAdminOfTenantsInput>;
  create?: InputMaybe<UserCreateWithoutAdminOfTenantsInput>;
  update?: InputMaybe<UserUpdateToOneWithWhereWithoutAdminOfTenantsInput>;
  upsert?: InputMaybe<UserUpsertWithoutAdminOfTenantsInput>;
};

export type UserUpdateToOneWithWhereWithoutAdminOfTenantsInput = {
  data: UserUpdateWithoutAdminOfTenantsInput;
  where?: InputMaybe<UserWhereInput>;
};

export type UserUpdateWithWhereUniqueWithoutTenantsInput = {
  data: UserUpdateWithoutTenantsInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateWithoutAdminOfTenantsInput = {
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  tenants?: InputMaybe<TenantUpdateManyWithoutUsersNestedInput>;
};

export type UserUpdateWithoutTenantsInput = {
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type UserUpsertWithWhereUniqueWithoutTenantsInput = {
  create: UserCreateWithoutTenantsInput;
  update: UserUpdateWithoutTenantsInput;
  where: UserWhereUniqueInput;
};

export type UserUpsertWithoutAdminOfTenantsInput = {
  create: UserCreateWithoutAdminOfTenantsInput;
  update: UserUpdateWithoutAdminOfTenantsInput;
  where?: InputMaybe<UserWhereInput>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringNullableFilter>;
  tenants?: InputMaybe<TenantListRelationFilter>;
};

export type UserWhereUniqueInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<StringNullableFilter>;
  tenants?: InputMaybe<TenantListRelationFilter>;
};

export type UuidFilter = {
  equals?: InputMaybe<Scalars["String"]["input"]>;
  gt?: InputMaybe<Scalars["String"]["input"]>;
  gte?: InputMaybe<Scalars["String"]["input"]>;
  in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  lt?: InputMaybe<Scalars["String"]["input"]>;
  lte?: InputMaybe<Scalars["String"]["input"]>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedUuidFilter>;
  notIn?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type UuidWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedStringFilter>;
  _min?: InputMaybe<NestedStringFilter>;
  equals?: InputMaybe<Scalars["String"]["input"]>;
  gt?: InputMaybe<Scalars["String"]["input"]>;
  gte?: InputMaybe<Scalars["String"]["input"]>;
  in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  lt?: InputMaybe<Scalars["String"]["input"]>;
  lte?: InputMaybe<Scalars["String"]["input"]>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedUuidWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type GetTenantQueryVariables = Exact<{
  tenantId?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type GetTenantQuery = {
  __typename?: "Query";
  tenant?: { __typename?: "Tenant"; id: string; name: string; adminId: string } | null;
};

export type GetTenantWithUsersQueryVariables = Exact<{
  tenantId?: InputMaybe<Scalars["String"]["input"]>;
  userIds?: InputMaybe<Array<Scalars["String"]["input"]> | Scalars["String"]["input"]>;
}>;

export type GetTenantWithUsersQuery = {
  __typename?: "Query";
  tenant?: {
    __typename?: "Tenant";
    id: string;
    name: string;
    users: Array<{ __typename?: "User"; id: string; name?: string | null }>;
  } | null;
};

export type GetUserQueryVariables = Exact<{
  id?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type GetUserQuery = {
  __typename?: "Query";
  user?: {
    __typename?: "User";
    id: string;
    email: string;
    name?: string | null;
    superAdmin: boolean;
    tenants: Array<{ __typename?: "Tenant"; id: string; name: string; adminId: string }>;
  } | null;
};

export type GetTenantUsersQueryVariables = Exact<{
  tenantId?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type GetTenantUsersQuery = {
  __typename?: "Query";
  users: Array<{ __typename?: "User"; id: string; name?: string | null; email: string }>;
};

export const GetTenantDocument = gql`
  query getTenant($tenantId: String = "") {
    tenant(where: { id: $tenantId }) {
      id
      name
      adminId
    }
  }
`;
export const GetTenantWithUsersDocument = gql`
  query getTenantWithUsers($tenantId: String = "", $userIds: [String!] = "") {
    tenant(where: { id: $tenantId }) {
      id
      name
      users(where: { id: { in: $userIds } }) {
        id
        name
      }
    }
  }
`;
export const GetUserDocument = gql`
  query getUser($id: String = "") {
    user(where: { id: $id }) {
      id
      email
      name
      superAdmin
      tenants {
        id
        name
        adminId
      }
    }
  }
`;
export const GetTenantUsersDocument = gql`
  query getTenantUsers($tenantId: String = "") {
    users(where: { tenants: { some: { id: { equals: $tenantId } } } }) {
      id
      name
      email
    }
  }
`;
