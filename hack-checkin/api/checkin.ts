import { VercelRequest, VercelResponse } from '@vercel/node';
import supabase from '../utils/supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { nome, matricula } = req.body;

  if (!nome || !matricula) {
    return res.status(400).json({ error: 'Nome e matrícula são obrigatórios.' });
  }

  const { error } = await supabase
    .from('checkins')
    .insert([{ nome, matricula }]);

  if (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao registrar check-in.' });
  }

  res.status(200).json({ message: 'Check-in realizado com sucesso!' });
}