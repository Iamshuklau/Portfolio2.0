const { spawn, exec } = require('child_process');
const path = require('path');

console.log('🚀 Starting Portfolio Development Server...\n');

// Start the backend server
const server = spawn('node', ['server.js'], {
  stdio: ['pipe', 'pipe', 'pipe'],
  cwd: process.cwd()
});

let serverStarted = false;

// Listen for server output
server.stdout.on('data', (data) => {
  const output = data.toString();
  console.log(output);
  
  // Check if server has started
  if (output.includes('Server running on port') && !serverStarted) {
    serverStarted = true;
    console.log('✅ Backend server started successfully!\n');
    
    // Wait a moment then open the browser
    setTimeout(() => {
      console.log('🌐 Opening website in browser...\n');
      
      const indexPath = path.join(process.cwd(), 'index.html');
      
      // Open specifically in Chrome browser
      const fileUrl = `file:///${indexPath.replace(/\\/g, '/')}`;
      let openCommand;
      
      if (process.platform === 'win32') {
        // Simple Chrome command for Windows
        openCommand = `start chrome "${fileUrl}"`;
      } else if (process.platform === 'darwin') {
        openCommand = `open -a "Google Chrome" "${indexPath}"`;
      } else {
        openCommand = `google-chrome "${indexPath}" || chromium-browser "${indexPath}" || xdg-open "${indexPath}"`;
      }
      
      exec(openCommand, (error) => {
        if (error) {
          console.log('❌ Could not auto-open browser. Please manually open index.html');
          console.log(`📂 Website location: ${indexPath}`);
          console.log('💡 Or simply double-click on index.html to open it');
        } else {
          console.log('✅ Website opened in browser!');
        }
        
        console.log('\n🎯 Your portfolio is ready!');
        console.log('📧 Test the contact form - emails will go to: iamshuklau@gmail.com');
        console.log('🔄 Server running on: http://localhost:3001');
        console.log('⏹️  Press Ctrl+C to stop the server\n');
      });
    }, 2000);
  }
});

// Listen for server errors
server.stderr.on('data', (data) => {
  console.error('Server Error:', data.toString());
});

// Handle server exit
server.on('close', (code) => {
  console.log(`\n📴 Server stopped with code ${code}`);
  process.exit(code);
});

// Handle Ctrl+C
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping server...');
  server.kill('SIGINT');
}); 