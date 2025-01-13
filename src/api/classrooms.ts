import { Router } from "express";
import prisma from "../prisma";
import logger from "../logger";
import gqlClient from "../graphql/urql";
import { GetTenantDocument, GetTenantQuery, GetTenantQueryVariables } from "../graphql/generated/graphql";

const router = Router();

/**
 * @openapi
 * "/api/classrooms/{tenantId}":
 *   get:
 *     summary: Get classrooms
 *     description: Gets all classrooms where user is student or teacher. Admins can see all classrooms including teachers and students.
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
 *     responses:
 *       200:
 *         description: "Classrooms"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   teachers:
 *                     type: array
 *                     items:
 *                       type: string
 *                   students:
 *                     type: array
 *                     items:
 *                       type: string
 *                 required: [id, name]
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
router.get("/:tenantId", async (req, res) => {
  // Shouldn't happen (user should be authenticated)
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  let isAdmin = req.user?.superAdmin;

  // Check if user is admin of the tenant
  const { data: userData } = await gqlClient.query<GetTenantQuery, GetTenantQueryVariables>(GetTenantDocument, {
    tenantId: req.params.tenantId,
  });

  if (userData?.tenant?.adminId === req.user.id) {
    isAdmin = true;
  }

  // Admins can see all classrooms
  if (isAdmin) {
    const classrooms = await prisma.classroom.findMany({
      where: {
        tenantId: req.params.tenantId,
      },
      select: {
        id: true,
        name: true,
        teachers: true,
        students: true,
      },
    });

    logger.info(
      { request: { path: req.originalUrl, method: req.method }, user: req.user, tenant: req.params.tenantId },
      "Classrooms fetched (admin)"
    );
    res.json(classrooms);
    return;
  }

  // Fetch classrooms where user is student or teacher
  const classrooms = await prisma.classroom.findMany({
    where: {
      tenantId: req.params.tenantId,
      OR: [{ students: { hasSome: [req.user.id] } }, { teachers: { hasSome: [req.user.id] } }],
    },
    select: {
      id: true,
      name: true,
    },
  });

  logger.info(
    { request: { path: req.originalUrl, method: req.method }, user: req.user, tenant: req.params.tenantId },
    "Classrooms fetched"
  );
  res.json(classrooms);
});

export default router;
