import * as Yup from 'yup';
import Plan from '../models/Plan';
import Registration from '../models/Registration';

class PlanController {
  // Listar todos os estudantes
  async index(req, res) {
    const { page } = req.query;
    const atualPage = page || '1';
    const plans = await Plan.findAndCountAll({
      order: [['duration', 'ASC']],
      limit: 5,
      offset: (atualPage - 1) * 5,
    });

    return res.json(plans);
  }

  // Cadastrar plano
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .integer()
        .required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const planExists = await Plan.findOne({ where: { title: req.body.title } });

    if (planExists) {
      return res.status(400).json({ error: 'Plan already exists' });
    }

    const { id, title, duration, price } = await Plan.create(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number().integer(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(400).json('Plan do not exists');
    }

    const { title, duration, price } = await plan.update(req.body);

    return res.json({
      title,
      duration,
      price,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan do not exists' });
    }

    const hasRegistration = await Registration.findOne({
      where: { plan_id: id },
    });

    if (hasRegistration) {
      return res.json({ error: 'Existem alunos matriculados neste plano.' });
    }

    await Plan.destroy({
      where: {
        id,
      },
    });

    return res.json({ error: 'Plan deleted sucessfully' });
  }
}

export default new PlanController();
