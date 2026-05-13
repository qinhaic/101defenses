// AI Defense Mechanism Analysis
// Uses Pollinations.AI free API (no key required)

const AI_CONFIG = {
  endpoint: 'https://text.pollinations.ai/v1/chat/completions',
  model: 'openai',
  temperature: 0.5,
  maxTokens: 1500
};

// Build system prompt from defense data
function buildSystemPrompt() {
  const defenseList = defenses.map(d =>
    `#${d.id} ${d.en} (${d.zh}): ${d.defZh}`
  ).join('\n');

  return `你是一位精通精神分析心理防御机制的专家。你熟悉Jerome S. Blackman的《101 Defenses: How the Mind Shields Itself》中列出的101种心理防御机制。

以下是101种防御机制的完整列表：

${defenseList}

你的任务：
1. 用户会描述一个人在人际关系中的互动方式、待人接物的表现
2. 你需要从上述101种防御机制中，识别出此人可能在使用的最相关的3-5种防御机制
3. 对每种防御机制，用中文简要解释为什么从用户的描述中可以看出这种防御

重要规则：
- 只能从上述101种防御列表中选择
- 必须引用防御的具体编号
- 你的分析仅供学习参考，不是心理诊断
- 语气友善、专业、容易理解

请严格按照以下JSON格式回复（不要包含其他内容）：
{
  "summary": "一两句话的总体分析",
  "defenses": [
    {"id": 编号, "reason": "为什么从描述中看出这种防御的中文解释"}
  ]
}`;
}

