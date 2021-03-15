// Chromium Binary for AWS Lambda and Google Cloud Functions;
import chromium from 'chrome-aws-lambda';

type Options = {
  args: string[];
  executablePath: string;
  headless: boolean;
}

const { NODE_ENV } = process.env;

export const handler = async () => {
  let options: Options;

  const isDev = NODE_ENV === 'development';
  const chromeExecPaths = {
    win32: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    linux: '/usr/bin/google-chrome-stable',
    darwin: '/Application/Google Chrome.app/Contents/MacOS/Google Chrome',
  }

  const platform = process.platform;

  const execPath = chromeExecPaths[platform];

  if (isDev) {
    options = {
      args: [],
      executablePath: execPath,
      headless: true,
    }

    return options;
  }

  options = {
    args: [],
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  }

  return options;
} 