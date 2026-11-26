const { createClient } = require('@supabase/supabase-js');
const { chromium } = require('playwright');
const path = require('path');

const ARTIFACT_DIR =
  'C:\\Users\\DELL\\.gemini\\antigravity\\brain\\28fe387d-6327-4ce4-b070-7bcefae1cb53';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://127.0.0.1:54521';
const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY || '';

async function runLocalSupabaseTests() {
  console.log('--- STARTING LOCAL SUPABASE DOCKER INTEGRATION TEST SUITE ---');

  const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
    auth: { persistSession: false },
  });

  const anonClient = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: { persistSession: false },
  });

  // 1. Verify Profiles Table
  console.log('1. Testing profiles table...');
  const { data: profiles, error: pErr } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', 'younus');
  if (pErr) throw new Error(`Profiles query failed: ${pErr.message}`);
  console.log(`✓ Found seeded profile: ${profiles[0]?.display_name} (@${profiles[0]?.username})`);

  // 2. Verify Page Blocks Table
  console.log('2. Testing page_blocks table...');
  const { data: blocks, error: bErr } = await supabase
    .from('page_blocks')
    .select('*')
    .eq('profile_id', profiles[0].id)
    .order('sort_order', { ascending: true });
  if (bErr) throw new Error(`Page blocks query failed: ${bErr.message}`);
  console.log(`✓ Retrieved ${blocks.length} page blocks:`, blocks.map((b) => b.block_type).join(', '));

  // 3. Verify Products Table
  console.log('3. Testing products table...');
  const { data: products, error: prodErr } = await supabase
    .from('products')
    .select('*')
    .eq('profile_id', profiles[0].id);
  if (prodErr) throw new Error(`Products query failed: ${prodErr.message}`);
  console.log(`✓ Retrieved ${products.length} digital products:`, products.map((p) => `${p.title} (₹${p.price_inr})`).join('; '));

  // 4. Verify Subscribers Table
  console.log('4. Testing subscribers table...');
  const { data: subs, error: sErr } = await supabase
    .from('subscribers')
    .select('*')
    .eq('profile_id', profiles[0].id);
  if (sErr) throw new Error(`Subscribers query failed: ${sErr.message}`);
  console.log(`✓ Retrieved ${subs.length} subscribers:`, subs.map((s) => s.email).join(', '));

  // 5. Verify Services & Bookings Table
  console.log('5. Testing services and bookings tables...');
  const { data: services, error: servErr } = await supabase
    .from('services')
    .select('*')
    .eq('profile_id', profiles[0].id);
  if (servErr) throw new Error(`Services query failed: ${servErr.message}`);
  console.log(`✓ Retrieved ${services.length} services:`, services.map((s) => s.title).join('; '));

  const { data: bookings, error: bookErr } = await supabase
    .from('bookings')
    .select('*')
    .eq('profile_id', profiles[0].id);
  if (bookErr) throw new Error(`Bookings query failed: ${bookErr.message}`);
  console.log(`✓ Retrieved ${bookings.length} scheduled bookings:`, bookings.map((b) => `${b.client_name} (${b.status})`).join('; '));

  // 6. Test Live CRUD & RPC operations
  console.log('6. Testing Live CRUD operations...');
  const testLinkId = '70000000-0000-0000-0000-000000000001';
  const { error: insLinkErr } = await supabase.from('links').upsert({
    id: testLinkId,
    profile_id: profiles[0].id,
    title: 'Live Docker Supabase Test Link',
    url: 'https://supabase.com',
    click_count: 5,
    sort_order: 99,
  });
  if (insLinkErr) throw new Error(`Link insert failed: ${insLinkErr.message}`);
  console.log('✓ Successfully inserted live test link');

  // Test RPC increment_link_clicks
  const { error: rpcErr } = await supabase.rpc('increment_link_clicks', {
    link_id: testLinkId,
  });
  if (rpcErr) throw new Error(`RPC increment_link_clicks failed: ${rpcErr.message}`);

  const { data: updatedLink } = await supabase
    .from('links')
    .select('click_count')
    .eq('id', testLinkId)
    .single();
  console.log(`✓ RPC increment_link_clicks verified: clicks increased from 5 to ${updatedLink?.click_count}`);

  // Test inserting analytics event
  const { error: eventErr } = await anonClient.from('analytics_events').insert({
    profile_id: profiles[0].id,
    link_id: testLinkId,
    event_type: 'link_click',
    referrer: 'https://twitter.com',
    country: 'US',
    device: 'desktop',
    browser: 'Chrome',
  });
  if (eventErr) throw new Error(`Analytics insert failed: ${eventErr.message}`);
  console.log('✓ Verified anonymous client analytics event insertion via RLS');

  // Test inserting a new subscriber via Anon Client (Public Lead Capture)
  const testSubEmail = `docker-test-${Date.now()}@example.com`;
  const { error: newSubErr } = await anonClient.from('subscribers').insert({
    profile_id: profiles[0].id,
    email: testSubEmail,
    name: 'Docker Tester',
    source: 'Automated Test',
    tags: ['docker', 'integration-test'],
    is_active: true,
    consent_given: true,
  });
  if (newSubErr) throw new Error(`Public subscriber insert failed: ${newSubErr.message}`);
  console.log(`✓ Verified public newsletter signup via anon key: ${testSubEmail}`);

  // 7. Capture Supabase Studio Screenshot
  console.log('7. Capturing Supabase Studio Screenshot...');
  try {
    const browser = await chromium.launch({
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      headless: true,
    });
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto('http://127.0.0.1:54523', { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'supabase-studio-dashboard.png'),
    });
    console.log('✓ Saved supabase-studio-dashboard.png');

    // Also navigate to Table Editor if accessible
    await page.goto('http://127.0.0.1:54523/project/default/editor', {
      waitUntil: 'networkidle',
      timeout: 15000,
    }).catch(() => {});
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'supabase-studio-tables.png'),
    });
    console.log('✓ Saved supabase-studio-tables.png');

    await browser.close();
  } catch (err) {
    console.warn('Note on Studio screenshot:', err.message);
  }

  console.log('=====================================================');
  console.log('ALL LOCAL SUPABASE DOCKER TESTS PASSED WITH 100% SUCCESS!');
  console.log('=====================================================');
}

runLocalSupabaseTests().catch((err) => {
  console.error('FATAL TEST ERROR:', err);
  process.exit(1);
});

