const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = Array.from({ length: 160 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.8 + 0.3,
    s: Math.random() * 0.7 + 0.2
  }));
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  stars.forEach(star => {
    ctx.globalAlpha = Math.random() * 0.8 + 0.2;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
    star.y += star.s;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(drawStars);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
drawStars();

const typingText = 'Information Technology Student | Python Developer | AI Explorer';
const typing = document.getElementById('typing');
let index = 0;

function type() {
  if (index < typingText.length) {
    typing.textContent += typingText[index];
    index++;
    setTimeout(type, 55);
  }
}
type();

const panelData = {
  home: `
    <h2>Mission Home</h2>
    <div class="card">
      <h3>Binshad A</h3>
      <p>Motivated Information Technology student passionate about Python, web technologies, AI, and real-world problem solving.</p>
    </div>
    <div class="card">
      <h3>Mission Goal</h3>
      <p>To build useful software solutions and grow as a developer through internships, projects, and continuous learning.</p>
    </div>
  `,
  projects: `
    <h2>🚀 Projects Planet</h2>
    <div class="card">
      <h3>Agricultural Intruder Detection</h3>
      <p>AI-based crop protection concept that detects possible animal intrusion and alerts the responsible person.</p>
      <p><strong>Tech:</strong> Python, AI/CNN concept, sensors, alert system</p>
    </div>
    <div class="card">
      <h3>Job Scraper</h3>
      <p>Python web scraping project for collecting job-related data using requests and BeautifulSoup.</p>
      <p><strong>Tech:</strong> Python, BeautifulSoup, Requests, CSV</p>
    </div>
    <div class="card">
      <h3>Lumos Reader</h3>
      <p>Smart reading assistance concept with audio support for a more accessible reading experience.</p>
      <p><strong>Tech:</strong> IoT concept, audio module, cloud support</p>
    </div>
  `,
  skills: `
    <h2>🛠️ Skills Laboratory</h2>
    ${skill('Python', 90)}
    ${skill('HTML & CSS', 85)}
    ${skill('JavaScript', 70)}
    ${skill('Web Scraping', 80)}
    ${skill('SQL', 70)}
    ${skill('AI / CNN Concepts', 65)}
    ${skill('Problem Solving', 82)}
  `,
  internship: `
    <h2>💼 Internship Station</h2>
    <div class="card">
      <h3>CongiLeran</h3>
      <p><strong>Location:</strong> HiLite Business Park, Kozhikode</p>
      <p><strong>Duration:</strong> 1 Month</p>
      <p>Gained exposure to software development workflows, project-based learning, and industry practices.</p>
    </div>
  `,
  achievements: `
    <h2>🏆 Achievement Planet</h2>
    <div class="card"><h3>Python Learning</h3><p>Built practical understanding through coding and projects.</p></div>
    <div class="card"><h3>Web Scraping Practice</h3><p>Learned data extraction using Python libraries.</p></div>
    <div class="card"><h3>Project Presentations</h3><p>Prepared technical documents and system architecture explanations.</p></div>
    <div class="card"><h3>Internship Training</h3><p>Completed industry-oriented learning experience.</p></div>
  `,
  contact: `
    <h2>📡 Contact Hub</h2>
    <div class="card">
      <h3>Connect With Me</h3>
      <p><strong>Email:</strong> bbinshad022@gmail.com</p>
      <p><strong>Phone:</strong> +91 88914 06430</p>
      <p><strong>LinkedIn:</strong> www.linkedin.com/in/binshad-a-957557291</p>
      <p><strong>GitHub:</strong> Add your GitHub link here</p>
    </div>
  `
};

function skill(name, percent) {
  return `
    <div class="skill">
      <div class="skill-top"><span>${name}</span><strong>${percent}%</strong></div>
      <div class="skill-bar"><div style="width:${percent}%"></div></div>
    </div>
  `;
}

const visited = JSON.parse(localStorage.getItem('visitedPlanets') || '{}');
let xp = Number(localStorage.getItem('missionXp') || 0);
const panel = document.getElementById('infoPanel');
const panelContent = document.getElementById('panelContent');
const ship = document.getElementById('ship');

function openPanel(name, targetButton = null) {
  panelContent.innerHTML = panelData[name] || panelData.home;
  panel.classList.add('open');

  if (targetButton) {
    const rect = targetButton.getBoundingClientRect();
    const parent = document.querySelector('.solar-system').getBoundingClientRect();
    ship.style.left = `${rect.left - parent.left + rect.width / 2}px`;
    ship.style.top = `${rect.top - parent.top + rect.height / 2}px`;
  }

  completeQuest(name);
}

function completeQuest(name) {
  const questNames = ['projects', 'skills', 'internship', 'achievements', 'contact'];
  if (!questNames.includes(name)) return;

  if (!visited[name]) {
    visited[name] = true;
    xp += 100;
    localStorage.setItem('visitedPlanets', JSON.stringify(visited));
    localStorage.setItem('missionXp', xp);
    showToast(`+100 XP unlocked: ${name.toUpperCase()} planet explored!`);
    updateMission();
  }
}

function updateMission() {
  document.getElementById('xp').textContent = xp;
  document.getElementById('xpBar').style.width = `${Math.min(xp / 5, 100)}%`;

  const level = document.getElementById('level');
  if (xp >= 500) level.textContent = 'Level 5: Portfolio Master 🎉';
  else if (xp >= 300) level.textContent = 'Level 3: Space Explorer';
  else if (xp >= 100) level.textContent = 'Level 2: Mission Cadet';
  else level.textContent = 'Level 1: Visitor';

  document.querySelectorAll('#questList li').forEach(item => {
    const quest = item.dataset.quest;
    if (visited[quest]) {
      item.classList.add('done');
      item.textContent = `☑ Visit ${item.textContent.replace('☐ Visit ', '').replace('☑ Visit ', '')}`;
    }
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2600);
}

document.querySelectorAll('[data-panel]').forEach(btn => {
  btn.addEventListener('click', () => openPanel(btn.dataset.panel, btn.classList.contains('planet') ? btn : null));
});

document.getElementById('closePanel').addEventListener('click', () => panel.classList.remove('open'));

const botButton = document.getElementById('botButton');
const botBox = document.getElementById('botBox');
botButton.addEventListener('click', () => botBox.classList.toggle('open'));

document.getElementById('botAsk').addEventListener('click', answerBot);
document.getElementById('botInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') answerBot();
});

function answerBot() {
  const input = document.getElementById('botInput').value.toLowerCase();
  const answer = document.getElementById('botAnswer');

  if (input.includes('project')) {
    answer.textContent = 'Binshad has projects like Agricultural Intruder Detection, Job Scraper, and Lumos Reader. 🚀';
  } else if (input.includes('skill')) {
    answer.textContent = 'Main skills include Python, HTML, CSS, JavaScript, SQL, Web Scraping, and AI concepts. 🛠️';
  } else if (input.includes('intern')) {
    answer.textContent = 'Internship experience: CongiLeran, HiLite Business Park, Kozhikode for 1 month. 💼';
  } else if (input.includes('contact')) {
    answer.textContent = 'You can contact Binshad by email, phone, LinkedIn, or GitHub. 📡';
  } else {
    answer.textContent = 'Try asking about projects, skills, internship, achievements, or contact. 🤖';
  }
}

let soundOn = true;
document.getElementById('soundToggle').addEventListener('click', () => {
  soundOn = !soundOn;
  document.getElementById('soundToggle').textContent = soundOn ? '🔊 Sound' : '🔇 Muted';
  showToast(soundOn ? 'Sound mode enabled' : 'Sound muted');
});

document.getElementById('downloadResume').addEventListener('click', () => {
  showToast('Add your resume PDF link in the button to enable download.');
});

let secret = '';
document.addEventListener('keydown', e => {
  secret += e.key.toLowerCase();
  if (secret.length > 12) secret = secret.slice(-12);
  if (secret.includes('/binshad')) {
    showToast('Secret launch activated! 🛸');
    ship.style.transform = 'translate(-50%, -50%) rotate(720deg) scale(1.8)';
    setTimeout(() => ship.style.transform = 'translate(-50%, -50%)', 1600);
    secret = '';
  }
});

updateMission();
