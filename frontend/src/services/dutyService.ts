import config from '../config';
import { Duty } from '../types/duty';

const DUTIES_URL = config.API_URL + '/duties';

export const fetchDuties = async (): Promise<Duty[]> => {
  const res = await fetch(DUTIES_URL);
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
};

export const fetchDutyById = async (id: string): Promise<Duty> => {
  const res = await fetch(`${DUTIES_URL}/${id}`);
  if (!res.ok) throw new Error('Duty not found');
  return res.json();
};

export const createDuty = async (name: string): Promise<Duty> => {
  const res = await fetch(DUTIES_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error('Failed to create task');
  return res.json();
};

export const updateDuty = async (id: string, name: string): Promise<Duty> => {
  const res = await fetch(`${DUTIES_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error('Failed to update task');
  return res.json();
};

export const deleteDuty = async (id: string): Promise<void> => {
  const res = await fetch(`${DUTIES_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete task');
};
