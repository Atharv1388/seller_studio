/*
Seed 12 sellers via API as an admin.
Usage:
  1) Ensure server is running on http://localhost:5000 and connected to MongoDB
  2) Set environment variables for admin login:
       - ADMIN_EMAIL
       - ADMIN_PASSWORD
  3) Run:
       node server/scripts/seedSellers.js
*/

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000/api';

async function loginAdmin(email, password) {
  const res = await fetch(`${BASE_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Admin login failed: ${res.status} ${t}`);
  }
  const data = await res.json();
  if (!data?.accessToken) throw new Error('No accessToken returned from admin login');
  return data.accessToken;
}

function randomFrom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randomDigits(n) { return Array.from({length:n},()=>Math.floor(Math.random()*10)).join(''); }

function genSeller(i) {
  const firstNames = ['Aarav','Vihaan','Vivaan','Ananya','Diya','Isha','Kabir','Reyansh','Sai','Sara','Aanya','Riya'];
  const lastNames = ['Sharma','Verma','Patel','Reddy','Iyer','Gupta','Khan','Singh','Das','Nair','Mehta','Kulkarni'];
  const countries = ['India'];
  const states = ['Maharashtra','Karnataka','Delhi','Gujarat','Tamil Nadu','Telangana','Rajasthan'];
  const skillsPool = ['JavaScript','TypeScript','React','Node.js','MongoDB','Express','AWS','Docker','Next.js','Redux'];

  const name = `${randomFrom(firstNames)} ${randomFrom(lastNames)}`;
  const email = `seed.seller${Date.now()}_${i}@example.com`;
  const mobile = `9${randomDigits(9)}`; // 10 digits starting with 9
  const country = randomFrom(countries);
  const state = randomFrom(states);
  const skills = Array.from(new Set([randomFrom(skillsPool), randomFrom(skillsPool), randomFrom(skillsPool)])).slice(0,3);
  const password = 'Password123!';

  return { name, email, mobile, country, state, skills, password };
}

async function createSeller(token, payload) {
  const res = await fetch(`${BASE_URL}/admin/sellers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Create seller failed: ${res.status} ${t}`);
  }
  return res.json();
}

(async () => {
  try {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    if (!email || !password) {
      throw new Error('Please set ADMIN_EMAIL and ADMIN_PASSWORD env vars');
    }

    console.log('Logging in as admin...');
    const token = await loginAdmin(email, password);
    console.log('Login OK');

    for (let i = 1; i <= 12; i++) {
      const payload = genSeller(i);
      process.stdout.write(`Creating seller ${i}/12 (${payload.email})... `);
      await createSeller(token, payload);
      console.log('done');
    }

    console.log('All 12 sellers created.');
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  }
})();