// Call the AI API
async function analyzeDefenses(userInput, relationshipType) {
  const relationshipContext = relationshipType ?
    `\n（这个人际互动发生在${relationshipType}关系中）` : '';

  const messages = [
    { role: 'system', content: buildSystemPrompt() },
    { role: 'user', content: `请分析以下描述中可能出现的防御机制：\n\n"${userInput}"${relationshipContext}\n\n请严格按JSON格式回复。` }
  ];

  try {
    const response = await fetch(AI_CONFIG.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: AI_CONFIG.model,
        messages: messages,
        temperature: AI_CONFIG.temperature,
        max_tokens: AI_CONFIG.maxTokens
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';

    // Try to parse JSON from response
    let result;
    try {
      // Find JSON block in response (may be wrapped in markdown)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseErr) {
      // Fallback: try to extract defense numbers from text
      const ids = [...content.matchAll(/#(\d{1,3})/g)].map(m => parseInt(m[1]));
      const uniqueIds = [...new Set(ids)].filter(id => id >= 1 && id <= 101);
      result = {
        summary: 'AI返回了非标准格式，以下是提取到的防御编号（仅供参考）',
        defenses: uniqueIds.map(id => {
          const d = defenses.find(x => x.id === id);
          return { id, reason: d ? `可能与${d.zh}相关` : '提取到的防御编号' };
        })
      };
    }

    // Enrich with defense data
    if (result.defenses) {
      result.defenses = result.defenses.map(def => {
        const full = defenses.find(d => d.id === def.id);
        return {
          id: def.id,
          nameEn: full ? full.en : `Defense #${def.id}`,
          nameZh: full ? full.zh : `防御#${def.id}`,
          reason: def.reason || '',
          phase: full ? full.phase : 'assorted',
          phaseZh: full ? full.phaseZh : ''
        };
      });
    }

    return { success: true, data: result, raw: content };

  } catch (error) {
    console.error('AI Analysis error:', error);
    return {
      success: false,
      error: error.message,
      suggestion: 'API暂时不可用。你可以浏览防御列表，通过搜索功能自行查阅相关防御机制。'
    };
  }
}

// ====== History Management (localStorage) ======

const HISTORY_KEY = 'defense_analysis_history';
const MAX_HISTORY = 20;

function getHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToHistory(entry) {
  const history = getHistory();
  history.unshift({
    id: Date.now(),
    input: entry.input,
    relationshipType: entry.relationshipType,
    result: entry.result,
    timestamp: new Date().toISOString()
  });
  // Keep only last MAX_HISTORY
  if (history.length > MAX_HISTORY) {
    history.length = MAX_HISTORY;
  }
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
}

// ====== UI Rendering ======

function renderAIAnalysisView() {
  const container = document.getElementById('aiContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="ai-layout">
      <div class="ai-input-panel">
        <h3 style="margin-bottom:0.8rem;color:var(--accent)">AI 防御机制分析</h3>
        <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:1rem">
          描述一个人的人际互动或待人接物的方式，AI将尝试识别其中可能存在的心理防御机制。
        </p>

        <div class="ai-form-group">
          <label class="ai-label">关系类型（可选）</label>
          <select id="aiRelationType" class="ai-select">
            <option value="">不限</option>
            <option value="亲密关系">亲密关系（伴侣/恋人）</option>
            <option value="职场">职场</option>
            <option value="家庭">家庭</option>
            <option value="朋友">朋友</option>
            <option value="亲子">亲子</option>
            <option value="其他">其他</option>
          </select>
        </div>

        <div class="ai-form-group">
          <label class="ai-label">描述这个人的互动方式</label>
          <textarea id="aiInput" class="ai-textarea"
            placeholder="例如：我的同事每次被领导批评后，回到座位就开始挑我的毛病，说我的工作做得不好。但他从来不直接跟领导表达不满..."
            rows="6"></textarea>
        </div>

        <div class="ai-form-group">
          <label class="ai-label">示例，点击可快速填入</label>
          <div class="ai-examples">
            <button class="ai-example-btn" data-text="我的伴侣在我们吵架后，总是不停地吃东西或者疯狂购物，但拒绝讨论我们之间的问题。">伴侣冲突后暴食购物</button>
            <button class="ai-example-btn" data-text="我有一位朋友，每次聚会都滔滔不绝地讲高深的理论和哲学，但从不谈论自己的感受或个人生活。">聚会时滔滔不绝谈理论</button>
            <button class="ai-example-btn" data-text="我的父亲总是在我做错事时说我没用，但我知道他年轻时也有同样的问题。他从来不承认自己犯过错。">父亲从不承认错误</button>
            <button class="ai-example-btn" data-text="我有一个同事明明能力很强，但每次被表扬时都说这只是运气好、没什么了不起的，甚至主动指出自己做得不够好的地方。">被表扬时总是贬低自己</button>
            <button class="ai-example-btn" data-text="我的母亲每次来看我时都要把我的冰箱塞满食物，但我已经35岁了完全能照顾自己。如果不让她这样做，她就会很难过。">母亲过度照顾成年子女</button>
          </div>
        </div>

        <button id="aiAnalyzeBtn" class="ai-analyze-btn">
          <span id="aiBtnText">🔍 开始分析</span>
          <span id="aiBtnLoading" style="display:none">⏳ 分析中...</span>
        </button>

        <p class="ai-note">本分析仅供学习参考，不构成心理诊断或治疗建议</p>

        <div id="aiResult" class="ai-result"></div>
      </div>

      <div class="ai-history-panel">
        <div class="ai-history-header">
          <h4>📝 分析历史</h4>
        </div>
        <div id="aiHistoryList" class="ai-history-list"></div>
      </div>
    </div>
  `;

  // Bind events
  bindAIEvents();
  renderHistory();
}

function bindAIEvents() {
  const analyzeBtn = document.getElementById('aiAnalyzeBtn');
  const inputEl = document.getElementById('aiInput');
  const relationEl = document.getElementById('aiRelationType');

  // Analyze button
  analyzeBtn.addEventListener('click', () => runAnalysis());

  // Enter key to submit (Ctrl+Enter)
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      runAnalysis();
    }
  });

  // Example buttons
  document.querySelectorAll('.ai-example-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      inputEl.value = btn.dataset.text;
      inputEl.focus();
    });
  });

}

async function runAnalysis() {
  const inputEl = document.getElementById('aiInput');
  const relationEl = document.getElementById('aiRelationType');
  const resultEl = document.getElementById('aiResult');
  const btnText = document.getElementById('aiBtnText');
  const btnLoading = document.getElementById('aiBtnLoading');
  const analyzeBtn = document.getElementById('aiAnalyzeBtn');

  const input = inputEl.value.trim();
  if (!input || input.length < 10) {
    resultEl.innerHTML = '<div class="ai-error">请至少输入10个字来描述人际互动的场景</div>';
    return;
  }

  // Show loading
  analyzeBtn.disabled = true;
  btnText.style.display = 'none';
  btnLoading.style.display = 'inline';
  resultEl.innerHTML = '<div class="ai-loading"><div class="ai-spinner"></div><p>AI正在分析防御机制...</p></div>';

  // Call API
  const result = await analyzeDefenses(input, relationEl.value);

  // Restore button
  analyzeBtn.disabled = false;
  btnText.style.display = 'inline';
  btnLoading.style.display = 'none';

  if (result.success) {
    displayResult(result.data);
    // Save to history
    saveToHistory({
      input: input,
      relationshipType: relationEl.value,
      result: result.data
    });
    renderHistory();
  } else {
    resultEl.innerHTML = `
      <div class="ai-error">
        <p><strong>分析失败</strong></p>
        <p>${result.error}</p>
        <p style="font-size:0.85rem;margin-top:0.5rem">${result.suggestion}</p>
      </div>`;
  }
}

function displayResult(data) {
  const resultEl = document.getElementById('aiResult');
  if (!resultEl) return;

  const defensesHtml = (data.defenses || []).map((def, idx) => `
    <div class="ai-defense-item">
      <div class="ai-defense-header">
        <span class="ai-defense-num">#${def.id}</span>
        <span class="ai-defense-name" onclick="openDetail(${def.id})" style="cursor:pointer;text-decoration:underline">
          ${def.nameEn} / ${def.nameZh}
        </span>
        <span class="card-phase phase-${def.phase}" style="font-size:0.7rem">${def.phaseZh}</span>
      </div>
      <p class="ai-defense-reason">${def.reason}</p>
    </div>
  `).join('');

  resultEl.innerHTML = `
    <div class="ai-result-card">
      <div class="ai-result-summary">
        <strong>📊 分析结果</strong>
        <p>${data.summary || ''}</p>
      </div>
      <div class="ai-result-defenses">
        <strong>可能的防御机制 (${(data.defenses || []).length}个):</strong>
        ${defensesHtml}
      </div>
      <p class="ai-disclaimer-inline">⚠️ 以上分析由AI生成，仅供学习参考，不构成心理诊断或治疗建议。如有需要，请寻求专业帮助。</p>
    </div>`;
}

function renderHistory() {
  const listEl = document.getElementById('aiHistoryList');
  if (!listEl) return;

  const history = getHistory();

  if (history.length === 0) {
    listEl.innerHTML = '<p style="color:var(--text-secondary);font-size:0.85rem;padding:1rem;text-align:center">暂无分析记录</p>';
    return;
  }

  listEl.innerHTML = history.map(entry => {
    const date = new Date(entry.timestamp);
    const dateStr = `${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2,'0')}`;
    const summary = entry.result?.summary || '';
    const defenseCount = entry.result?.defenses?.length || 0;

    return `
      <div class="ai-history-item" onclick="loadHistoryEntry(${entry.id})">
        <div class="ai-history-date">${dateStr} · ${defenseCount}个防御</div>
        <div class="ai-history-input">${entry.input.substring(0, 60)}...</div>
        <div class="ai-history-summary">${summary.substring(0, 80)}</div>
      </div>
    `;
  }).join('');
}

function loadHistoryEntry(id) {
  const history = getHistory();
  const entry = history.find(h => h.id === id);
  if (!entry) return;

  // Switch to AI tab if needed
  const aiTab = document.querySelector('[data-view="ai"]');
  if (aiTab && !aiTab.classList.contains('active')) {
    aiTab.click();
  }

  // Display result after a short delay to ensure view is rendered
  setTimeout(() => {
    document.getElementById('aiInput').value = entry.input;
    if (entry.relationshipType) {
      document.getElementById('aiRelationType').value = entry.relationshipType;
    }
    displayResult(entry.result);
  }, 200);
}

// Export for use in main page
window.runAnalysis = runAnalysis;
window.loadHistoryEntry = loadHistoryEntry;
window.renderAIAnalysisView = renderAIAnalysisView;
