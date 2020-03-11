import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class HelpOrderAnswerMail {
  get key() {
    return 'HelpOrderAnswerMail';
  }

  async handle({ data }) {
    const { name, email, question, answer, answer_at } = data;

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Sua pergunta foi respondida!',
      template: 'helpOrderAnswer',
      context: {
        name,
        question,
        answer,
        answer_at: format(parseISO(answer_at), "dd'/'MM'/'yyyy' às 'HH'h'mm", {
          locale: pt,
        }),
      },
    });
  }
}

export default new HelpOrderAnswerMail();
