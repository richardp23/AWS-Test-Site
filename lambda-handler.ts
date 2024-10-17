import { APIGatewayProxyHandler } from 'aws-lambda';
import * as fs from 'fs';
import * as path from 'path';

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const htmlContent = fs.readFileSync(path.join(__dirname, 'src', 'index.html'), 'utf8');
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: htmlContent,
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }
};
