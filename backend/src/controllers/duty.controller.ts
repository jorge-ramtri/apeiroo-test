import { Request, Response } from 'express';
import * as dutyService from '../services/duty.service';

export const createDuty = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    const newDuty = await dutyService.createDuty(name);
    res.status(201).json(newDuty);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getDuties = async (req: Request, res: Response): Promise<void> => {
  try {
    const duties = await dutyService.getDuties();
    res.status(200).json(duties);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDuty = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedDuty = await dutyService.updateDuty({ id, name });
    res.status(200).json(updatedDuty);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteDuty = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedDuty = await dutyService.deleteDuty(id);
    res.status(200).json(deletedDuty);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
