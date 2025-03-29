import { createDuty, getDuties, updateDuty } from '../src/services/duty.service';
import pool, { closeDb } from '../src/config/database';

describe('Duty Service', () => {


  afterAll(async () => {
    await closeDb();
  });

  test('should create a new duty', async () => {
    const dutyName = 'Test Duty';
    const duty = await createDuty(dutyName);
    expect(duty).toHaveProperty('id');
    expect(duty.name).toBe(dutyName);
  });

  test('should return an array of duties', async () => {
    const duties = await getDuties();
    expect(Array.isArray(duties)).toBe(true);
  });

  test('should update an existing duty', async () => {
    const initialName = 'Duty to Update';
    const createdDuty = await createDuty(initialName);
    const updatedDuty = await updateDuty(createdDuty.id, 'Updated Duty');
    expect(updatedDuty.name).toBe('Updated Duty');
  });

  test('should throw an error when updating a non-existent duty', async () => {
    await expect(updateDuty('non-existent-id', 'No Duty')).rejects.toThrow();
  });
});
