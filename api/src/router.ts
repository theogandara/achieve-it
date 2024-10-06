import { Router } from 'express';
import { createQuitHabit } from './useCases/quit-habit/createQuitHabit';
import { deleteQuitHabit } from './useCases/quit-habit/deleteQuitHabit';
import { updateQuitHabit } from './useCases/quit-habit/updateQuitHabit';
import { listQuitHabit } from './useCases/quit-habit/listQuitHabit';
import { createDailyTemplate } from './useCases/daily-template/createDailyTemplate';
import { listDailyTemplate } from './useCases/daily-template/listDailyTemplate';
import { updateDailyTemplate } from './useCases/daily-template/updateDailyTemplate';
import { showDailyReport } from './useCases/daily-report/showDailyReport';
import { listDailyReport } from './useCases/daily-report/listDailyReport';
import { updateDailyReport } from './useCases/daily-report/updateDailyReport';
import { createUser } from './useCases/users/createUser';
import { login } from './useCases/users/login';
import { validateJWT } from './middleware/validateJWT';

export const router = Router();
router.post('/quit-habits', validateJWT, createQuitHabit);
router.delete('/quit-habits/:id', validateJWT, deleteQuitHabit);
router.put('/quit-habits/:id', validateJWT, updateQuitHabit);
router.get('/quit-habits', validateJWT, listQuitHabit);
router.post('/daily-templates', validateJWT, createDailyTemplate);
router.get('/daily-templates', validateJWT, listDailyTemplate);
router.put('/daily-templates/:id', validateJWT, updateDailyTemplate);
router.get('/daily-reports/today', validateJWT, showDailyReport);
router.get('/daily-reports', validateJWT, listDailyReport);
router.put('/daily-reports/:id', validateJWT, updateDailyReport);

router.post('/users', createUser);
router.post('/login', login);
