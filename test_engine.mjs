const res = await fetch('http://localhost:4321/courses/ol-01-phan-cung');
const html = await res.text();

// Extract payload
const payloadMatch = html.match(/id="ol01-data-payload"[^>]*>([\s\S]*?)<\/script>/);
const rawPayload = JSON.parse(payloadMatch[1]);
console.log('Payload keys:', Object.keys(rawPayload));
console.log('mcqs length:', rawPayload.mcqs?.length);
console.log('hotspots length:', rawPayload.hotspots?.length);
console.log('tickets length:', rawPayload.tickets?.length);
console.log('oral length:', rawPayload.oralQuestions?.length);

// Extract the script content of ol01CourseEngine
const scriptMatch = html.match(/Alpine\.data\('ol01CourseEngine', \(\) => \{([\s\S]*?)\}\);/);
if (scriptMatch) {
  console.log('Found ol01CourseEngine code, testing function evaluation...');
  try {
    const fn = new Function('rawPayload', 'document', 'localStorage', `
      const Alpine = { data: () => {} };
      ${scriptMatch[0]}
    `);
    console.log('Syntax test: PASSED (no syntax errors)');
  } catch (err) {
    console.error('Syntax test ERROR:', err);
  }
}
