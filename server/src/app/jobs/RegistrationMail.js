import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { name, email, title, duration, planValue, date, endDate } = data;

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Bem-vindo ao GymPoint!',
      template: 'registration',
      context: {
        student_name: name,
        plan_name: title,
        plan_duration: duration,
        plan_price: planValue,
        plan_startDate: format(parseISO(date), "dd'/'MM'/'yyyy", {
          locale: pt,
        }),
        plan_endDate: format(parseISO(endDate), "dd'/'MM'/'yyyy", {
          locale: pt,
        }),
      },
    });
  }
}

export default new RegistrationMail();
