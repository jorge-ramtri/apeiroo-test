import * as dutyRepository from '../src/repositories/duty.repository';
import * as dutyService from '../src/services/duty.service';
import { DatabaseError } from '../src/errors/DatabaseError';
import { NotFoundError } from '../src/errors/NotFoundError';
import { Duty } from '../src/models/duty';

jest.mock('../src/repositories/duty.repository');

describe('Duty Service Unit Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createDuty', () => {
    it('should create a duty and return it', async () => {
      const name = 'Test Duty';
      const fakeDuty: Duty = { id: '123', name };
      (dutyRepository.insertDuty as jest.Mock).mockResolvedValue(fakeDuty);

      const result = await dutyService.createDuty(name);
      expect(result).toEqual(fakeDuty);
      expect(dutyRepository.insertDuty).toHaveBeenCalledWith(expect.objectContaining({ name }));
    });

    it('should throw DatabaseError if repository fails', async () => {
      const name = 'Test Duty';
      (dutyRepository.insertDuty as jest.Mock).mockRejectedValue(new Error('DB error'));
      await expect(dutyService.createDuty(name)).rejects.toThrow(DatabaseError);
    });
  });

  describe('getDuties', () => {
    it('should return an array of duties', async () => {
      const fakeDuties: Duty[] = [
        { id: '1', name: 'Duty 1' },
        { id: '2', name: 'Duty 2' },
      ];
      (dutyRepository.getAllDuties as jest.Mock).mockResolvedValue(fakeDuties);
      const result = await dutyService.getDuties();
      expect(result).toEqual(fakeDuties);
    });
  });

  describe('updateDuty', () => {
    it('should update an existing duty', async () => {
      const id = '1';
      const newName = 'Updated Duty';
      const existingDuty: Duty = { id, name: 'Old Duty' };
      const updatedDuty: Duty = { id, name: newName };

      (dutyRepository.getDutyById as jest.Mock).mockResolvedValue(existingDuty);
      (dutyRepository.updateDutyById as jest.Mock).mockResolvedValue(updatedDuty);

      const result = await dutyService.updateDuty(updatedDuty);
      expect(result).toEqual(updatedDuty);
    });

    it('should throw NotFoundError if duty does not exist', async () => {
      (dutyRepository.getDutyById as jest.Mock).mockResolvedValue(null);
      const duty: Duty = {id: "id", name: "name"}
      await expect(dutyService.updateDuty(duty)).rejects.toThrow(NotFoundError);
    });

    it('should throw DatabaseError if update fails', async () => {
      const id = '1';
      const newName = 'Updated Duty';
      const existingDuty: Duty = { id, name: 'Old Duty' };
      const updatedDuty: Duty = { id, name: newName };

      (dutyRepository.getDutyById as jest.Mock).mockResolvedValue(existingDuty);
      (dutyRepository.updateDutyById as jest.Mock).mockResolvedValue(null);

      await expect(dutyService.updateDuty(updatedDuty)).rejects.toThrow(DatabaseError);
    });
  });

  describe('deleteDuty', () => {
    it('should delete an existing duty', async () => {
      const id = '1';
      const existingDuty: Duty = { id, name: 'Duty to delete' };
      const deletedDuty: Duty = { id, name: 'Duty to delete' };

      (dutyRepository.getDutyById as jest.Mock).mockResolvedValue(existingDuty);
      (dutyRepository.deleteDutyById as jest.Mock).mockResolvedValue(deletedDuty);

      const result = await dutyService.deleteDuty(id);
      expect(result).toEqual(deletedDuty);
    });

    it('should throw NotFoundError if duty to delete does not exist', async () => {
      (dutyRepository.getDutyById as jest.Mock).mockResolvedValue(null);
      await expect(dutyService.deleteDuty('non-existent')).rejects.toThrow(NotFoundError);
    });

    it('should throw DatabaseError if deletion fails', async () => {
      const id = '1';
      const existingDuty: Duty = { id, name: 'Duty to delete' };
      (dutyRepository.getDutyById as jest.Mock).mockResolvedValue(existingDuty);
      (dutyRepository.deleteDutyById as jest.Mock).mockResolvedValue(null);
      await expect(dutyService.deleteDuty(id)).rejects.toThrow(DatabaseError);
    });
  });
});
