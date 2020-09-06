import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    if (type === 'outcome' && value > total) {
      throw Error('Saldo insuficiente para esta operação');
    }

    if (type !== 'income' && type !== 'outcome') {
      throw Error('The operation type must be income or outcome');
    }

    return this.transactionsRepository.create({ title, type, value });
  }
}

export default CreateTransactionService;
