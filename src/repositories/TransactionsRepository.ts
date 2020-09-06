import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (accumulator: Balance, current: Transaction) => {
        switch (current.type) {
          case 'income':
            accumulator.income += current.value;
            break;
          case 'outcome':
            accumulator.outcome += current.value;
            break;
          default:
            break;
        }

        return accumulator;
      },
      { income: 0, outcome: 0, total: 0 },
    );

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, type, value }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
