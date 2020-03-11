import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class StudentHelpOrder {
  // Listar Pedidos de Auxílio por ID
  async index(req, res) {
    const { id } = req.params;
    const { page } = req.query;
    const atualPage = page || '1';

    const studentHelpOrder = await HelpOrder.findAndCountAll({
      where: {
        student_id: id,
      },
      limit: 7,
      order: [['id', 'DESC']],
      offset: (atualPage - 1) * 7,
    });
    return res.json(studentHelpOrder);
  }

  // Criar pedido de auxílio
  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const { question } = req.body;

    const studentExists = await Student.findOne({
      where: {
        id,
      },
    });

    if (!studentExists) {
      return res.status(401).json({ error: 'User does not exists' });
    }

    const studentHelpOrder = await HelpOrder.create({
      student_id: id,
      question,
      answer: null,
      answer_at: null,
    });

    return res.json(studentHelpOrder);
  }
}

export default new StudentHelpOrder();
