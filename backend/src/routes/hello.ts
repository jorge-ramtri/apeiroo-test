import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('¡Hola Mundo desde el backend!');
});

export default router;
