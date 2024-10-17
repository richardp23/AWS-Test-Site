import { APIGatewayProxyHandler } from 'aws-lambda';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    let htmlContent = fs.readFileSync(join(__dirname, 'src', 'index.html'), 'utf8');
    const cssContent = fs.readFileSync(join(__dirname, 'src', 'main.css'), 'utf8');
    
    // Inject CSS into HTML
    htmlContent = htmlContent.replace('</head>', `<style>${cssContent}</style></head>`);
    
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
