import { Router } from "express";
import prisma from "../prisma";
import logger from "../logger";
import gqlClient from "../graphql/urql";
import {
  GetTenantDocument,
  GetTenantQuery,
  GetTenantQueryVariables,
  GetUserDocument,
  GetUserQuery,
  GetUserQueryVariables,
} from "../graphql/generated/graphql";
import grpcClient from "../proto/scheduleClient";

const router = Router();

/**
 * @openapi
 * "/api/classroom/{tenantId}":
 *   post:
 *     summary: Create a classroom
 *     description: Creating a classroom requires admin privileges (tenant or super admin)
 *     tags: [Classroom]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tenantId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               teacherId:
 *                 type: string
 *             required: [name, teacherId]
 *     responses:
 *       200:
 *         description: "Classroom created"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 classroom:
 *                   $ref: "#/components/schemas/Classroom"
 *               required: [message, classroom]
 *       "400":
 *         $ref: "#/components/responses/MissingParameters"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       403:
 *         $ref: "#/components/responses/Forbidden"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 *       500:
 *         $ref: "#/components/responses/ServerError"
 */
router.post("/:tenantId", async (req, res) => {
  // Shouldn't happen (user should be authenticated)
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  let name = req.body.name;
  let teacherId = req.body.teacherId;

  if (!name || !teacherId) {
    logger.debug(
      { request: { path: req.originalUrl, method: req.method, body: req.body } },
      "Missing required parameters"
    );
    res.status(400).json({ message: "Classroom name and teacher are required" });
    return;
  }

  let isAdmin = req.user?.superAdmin;

  // Check if tenant exists
  const { data: userData } = await gqlClient.query<GetTenantQuery, GetTenantQueryVariables>(GetTenantDocument, {
    tenantId: req.params.tenantId,
  });

  if (!userData?.tenant) {
    logger.debug(
      { request: { path: req.originalUrl, method: req.method, params: req.params }, user: req.user },
      "Tenant not found"
    );
    res.status(404).json({ message: "Tenant not found" });
    return;
  }

  // Check if user is admin of the tenant
  if (userData.tenant.adminId === req.user.id) {
    isAdmin = true;
  }

  // Check if user can create classrooms
  if (!isAdmin) {
    logger.info(
      { request: { path: req.originalUrl, method: req.method, body: req.body, params: req.params }, user: req.user },
      "Unauthorized"
    );
    res.status(401).send("Unauthorized");
    return;
  }

  // Check if teacher exists
  const { data: teacherData } = await gqlClient.query<GetUserQuery, GetUserQueryVariables>(GetUserDocument, {
    id: teacherId,
  });

  if (!teacherData?.user || teacherData.user.tenants.find((t) => t.id === req.params.tenantId) === undefined) {
    logger.debug(
      { request: { path: req.originalUrl, method: req.method, body: req.body, params: req.params }, user: req.user },
      "Teacher not found"
    );
    res.status(404).json({ message: "Teacher not found" });
    return;
  }

  // Create classroom
  const classroom = await prisma.classroom.create({
    data: {
      name,
      tenantId: req.params.tenantId,
      teachers: [teacherId],
      content: "",
    },
  });

  logger.info(
    { request: { path: req.originalUrl, method: req.method }, user: req.user, classroom: classroom },
    "Classroom created"
  );
  res.json({ message: "Classroom created" });
});

/**
 * @openapi
 * "/api/classroom/{tenantId}/{classroomId}":
 *   get:
 *     summary: Get a classroom
 *     description: Gets classroom (teachers see all, students can't see other students)
 *     tags: [Classroom]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tenantId
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: classroomId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: "Classroom"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ClassroomFull"
 *       "400":
 *         $ref: "#/components/responses/MissingParameters"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       403:
 *         $ref: "#/components/responses/Forbidden"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 *       500:
 *         $ref: "#/components/responses/ServerError"
 */
