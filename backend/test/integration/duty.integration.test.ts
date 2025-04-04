import { createDuty, getDuties, updateDuty } from '../../src/services/duty.service';
import pool, { closeDb } from '../../src/config/database';
import { deleteDutyById, getAllDuties, insertDuty } from '../../src/repositories/duty.repository';
import { Duty } from '../../src/models/duty';

describe('Integration Tests: Duty Service with PostgreSQL', () => {


  test('should create a new duty and retrieve it', async () => {
    const duty: Duty = { id: '11111111-1111-1111-1111-111111111111', name: 'Integration Test Duty', completed: false };
    const persistedDuty = await insertDuty(duty);
    expect(persistedDuty).toHaveProperty('id');
    expect(persistedDuty.name).toBe(duty.name);

    const duties = await getAllDuties();
    expect(Array.isArray(duties)).toBe(true);
    expect(duties.some(d => d.name === duty.name));
  });

  test('should update an existing duty', async () => {
    const duty: Duty = { id: '11111111-1111-1111-1111-111111111112', name: 'Initial Duty', completed: false };
    const persistedDuty = await insertDuty(duty);
    const newDuty = { id: persistedDuty.id, name: "Updated Duty", completed: false }
    await updateDuty(newDuty);
    const duties = await getAllDuties();
    expect(duties.some(d => d.name === "Updated Duty"));
  });

  test('should return empty array when no duties exist', async () => {
    const fistDuty = await deleteDutyById('11111111-1111-1111-1111-111111111111');
    expect(fistDuty).toBe(true);
    const secondDuty = await deleteDutyById('11111111-1111-1111-1111-111111111112');
    expect(secondDuty).toBe(true);
  });
});
