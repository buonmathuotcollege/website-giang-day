const res = await fetch('http://localhost:4321/courses/ol-01-phan-cung');
const html = await res.text();

['tab-1', 'tab-2', 'tab-3', 'tab-4'].forEach(tab => {
  const marker = `x-show="activeTab === '${tab}'"`;
  const idx = html.indexOf(marker);
  if (idx !== -1) {
    console.log(`Found ${marker} at ${idx}`);
    console.log(`Preview:`, html.substring(idx, idx + 250).replace(/\s+/g, ' '));
  } else {
    console.log(`NOT FOUND ${marker}`);
  }
});