router.get("/:tenantId/:classroomId", async (req, res) => {
  // Shouldn't happen (user should be authenticated)
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  let isAdmin = req.user?.superAdmin;

  // Check if tenant exists
  const { data: userData } = await gqlClient.query<GetTenantQuery, GetTenantQueryVariables>(GetTenantDocument, {
    tenantId: req.params.tenantId,
  });

  // Check if user is admin of the tenant
  if (userData?.tenant?.adminId === req.user.id) {
    isAdmin = true;
  }

  // Check if user is teacher or student
  const classroomUsers = await prisma.classroom.findUnique({
    where: {
      id: req.params.classroomId,
      tenantId: req.params.tenantId,
    },
    select: {
      teachers: true,
      students: true,
    },
  });

  if (!classroomUsers) {
    logger.debug(
      { request: { path: req.originalUrl, method: req.method, params: req.params }, user: req.user },
      "Classroom not found"
    );
    res.status(404).json({ message: "Classroom not found" });
    return;
  }

  const isTeacher = classroomUsers?.teachers.includes(req.user.id);
  const isStudent = classroomUsers?.students.includes(req.user.id);

  if (!isTeacher && !isStudent && !isAdmin) {
    logger.info(
      { request: { path: req.originalUrl, method: req.method, params: req.params }, user: req.user },
      "Unauthorized"
    );
    res.status(401).send("Unauthorized");
    return;
  }

  // Return all classroom data if user is admin or teacher
  if (isAdmin || isTeacher) {
    const classroom = await prisma.classroom.findUnique({
      where: {
        id: req.params.classroomId,
        tenantId: req.params.tenantId,
      },
      select: {
        id: true,
        name: true,
        teachers: true,
        students: true,
        content: true,
        forumPosts: {
          select: {
            id: true,
            author: true,
            content: true,
            createdAt: true,
          },
        },
      },
    });

    logger.info(
      { request: { path: req.originalUrl, method: req.method }, user: req.user, classroom: classroom },
      "Classroom fetched (teacher)"
    );
    res.json(classroom);
    return;
  }

  // Return limited classroom data if user is student
  const classroom = await prisma.classroom.findUnique({
    where: {
      id: req.params.classroomId,
      tenantId: req.params.tenantId,
    },
    select: {
      id: true,
      name: true,
      teachers: true,
      content: true,
      forumPosts: {
        select: {
          id: true,
          author: true,
          content: true,
          createdAt: true,
        },
      },
    },
  });

  logger.info(
    { request: { path: req.originalUrl, method: req.method }, user: req.user, classroom: classroom },
    "Classroom fetched (student)"
  );
  res.json(classroom);
});

/**
 * @openapi
 * "/api/classroom/{tenantId}/{classroomId}":
 *   patch:
 *     summary: Add student or teacher to classroom
 *     description: Adding a student or teacher to a classroom requires teacher or admin (tenant or super admin)
 *     tags: [Classroom]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tenantId
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: classroomId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *               teacherId:
 *                 type: string
 *     responses:
 *       200:
 *         description: "Student or teacher added"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Response"
 *       "400":
 *         $ref: "#/components/responses/MissingParameters"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       403:
 *         $ref: "#/components/responses/Forbidden"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 *       500:
 *         $ref: "#/components/responses/ServerError"
 */
router.patch("/:tenantId/:classroomId", async (req, res) => {
  // Shouldn't happen (user should be authenticated)
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  let isAdmin = req.user?.superAdmin;

  // Check if tenant exists
  const { data: userData } = await gqlClient.query<GetTenantQuery, GetTenantQueryVariables>(GetTenantDocument, {
    tenantId: req.params.tenantId,
  });

  // Check if user is admin of the tenant
  if (userData?.tenant?.adminId === req.user.id) {
    isAdmin = true;
  }

  // Check if user is teacher or student
  const classroomUsers = await prisma.classroom.findUnique({
    where: {
      id: req.params.classroomId,
      tenantId: req.params.tenantId,
    },
    select: {
      teachers: true,
      students: true,
    },
  });

  if (!classroomUsers) {
    logger.debug(
      { request: { path: req.originalUrl, method: req.method, params: req.params }, user: req.user },
      "Classroom not found"
    );
    res.status(404).json({ message: "Classroom not found" });
    return;
  }

  const isTeacher = classroomUsers?.teachers.includes(req.user.id);

  if (!isTeacher && !isAdmin) {
    logger.info(
      { request: { path: req.originalUrl, method: req.method, params: req.params }, user: req.user },
      "Unauthorized"
    );
    res.status(401).send("Unauthorized");
    return;
  }

  // Add student or teacher to classroom
  const studentId = req.body.studentId;
  const teacherId = req.body.teacherId;

  if ((!studentId && !teacherId) || (studentId && teacherId)) {
    logger.debug(
      { request: { path: req.originalUrl, method: req.method, body: req.body, params: req.params }, user: req.user },
      "Incorrect parameters"
    );
    res.status(400).json({ message: "Student OR teacher required" });
    return;
  }

  if (studentId) {
    const { data: studentData } = await gqlClient.query<GetUserQuery, GetUserQueryVariables>(GetUserDocument, {
      id: studentId,
    });

    if (!studentData?.user || studentData.user.tenants.find((t) => t.id === req.params.tenantId) === undefined) {
      logger.debug(
        { request: { path: req.originalUrl, method: req.method, body: req.body, params: req.params }, user: req.user },
        "Student not found"
      );
      res.status(404).json({ message: "Student not found" });
      return;
    }

    await prisma.classroom.update({
      where: {
        id: req.params.classroomId,
      },
      data: {
        students: {
          push: studentId,
        },
      },
    });

    logger.info(
      { request: { path: req.originalUrl, method: req.method, body: req.body, params: req.params }, user: req.user },
      "Student added"
    );
    res.json({ message: "Student added" });
  } else if (teacherId) {
    const { data: teacherData } = await gqlClient.query<GetUserQuery, GetUserQueryVariables>(GetUserDocument, {
      id: teacherId,
    });

    if (!teacherData?.user || teacherData.user.tenants.find((t) => t.id === req.params.tenantId) === undefined) {
      logger.debug(
        { request: { path: req.originalUrl, method: req.method, body: req.body, params: req.params }, user: req.user },
        "Teacher not found"
      );
      res.status(404).json({ message: "Teacher not found" });
      return;
    }

    await prisma.classroom.update({
      where: {
        id: req.params.classroomId,
      },
      data: {
        teachers: {
          push: teacherId,
        },
      },
    });

    logger.info(
      { request: { path: req.originalUrl, method: req.method, body: req.body, params: req.params }, user: req.user },
      "Teacher added"
    );
    res.json({ message: "Teacher added" });
  }
});

