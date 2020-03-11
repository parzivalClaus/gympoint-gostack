import { subDays } from 'date-fns';
import { Op } from 'sequelize';
import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  // Criar usuário
  async store(req, res) {
    const { id } = req.params;

    const studentExists = await Student.findOne({
      where: { id },
    });

    if (!studentExists) {
      return res.status(401).json({ error: 'User does not exists' });
    }

    const date = new Date();

    const lastDay = subDays(date, 7);

    const checkins = await Checkin.findAll({
      where: {
        student_id: id,
        created_at: {
          [Op.between]: [lastDay, date],
        },
      },
    });

    if (checkins.length >= 5) {
      return res.json({ error: 'Limite de 5 acessos por semana excedido' });
    }

    const checkin = await Checkin.create({
      student_id: id,
    });

    return res.json(checkin);
  }

  async index(req, res) {
    const { id } = req.params;
    const { page } = req.query;
    const atualPage = page || '1';

    const studentExists = await Student.findOne({
      where: { id },
    });

    if (!studentExists) {
      return res.status(401).json({ error: 'User does not exists' });
    }

    const checkins = await Checkin.findAll({
      where: {
        student_id: id,
      },
      order: [['id', 'DESC']],
      limit: 5,
      offset: (atualPage - 1) * 5,
    });

    return res.json(checkins);
  }
}

export default new CheckinController();
