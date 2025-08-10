#!/usr/bin/env tsx
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function checkRuntime(command: string, name: string): Promise<boolean> {
    try {
        await execAsync(`${command} --version`);
        console.log(`✅ ${name} is available`);
        return true;
    } catch (error) {
        console.log(`❌ ${name} is NOT available`);
        return false;
    }
}

async function main() {
    console.log('🔍 Checking required language runtimes...\n');

    const runtimes = [
        { command: 'python3', name: 'Python 3' },
        { command: 'node', name: 'Node.js' },
        { command: 'javac', name: 'Java Compiler' },
        { command: 'g++', name: 'GCC C++ Compiler' },
    ];

    let allAvailable = true;

    for (const runtime of runtimes) {
        const available = await checkRuntime(runtime.command, runtime.name);
        if (!available) {
            allAvailable = false;
        }
    }

    console.log('\n📋 Summary:');
    if (allAvailable) {
        console.log('✅ All required runtimes are available!');
    } else {
        console.log('❌ Some required runtimes are missing.');
        console.log('\n💡 To install missing runtimes:');
        console.log(
            '   • Python 3: brew install python3 (macOS) or apt-get install python3 (Ubuntu)',
        );
        console.log('   • Node.js: brew install node (macOS) or apt-get install nodejs (Ubuntu)');
        console.log(
            '   • Java: brew install openjdk (macOS) or apt-get install openjdk-11-jdk (Ubuntu)',
        );
        console.log(
            '   • GCC: brew install gcc (macOS) or apt-get install build-essential (Ubuntu)',
        );
    }
}

main().catch(console.error);
