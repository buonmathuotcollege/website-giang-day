const http = require('http');

http.get('http://localhost:4321/courses/ol-01-phan-cung', (res) => {
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('HTML size:', html.length);
    console.log('Includes ol01CourseEngine:', html.includes('ol01CourseEngine'));
    
    // Check if Alpine script is loaded
    console.log('Includes alpine.js or cdn:', html.includes('alpine'));

    // Check payload
    const m = html.match(/id="ol01-data-payload"[^>]*>([\s\S]*?)<\/script>/);
    if (m) {
      console.log('Payload size:', m[1].length);
      try {
        JSON.parse(m[1]);
        console.log('JSON parse: SUCCESS');
      } catch (e) {
        console.log('JSON parse FAIL:', e.message);
      }
    } else {
      console.log('Payload tag NOT found');
    }

    // Check tabs in html
    ['tab-1', 'tab-2', 'tab-3', 'tab-4'].forEach(tab => {
      const idx = html.indexOf(`activeTab === '${tab}'`);
      console.log(`Tab ${tab} expression index:`, idx);
    });

    // Check hotspot html
    const hsIdx = html.indexOf('selectHotspot');
    console.log('selectHotspot in HTML:', hsIdx !== -1 ? html.substring(hsIdx - 20, hsIdx + 50) : 'NOT FOUND');
  });
});
