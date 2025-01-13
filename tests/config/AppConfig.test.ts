import express, { Application } from 'express';
import request from 'supertest';
import { AppConfig } from '../../src/config/AppConfig'; // Adjust the path as needed
import { envManager } from '../../src/environment/EnvironmentManager'; // Adjust the path as needed

jest.mock('../../src/environment/EnvironmentManager'); // Mock the EnvironmentManager

describe('AppConfig', () => {
  let app: Application;

  beforeEach(() => {
    app = express(); // Create a new Express app for each test
    jest.clearAllMocks(); // Clear any previous mocks
  });

  it('should configure the app with JSON middleware', async () => {
    // Set up the environment manager mock
    (envManager.getEnv as jest.Mock).mockReturnValue('development');
    (envManager.isDebugMode as jest.Mock).mockReturnValue(false);

    AppConfig.configure(app);

    // Add a test route to validate JSON parsing
    app.post('/test', (req, res) => {
      res.json(req.body);
    });

    const response = await request(app)
      .post('/test')
      .send({ message: 'Hello, world!' })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({ message: 'Hello, world!' });
  });

  it('should log debug information if debug mode is enabled', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    // Set up the environment manager mock
    (envManager.getEnv as jest.Mock).mockReturnValue('development');
    (envManager.isDebugMode as jest.Mock).mockReturnValue(true);

    AppConfig.configure(app);

    // Add a test route
    app.get('/test', (req, res) => {
      res.send('Debug mode test');
    });

    await request(app).get('/test').expect(200);

    // Ensure debug logs are printed
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('DEBUG: GET /test'));
    consoleSpy.mockRestore();
  });

  it('should not log debug information if debug mode is disabled', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    // Set up the environment manager mock
    (envManager.getEnv as jest.Mock).mockReturnValue('production');
    (envManager.isDebugMode as jest.Mock).mockReturnValue(false);

    AppConfig.configure(app);

    // Add a test route
    app.get('/test', (req, res) => {
      res.send('No debug mode test');
    });

    await request(app).get('/test').expect(200);

    // Ensure no debug logs are printed
    expect(consoleSpy).not.toHaveBeenCalledWith(expect.stringContaining('DEBUG: GET /test'));
    consoleSpy.mockRestore();
  });

  it('should log the current environment during configuration', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    // Set up the environment manager mock
    (envManager.getEnv as jest.Mock).mockReturnValue('production');
    (envManager.isDebugMode as jest.Mock).mockReturnValue(false);

    AppConfig.configure(app);

    // Ensure the environment is logged
    expect(consoleSpy).toHaveBeenCalledWith('Running in production mode');
    consoleSpy.mockRestore();
  });
});