/**
 * @openapi
 * "/api/classroom/{tenantId}/{classroomId}":
 *   delete:
 *     summary: Remove student or teacher from classroom
 *     description: Removing a student or teacher from a classroom requires teacher or admin (tenant or super admin)
 *     tags: [Classroom]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tenantId
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: classroomId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *               teacherId:
 *                 type: string
 *     responses:
 *       200:
 *         description: "Student or teacher removed"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Response"
 *       "400":
 *         $ref: "#/components/responses/MissingParameters"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       403:
 *         $ref: "#/components/responses/Forbidden"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 *       500:
 *         $ref: "#/components/responses/ServerError"
 */
router.delete("/:tenantId/:classroomId", async (req, res) => {
  // Shouldn't happen (user should be authenticated)
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  let isAdmin = req.user?.superAdmin;

  // Check if tenant exists
  const { data: userData } = await gqlClient.query<GetTenantQuery, GetTenantQueryVariables>(GetTenantDocument, {
    tenantId: req.params.tenantId,
  });

  // Check if user is admin of the tenant
  if (userData?.tenant?.adminId === req.user.id) {
    isAdmin = true;
  }

  // Check if user is teacher or student
  const classroomUsers = await prisma.classroom.findUnique({
    where: {
      id: req.params.classroomId,
      tenantId: req.params.tenantId,
    },
    select: {
      teachers: true,
      students: true,
    },
  });

  if (!classroomUsers) {
    logger.debug(
      { request: { path: req.originalUrl, method: req.method, params: req.params }, user: req.user },
      "Classroom not found"
    );
    res.status(404).json({ message: "Classroom not found" });
    return;
  }

  const isTeacher = classroomUsers?.teachers.includes(req.user.id);

  if (!isTeacher && !isAdmin) {
    logger.info(
      { request: { path: req.originalUrl, method: req.method, params: req.params }, user: req.user },
      "Unauthorized"
    );
    res.status(401).send("Unauthorized");
    return;
  }

  // Remove student or teacher from classroom
  const studentId = req.body.studentId;
  const teacherId = req.body.teacherId;

  if ((!studentId && !teacherId) || (studentId && teacherId)) {
    logger.debug(
      { request: { path: req.originalUrl, method: req.method, body: req.body, params: req.params }, user: req.user },
      "Incorrect parameters"
    );
    res.status(400).json({ message: "Student OR teacher required" });
    return;
  }

  if (studentId) {
    await prisma.classroom.update({
      where: {
        id: req.params.classroomId,
      },
      data: {
        students: {
          set: classroomUsers.students.filter((s) => s !== studentId),
        },
      },
    });

    logger.info(
      { request: { path: req.originalUrl, method: req.method, body: req.body, params: req.params }, user: req.user },
      "Student removed"
    );
    res.json({ message: "Student removed" });
  } else if (teacherId) {
    await prisma.classroom.update({
      where: {
        id: req.params.classroomId,
      },
      data: {
        teachers: {
          set: classroomUsers.teachers.filter((t) => t !== teacherId),
        },
      },
    });

    logger.info(
      { request: { path: req.originalUrl, method: req.method, body: req.body, params: req.params }, user: req.user },
      "Teacher removed"
    );
    res.json({ message: "Teacher removed" });
  }
});

