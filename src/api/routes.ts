import { Router } from "express";
import passport from "passport";

import classrooms from "./classrooms";
import classroom from "./classroom";

const router = Router();

router.use("/classroom", passport.authenticate("jwt", { session: false }), classroom);
router.use("/classrooms", passport.authenticate("jwt", { session: false }), classrooms);

export default router;
