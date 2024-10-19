import { Router } from 'express';
import authRoute from './auth.route';
import userRoute from './user.route';
import courseRoute from './course.route';
import lessonRoute from './lesson.route';
import vocabularyRoute from './vocabulary.route';
import taskRoute from './task.route';
import grammarRoute from './grammar.route';
const router = Router();

router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/course', courseRoute);
router.use('/lesson', lessonRoute);
router.use('/task', taskRoute);
router.use('/vocabulary', vocabularyRoute);
router.use('/grammar', grammarRoute);
export default router;