/**
 * @openapi
 * "/api/classroom/{tenantId}/{classroomId}/content":
 *   patch:
 *     summary: Modify classroom content
 *     description: Modifying classroom content requires teacher or admin (tenant or super admin)
 *     tags: [Classroom]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tenantId
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: classroomId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *             required: [content]
 *     responses:
 *       200:
 *         description: "Content modified"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Response"
 *       "400":
 *         $ref: "#/components/responses/MissingParameters"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       403:
 *         $ref: "#/components/responses/Forbidden"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 *       500:
 *         $ref: "#/components/responses/ServerError"
 */
router.patch("/:tenantId/:classroomId/content", async (req, res) => {
  // Shouldn't happen (user should be authenticated)
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  let isAdmin = req.user?.superAdmin;

  // Check if tenant exists
  const { data: userData } = await gqlClient.query<GetTenantQuery, GetTenantQueryVariables>(GetTenantDocument, {
    tenantId: req.params.tenantId,
  });

  // Check if user is admin of the tenant
  if (userData?.tenant?.adminId === req.user.id) {
    isAdmin = true;
  }

  // Check if user is teacher
  const classroomUsers = await prisma.classroom.findUnique({
    where: {
      id: req.params.classroomId,
      tenantId: req.params.tenantId,
    },
    select: {
      teachers: true,
    },
  });

  if (!classroomUsers) {
    logger.debug(
      { request: { path: req.originalUrl, method: req.method, params: req.params }, user: req.user },
      "Classroom not found"
    );
    res.status(404).json({ message: "Classroom not found" });
    return;
  }

  const isTeacher = classroomUsers?.teachers.includes(req.user.id);

  if (!isTeacher && !isAdmin) {
    logger.info(
      { request: { path: req.originalUrl, method: req.method, params: req.params }, user: req.user },
      "Unauthorized"
    );
    res.status(401).send("Unauthorized");
    return;
  }

  // Modify classroom content
  const content = req.body.content;

  if (!content) {
    logger.debug(
      { request: { path: req.originalUrl, method: req.method, body: req.body, params: req.params }, user: req.user },
      "Missing required parameters"
    );
    res.status(400).json({ message: "Content required" });
    return;
  }

  await prisma.classroom.update({
    where: {
      id: req.params.classroomId,
      tenantId: req.params.tenantId,
    },
    data: {
      content,
    },
  });

  logger.info(
    { request: { path: req.originalUrl, method: req.method, body: req.body, params: req.params }, user: req.user },
    "Content modified"
  );
  res.json({ message: "Content modified" });
});

/**
 * @openapi
 * "/api/classroom/{tenantId}/{classroomId}/forumPost":
 *   post:
 *     summary: Post to forum
 *     description: Modifying classroom content requires student, teacher or admin (tenant or super admin)
 *     tags: [Classroom]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tenantId
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: classroomId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *             required: [content]
 *     responses:
 *       200:
 *         description: "Post created"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Response"
 *       "400":
 *         $ref: "#/components/responses/MissingParameters"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       403:
 *         $ref: "#/components/responses/Forbidden"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 *       500:
 *         $ref: "#/components/responses/ServerError"
 */
router.post("/:tenantId/:classroomId/forumPost", async (req, res) => {
  // Shouldn't happen (user should be authenticated)
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  let isAdmin = req.user?.superAdmin;

  // Check if tenant exists
  const { data: userData } = await gqlClient.query<GetTenantQuery, GetTenantQueryVariables>(GetTenantDocument, {
    tenantId: req.params.tenantId,
  });

  // Check if user is admin of the tenant
  if (userData?.tenant?.adminId === req.user.id) {
    isAdmin = true;
  }

  // Check if user is teacher or student
  const classroomUsers = await prisma.classroom.findUnique({
    where: {
      id: req.params.classroomId,
      tenantId: req.params.tenantId,
    },
    select: {
      teachers: true,
      students: true,
    },
  });

  if (!classroomUsers) {
    logger.debug(
      { request: { path: req.originalUrl, method: req.method, params: req.params }, user: req.user },
      "Classroom not found"
    );
    res.status(404).json({ message: "Classroom not found" });
    return;
  }

  const isTeacher = classroomUsers?.teachers.includes(req.user.id);
  const isStudent = classroomUsers?.students.includes(req.user.id);

  if (!isTeacher && !isStudent && !isAdmin) {
    logger.info(
      { request: { path: req.originalUrl, method: req.method, params: req.params }, user: req.user },
      "Unauthorized"
    );
    res.status(401).send("Unauthorized");
    return;
  }

  // Post to forum
  const content = req.body.content;

  if (!content) {
    logger.debug(
      { request: { path: req.originalUrl, method: req.method, body: req.body, params: req.params }, user: req.user },
      "Missing required parameters"
    );
    res.status(400).json({ message: "Content required" });
    return;
  }

  await prisma.classroom.update({
    where: {
      id: req.params.classroomId,
      tenantId: req.params.tenantId,
    },
    data: {
      forumPosts: {
        create: {
          author: req.user.id,
          content,
        },
      },
    },
  });

  logger.info(
    { request: { path: req.originalUrl, method: req.method, body: req.body, params: req.params }, user: req.user },
    "Post created"
  );
  res.json({ message: "Post created" });
});

