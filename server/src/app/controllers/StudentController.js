import * as Yup from 'yup';
import { Op } from 'sequelize';
import Student from '../models/Student';
import Registration from '../models/Registration';
import HelpOrder from '../models/HelpOrder';

class StudentController {
  // Listar todos os estudantes
  async index(req, res) {
    const { q } = req.query;
    const name = q || '';
    const { page } = req.query;
    const atualPage = page || '1';

    const { id } = req.params;
    if (id) {
      const student = await Student.findByPk(id);
      return res.json(student);
    }

    const students = await Student.findAndCountAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
      order: [['name', 'ASC']],
      limit: 5,
      offset: (atualPage - 1) * 5,
    });
    return res.json(students);
  }

  // Criar estudante
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .integer()
        .required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Erro ao cadastrar, verifique as informações.' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res
        .status(400)
        .json({ error: 'Este e-mail de aluno já está cadastrado' });
    }

    const { id, name, email, age, weight, height } = await Student.create(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  // Atualizar estudante
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number().integer(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Erro ao cadastrar, confira os dados' });
    }

    const { email } = req.body;
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'Este aluno não existe' });
    }

    if (email !== student.email) {
      const studentExists = await Student.findOne({ where: { email } });

      if (studentExists) {
        return res
          .status(400)
          .json({ error: 'Já existe um aluno como este e-mail' });
      }
    }

    const { name, age, weight, height } = await student.update(req.body);

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  // Deletar estudante
  async delete(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'O aluno não existe' });
    }

    const hasRegistration = await Registration.findOne({
      where: { student_id: id },
    });

    if (hasRegistration) {
      return res.json({ error: 'O aluno está matriculado em um plano.' });
    }

    const hasHelpOrder = await HelpOrder.findOne({
      where: { student_id: id, answer: null },
    });

    if (hasHelpOrder) {
      return res.json({ error: 'O aluno possui um pedido de auxílio aberto' });
    }

    await Student.destroy({
      where: {
        id,
      },
    });

    return res.json({ success: 'O aluno foi deletado com sucesso!' });
  }
}

export default new StudentController();
