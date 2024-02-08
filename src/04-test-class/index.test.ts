// Uncomment the code below and write your tests
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import lodash from 'lodash';

jest.mock('lodash');

describe('BankAccount', () => {
  let bankAccount: BankAccount;

  beforeEach(() => {
    bankAccount = getBankAccount(100);
  });

  test('should create account with initial balance', () => {
    // Write your test here
    expect(bankAccount).toBeInstanceOf(BankAccount);
    expect(bankAccount.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    // Write your test here
    expect(() => bankAccount.withdraw(200)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    // Write your test here
    const secondAccount = getBankAccount(100);
    expect(() => bankAccount.transfer(200, secondAccount)).toThrowError();
  });

  test('should throw error when transferring to the same account', () => {
    // Write your test here
    expect(() => bankAccount.transfer(200, bankAccount)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    // Write your test here
    bankAccount.deposit(50);
    expect(bankAccount.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    // Write your test here
    bankAccount.withdraw(50);
    expect(bankAccount.getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    // Write your test here
    const secondAccount = getBankAccount(100);

    bankAccount.transfer(50, secondAccount);
    expect(bankAccount.getBalance()).toBe(50);
    expect(secondAccount.getBalance()).toBe(150);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
    (lodash.random as jest.Mock).mockReturnValue(50);
    const res = await bankAccount.fetchBalance();

    expect(typeof res).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
    (lodash.random as jest.Mock).mockReturnValue(99);
    await bankAccount.synchronizeBalance();

    expect(bankAccount.getBalance()).toBe(99);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
    try {
      (lodash.random as jest.Mock).mockReturnValue(0);
      await bankAccount.synchronizeBalance();
    } catch (e) {
      expect(e).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
