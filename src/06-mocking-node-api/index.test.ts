// Uncomment the code below and write your tests
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';
import path, { join } from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

jest.mock('path');
jest.mock('fs');
jest.mock('fs/promises');

const testFile = Buffer.from('Some test data');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
  });

  test('should set timeout with provided callback and timeout', () => {
    // Write your test here
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);

    expect(callback).not.toHaveBeenCalled();

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(callback, 1000);
  });

  test('should call callback only after timeout', () => {
    // Write your test here
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setInterval');
  });

  test('should set interval with provided callback and timeout', () => {
    // Write your test here
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);

    expect(callback).not.toHaveBeenCalled();

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(callback, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    // Write your test here
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000);
    jest.advanceTimersByTime(1000);

    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    jest.spyOn(path, 'join');
    await readFileAsynchronously('testDir/file.txt');

    expect(join).toHaveBeenCalledWith(expect.any(String), 'testDir/file.txt');
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
    (existsSync as jest.Mock).mockReturnValueOnce(false);

    const res = await readFileAsynchronously('testDir/file.txt');

    expect(res).toBeNull();
  });

  test('should return file content if file exists', async () => {
    // Write your test here
    (existsSync as jest.Mock).mockReturnValueOnce(true);
    (readFile as jest.Mock).mockReturnValueOnce(testFile);

    const res = await readFileAsynchronously('testDir/file.txt');

    expect(res).toBe('Some test data');
  });
});
