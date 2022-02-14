var Service = require('node-windows').Service;
// Create a new service object
var svc = new Service({
    name: 'Risk FrontEnd service',
    description: 'The Front end service for the Risk Managemen App',
    script: 'G:\\RMS\\risk-appetite-app-fe\\server.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.

svc.on('install', function () {
    svc.start();
});

svc.install();