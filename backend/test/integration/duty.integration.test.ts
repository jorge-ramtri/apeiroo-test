import { createDuty, getDuties, updateDuty } from '../../src/services/duty.service';
import pool, { closeDb } from '../../src/config/database';

describe('Integration Tests: Duty Service with PostgreSQL', () => {
  beforeAll(async () => {

    // Opcional: Asegurarse de que la tabla esté creada (si no se usa el script de inicialización de Docker)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS duties (
        id UUID PRIMARY KEY,
        name TEXT NOT NULL
      );
    `);
  });

  beforeEach(async () => {
    // Limpiar la tabla antes de cada test para asegurar independencia
    await pool.query('DELETE FROM duties;');
  });

  afterAll(async () => {
    // Cerrar la conexión a la base de datos
    await closeDb();
  });

  test('should create a new duty and retrieve it', async () => {
    const dutyName = 'Integration Test Duty';
    const duty = await createDuty(dutyName);
    expect(duty).toHaveProperty('id');
    expect(duty.name).toBe(dutyName);

    const duties = await getDuties();
    expect(Array.isArray(duties)).toBe(true);
    expect(duties).toHaveLength(1);
    expect(duties[0].name).toBe(dutyName);
  });

  test('should update an existing duty', async () => {
    const initialName = 'Initial Duty';
    const duty = await createDuty(initialName);
    const name = "Updated Duty";
    const newDuty = {id: duty.id, name: name}
    await updateDuty(newDuty);
    const duties = await getDuties();
    expect(duties).toHaveLength(1);
    const updatedDuty = duties[0];
    expect(updatedDuty.name).toBe("Updated Duty");
  });

  test('should return empty array when no duties exist', async () => {
    const duties = await getDuties();
    expect(duties).toHaveLength(0);
  });
});
