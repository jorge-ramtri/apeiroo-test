import { Duty } from '../types/duty';
import { API_URL } from '../config';

export const fetchDuties = async (): Promise<Duty[]> => {
  const res = await fetch(`${API_URL}/duties`);
  if (!res.ok) throw new Error('Failed to fetch duties');
  return res.json();
};

export const fetchDutyById = async (id: string): Promise<Duty> => {
  const res = await fetch(`${API_URL}/duties/${id}`);
  if (!res.ok) throw new Error('Duty not found');
  return res.json();
};

export const createDuty = async (name: string): Promise<Duty> => {
  const res = await fetch(`${API_URL}/duties`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error('Failed to create duty');
  return res.json();
};

export const updateDuty = async (id: string, name: string): Promise<Duty> => {
  const res = await fetch(`${API_URL}/duties/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error('Failed to update duty');
  return res.json();
};

export const deleteDuty = async (id: string): Promise<void> => {
  const res = await fetch(`${API_URL}/duties/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete duty');
};