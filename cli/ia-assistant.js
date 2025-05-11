#!/usr/bin/env node

import minimist from 'minimist';
import { blue, green, red, yellow } from 'colorette';
import inquirer from 'inquirer';
import ora from 'ora';
import { GoogleGenAI } from '@google/genai';

const args = minimist(process.argv.slice(2), {
    string: ['name', 'key'],
    default: {
        name: 'John Doe', 
        key: ''
    },
    alias: {
        n: 'name'
    }
});

console.log(`${blue('Hello')} ${green(args.name)}!`);

if(!args.key || args.key === ''){
    console.log(red('Error: API key is not defined'));
    process.exit(1);
}

// Definimos el model y system prompot
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || args.key;

if (!GEMINI_API_KEY) {
    console.error(red('Error: Gemini API key is not defined'));
    process.exit(1);
}

const systemPrompt = 'Soy un un asistente experto en node.js y javascript y solo puedes responder preguntas sobre node.js, javascript, herramientas y mejores prácticas de Node.js. Si alguien me pregunta sobre temas fuera de ese alcance, como preguntas generales, responderé amablemente que no puedo ayudar con eso.';

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

const conversation = [];

async function generateResponse(prompt){
    try {
        const history = conversation.map((item) => {
            return {
                role: item.role,
                parts: [{
                    text: item.content
                }]
            }
        });

        const chat = ai.chats.create({
            model: 'gemini-2.0-flash-001',
            config: {
                systemInstruction: systemPrompt,
                temperature: 0.7,
                maxOutputTokens: 1000
            },
            history
        });

        const result = await chat.sendMessage({
            message: prompt
        });
        const response = result.text;
        conversation.push({role: 'model', content: response});

        return response;
    } catch (error) {
        console.log('Error al generar respuesta:', error);
        return 'No se puede generar la respuesta';
    }
}

// function principal
async function main(){
    try {
        const { userInput } = await inquirer.prompt({
            type: 'input',
            name: 'userInput',
            message: yellow(`${args.name}: `),
            prefix: ''
        });

        conversation.push({role: 'user', content: userInput});

        const spinner = ora({
            text: 'Generando respuesta...',
            color: 'cyan'
        }).start();

        const response = await generateResponse(userInput);

        spinner.stop();

        console.log(`${yellow('Profesor: ')} ${green(response)}`);

        main();
    } catch (error) {
        if(error.name === 'ExitPromptError'){
            console.log('Saliendo...');
            process.exit(0);
        }
        console.log('Error al generar respuesta:', error);
        process.exit(1);
    }
}

main();

process.on('SIGINT', () => {
    console.log('Saliendo...');
    process.exit(0);
});

process.on('uncaughtException', (err) => {
    console.log('Error no capturado:', err);
    process.exit(1);
});
