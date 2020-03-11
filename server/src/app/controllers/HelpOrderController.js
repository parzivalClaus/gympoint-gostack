import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';

import Student from '../models/Student';

import HelpOrderAnswerMail from '../jobs/HelpOrderAnswerMail';
import Queue from '../../lib/Queue';

class HelpOrderController {
  // Listar Pedidos de Auxílio
  async index(req, res) {
    const { page } = req.query;
    const atualPage = page || '1';

    const helpOrders = await HelpOrder.findAndCountAll({
      where: {
        answer_at: null,
      },
      include: {
        model: Student,
        as: 'student',
        attributes: ['id', 'name'],
      },

      limit: 5,
      offset: (atualPage - 1) * 5,
    });
    return res.json(helpOrders);
  }

  // Responder Pedidos de Auxílio
  async store(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'A resposta precisa ser preenchida' });
    }

    const { id } = req.params;
    const { answer } = req.body;
    const helpOrder = await HelpOrder.findOne({
      where: { id },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
      ],
    });

    const { question, student } = helpOrder;

    if (!helpOrder) {
      return res.status(400).json({ error: 'Help order do not exists' });
    }

    await helpOrder.update({
      answer,
      answer_at: new Date(),
    });

    await Queue.add(HelpOrderAnswerMail.key, {
      answer,
      name: student.name,
      question,
      answer_at: new Date(),
    });

    return res.json(helpOrder);
  }
}

export default new HelpOrderController();
