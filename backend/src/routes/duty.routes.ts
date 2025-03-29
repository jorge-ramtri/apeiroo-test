import { Router } from 'express';
import * as dutyController from '../controllers/duty.controller';

const router = Router();

router.post('/duties', dutyController.createDuty);
router.get('/duties', dutyController.getDuties);
router.put('/duties/:id', dutyController.updateDuty);
router.delete('/duties/:id', dutyController.deleteDuty);

export default router;