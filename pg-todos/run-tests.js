const { execSync } = require('child_process');

try {
  console.log('Running simple test...');
  execSync('npx jest src/__tests__/simple.test.ts', { stdio: 'inherit' });

  console.log('\nRunning component tests...');
  execSync('npx jest src/__tests__/components', { stdio: 'inherit' });

  console.log('\nRunning context tests...');
  execSync('npx jest src/__tests__/context', { stdio: 'inherit' });

  console.log('\nAll tests completed successfully!');
} catch (error) {
  console.error('Error running tests:', error.message);
  process.exit(1);
}