/**
 * @openapi
 * "/api/classroom/{tenantId}/{classroomId}/schedule":
 *   post:
 *     summary: Add schedule event to classroom
 *     description: Modifying classroom schedule requires teacher or admin (tenant or super admin)
 *     tags: [Classroom]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tenantId
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: classroomId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               start:
 *                 type: string
 *                 format: date-time
 *               end:
 *                 type: string
 *                 format: date-time
 *               repeat:
 *                 type: string
 *                 enum: [NONE, DAILY, WEEKLY, MONTHLY, YEARLY]
 *               repeatUntil:
 *                 type: string
 *                 format: date-time
 *             required: [start, end, repeat]
 *     responses:
 *       200:
 *         description: "Event added"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Response"
 *       "400":
 *         $ref: "#/components/responses/MissingParameters"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       403:
 *         $ref: "#/components/responses/Forbidden"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 *       500:
 *         $ref: "#/components/responses/ServerError"
 */
router.post("/:tenantId/:classroomId/schedule", async (req, res) => {
  // Shouldn't happen (user should be authenticated)
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  let isAdmin = req.user?.superAdmin;

  // Check if tenant exists
  const { data: userData } = await gqlClient.query<GetTenantQuery, GetTenantQueryVariables>(GetTenantDocument, {
    tenantId: req.params.tenantId,
  });

  // Check if user is admin of the tenant
  if (userData?.tenant?.adminId === req.user.id) {
    isAdmin = true;
  }

  // Check if user is teacher
  const classroomUsers = await prisma.classroom.findUnique({
    where: {
      id: req.params.classroomId,
      tenantId: req.params.tenantId,
    },
    select: {
      teachers: true,
    },
  });

  if (!classroomUsers) {
    logger.debug(
      { request: { path: req.originalUrl, method: req.method, params: req.params }, user: req.user },
      "Classroom not found"
    );
    res.status(404).json({ message: "Classroom not found" });
    return;
  }

  const isTeacher = classroomUsers?.teachers.includes(req.user.id);

  if (!isTeacher && !isAdmin) {
    logger.info(
      { request: { path: req.originalUrl, method: req.method, params: req.params }, user: req.user },
      "Unauthorized"
    );
    res.status(401).send("Unauthorized");
    return;
  }

  // Add schedule event to classroom
  const start = new Date(req.body.start);
  const end = new Date(req.body.end);
  const repeat = req.body.repeat;
  const repeatUntil = new Date(req.body.repeatUntil) || undefined;

  if (!start || !end || !repeat) {
    logger.debug(
      { request: { path: req.originalUrl, method: req.method, body: req.body, params: req.params }, user: req.user },
      "Missing required parameters"
    );
    res.status(400).json({ message: "Start, end and repeat are required" });
    return;
  }

  grpcClient.Create(
    {
      tenantId: req.params.tenantId,
      classroom: req.params.classroomId,
      start: start.getTime(),
      end: end.getTime(),
      repeat,
      repeatEnd: repeatUntil?.getTime() || undefined,
    },
    (err, response) => {
      if (err) {
        logger.error(
          {
            request: { path: req.originalUrl, method: req.method, body: req.body, params: req.params },
            user: req.user,
            error: err,
          },
          "Error creating schedule event"
        );
        res.status(500).json({ message: "Error creating schedule event", error: err });
        return;
      }

      logger.info(
        { request: { path: req.originalUrl, method: req.method, body: req.body, params: req.params }, user: req.user },
        "Event added"
      );
      res.json({ message: "Event added" });
    }
  );
});

export default router;
