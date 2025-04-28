const { createMocks } = require('node-mocks-http');
const handler = require('./getAll.js');
const sqlite3 = require('sqlite3');

jest.mock('sqlite3', () => {
  const mockAll = jest.fn();
  const mockClose = jest.fn();
  const mockDatabase = jest.fn().mockImplementation((dbPath, callback) => {
    process.nextTick(() => callback(null));
    return {
      all: mockAll,
      close: mockClose,
    };
  });

  return {
    Database: mockDatabase,
    verbose: () => ({
        Database: mockDatabase,
    }),
    __mockAll: mockAll,
    __mockClose: mockClose,
    __mockDatabase: mockDatabase,
  };
});

describe('/api/tasks API Endpoint (Callback Style)', () => {
  const { __mockAll: mockDbAll, __mockClose: mockDbClose, __mockDatabase: mockDatabaseConstructor } = require('sqlite3');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all tasks with status 200', async () => {
    const mockTasks = [
      { id: 1, title: 'Task 1', status: 'Pending', dueDate: '2025-05-01' },
      { id: 2, title: 'Task 2', status: 'Completed', dueDate: '2025-05-05' },
    ];
    mockDbAll.mockImplementationOnce((sql, params, callback) => {
      process.nextTick(() => callback(null, mockTasks));
    });

    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);
    expect(mockDatabaseConstructor).toHaveBeenCalledTimes(1);
    expect(mockDatabaseConstructor).toHaveBeenCalledWith(
        './tasks.db',
        expect.any(Function)
    );
    expect(mockDbAll).toHaveBeenCalledTimes(1);
    expect(mockDbAll).toHaveBeenCalledWith(
      'SELECT id, title, status, dueDate FROM tasks ORDER BY dueDate',
      [],
      expect.any(Function)
    );
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual(mockTasks);
    expect(mockDbClose).toHaveBeenCalledTimes(1);
  });

  it('should return status 500 if database query fails', async () => {
    const dbError = new Error('SQL query failed');

    mockDbAll.mockImplementationOnce((sql, params, callback) => {
      process.nextTick(() => callback(dbError, null));
    });
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);
    expect(res._getStatusCode()).toBe(500);
    expect(res._getJSONData()).toEqual({
      error: 'Database query error',
    });

    expect(mockDbClose).toHaveBeenCalledTimes(1);

     expect(mockDatabaseConstructor).toHaveBeenCalledTimes(1);
     expect(mockDatabaseConstructor).toHaveBeenCalledWith(
         './tasks.db',
         expect.any(Function)
     );
  });

  it('should return status 500 if database connection fails', async () => {
    const connectionError = new Error('Failed to open database');

    mockDatabaseConstructor.mockImplementationOnce((dbPath, callback) => {
       process.nextTick(() => callback(connectionError));
       return { all: jest.fn(), close: jest.fn() };
    });

    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);
    expect(res._getStatusCode()).toBe(500);

    expect(res._getJSONData()).toEqual({
      error: 'Failed to connect to database',
    });

    expect(mockDbAll).not.toHaveBeenCalled();
    expect(mockDbClose).not.toHaveBeenCalled();
     expect(mockDatabaseConstructor).toHaveBeenCalledTimes(1);
     expect(mockDatabaseConstructor).toHaveBeenCalledWith(
         './tasks.db',
         expect.any(Function)
     );
  });
});
