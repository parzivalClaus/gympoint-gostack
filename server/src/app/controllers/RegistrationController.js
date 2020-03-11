import * as Yup from 'yup';
import {
  parseISO,
  addMonths,
  isBefore,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
} from 'date-fns';
import Plan from '../models/Plan';
import Registration from '../models/Registration';
import Student from '../models/Student';

import RegistrationMail from '../jobs/RegistrationMail';
import Queue from '../../lib/Queue';

class RegistrationController {
  async index(req, res) {
    const { page } = req.query;
    const atualPage = page || '';
    const registrations = await Registration.findAndCountAll({
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
      limit: 5,
      offset: (atualPage - 1) * 5,
    });
    return res.json(registrations);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Erro de validação, confirme seus dados' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const studentExists = await Student.findByPk(student_id);

    const { name, email } = studentExists;

    if (!studentExists) {
      return res.status(401).json({ error: 'O aluno não existe' });
    }

    const studentHasPlan = await Registration.findOne({
      where: {
        student_id,
      },
    });

    if (studentHasPlan) {
      return res
        .status(400)
        .json({ error: 'Alunos só podem ser martriculados em um plano' });
    }

    const planExists = await Plan.findByPk(plan_id);

    const { title, duration } = planExists;

    if (!planExists) {
      return res.status(401).json({ error: 'Este plano não existe' });
    }

    if (
      isBefore(
        parseISO(start_date),
        setMilliseconds(
          setSeconds(setMinutes(setHours(new Date(), 0), 0), 0),
          0
        )
      )
    ) {
      return res.status(401).json({
        error: 'A data de início não pode ser uma data anterior à hoje',
      });
    }

    const plan = await Plan.findOne({
      where: {
        id: plan_id,
      },
      attributes: ['id', 'price', 'duration'],
    });

    const planValue = plan.price * plan.duration;
    const endDate = addMonths(parseISO(start_date), plan.duration);
    const date = parseISO(start_date);
    await Registration.create({
      student_id,
      plan_id,
      start_date: date,
      end_date: endDate,
      price: planValue,
    });

    await Queue.add(RegistrationMail.key, {
      name,
      email,
      title,
      duration,
      planValue,
      date,
      endDate,
    });

    return res.json({
      student_id,
      plan_id,
      start_date: date,
      end_date: endDate,
      price: planValue,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      plan_id: Yup.number(),
      start_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Erro de validação, confira seus dados' });
    }

    const { id } = req.params;
    const { plan_id, start_date } = req.body;

    const studentExists = await Student.findByPk(id);

    if (!studentExists) {
      return res.status(401).json({ error: 'O aluno não existe' });
    }

    const registration = await Registration.findOne({
      where: {
        student_id: id,
      },
    });

    if (!registration) {
      return res
        .status(400)
        .json({ error: 'Este aluno não está matriculado em nenhum plano' });
    }

    const planExists = await Plan.findByPk(plan_id);

    if (!planExists) {
      return res.status(401).json({ error: 'Este plano não existe' });
    }

    if (
      isBefore(
        parseISO(start_date),
        setMilliseconds(
          setSeconds(setMinutes(setHours(new Date(), 0), 0), 0),
          0
        )
      )
    ) {
      return res
        .status(401)
        .json({ error: 'A data inicial não pode ser inferior à atual' });
    }

    const plan = await Plan.findOne({
      where: {
        id: plan_id,
      },
      attributes: ['id', 'price', 'duration'],
    });

    const planValue = plan.price * plan.duration;
    const endDate = addMonths(parseISO(start_date), plan.duration);

    await registration.update({
      id,
      plan_id,
      start_date,
      end_date: endDate,
      price: planValue,
    });

    return res.json({
      id,
      plan_id,
      start_date,
      end_date: endDate,
      price: planValue,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const registration = await Registration.findByPk(id);

    if (!registration) {
      return res
        .status(400)
        .json({ error: 'No registration found on this id' });
    }

    await registration.destroy({
      where: {
        id,
      },
    });

    return res.status(200).json({ msg: 'Matrícula cancelada com sucesso' });
  }
}

export default new RegistrationController();
