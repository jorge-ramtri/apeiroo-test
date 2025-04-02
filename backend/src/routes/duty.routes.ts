import { Router } from 'express';
import * as dutyController from '../controllers/duty.controller';

const router = Router();

router.post('/', dutyController.createDuty);
router.get('/', dutyController.getDuties);
router.put('/:id', dutyController.updateDuty);
router.delete('/:id', dutyController.deleteDuty);

export default router;