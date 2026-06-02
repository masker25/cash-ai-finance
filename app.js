const TODAY = "2026-06-02";
const SAFETY_LINE = 100;
const FORECAST_OPENING = 110;
const FORECAST_DAYS = 30;

const initialData = {
  entities: [
    { id: "A", name: "A主体", status: "active" },
    { id: "B", name: "B主体", status: "active" },
  ],
  accounts: [
    {
      id: "acc-a-cmb",
      entityId: "A",
      bankName: "招商银行",
      accountName: "基本户",
      accountNoMasked: "**** 1028",
      accountType: "basic",
      bookBalance: 112,
      restrictedAmount: 12,
      availableBalance: 100,
      lastSyncedAt: "2026-06-02 09:30",
    },
    {
      id: "acc-a-ccb",
      entityId: "A",
      bankName: "建设银行",
      accountName: "一般户",
      accountNoMasked: "**** 7741",
      accountType: "general",
      bookBalance: 238,
      restrictedAmount: 28,
      availableBalance: 210,
      lastSyncedAt: "2026-06-02 09:30",
    },
    {
      id: "acc-b-icbc",
      entityId: "B",
      bankName: "工商银行",
      accountName: "基本户",
      accountNoMasked: "**** 6590",
      accountType: "basic",
      bookBalance: 820,
      restrictedAmount: 60,
      availableBalance: 760,
      lastSyncedAt: "2026-06-02 09:30",
    },
    {
      id: "acc-b-abc",
      entityId: "B",
      bankName: "农业银行",
      accountName: "一般户",
      accountNoMasked: "**** 4388",
      accountType: "general",
      bookBalance: 210,
      restrictedAmount: 30,
      availableBalance: 180,
      lastSyncedAt: "2026-06-02 09:30",
    },
  ],
  events: [
    {
      id: "evt-receivable-a",
      eventType: "receivable_plan",
      entityId: "A",
      accountId: "acc-a-cmb",
      name: "客户A回款",
      direction: "inflow",
      amount: 50,
      eventDate: "2026-06-15",
      status: "pending_confirm",
      source: "manual",
      confidence: "high",
      affectsForecast: true,
      includeInBaseline: true,
      counterparty: "客户A",
      matchStatus: "unmatched",
      voucherStatus: "not_generated",
    },
    {
      id: "evt-supplier-b",
      eventType: "payable_plan",
      entityId: "A",
      accountId: "acc-a-ccb",
      name: "供应商B付款",
      direction: "outflow",
      amount: 120,
      eventDate: "2026-06-18",
      status: "confirmed",
      source: "erp",
      confidence: "high",
      affectsForecast: true,
      includeInBaseline: true,
      counterparty: "供应商B",
      matchStatus: "not_required",
      voucherStatus: "not_generated",
    },
    {
      id: "evt-tax",
      eventType: "tax_plan",
      entityId: "A",
      accountId: "acc-a-cmb",
      name: "税费缴纳",
      direction: "outflow",
      amount: 42,
      eventDate: "2026-06-18",
      status: "confirmed",
      source: "erp",
      confidence: "high",
      affectsForecast: true,
      includeInBaseline: true,
      counterparty: "税务机关",
      matchStatus: "not_required",
      voucherStatus: "not_generated",
    },
    {
      id: "evt-rent",
      eventType: "payable_plan",
      entityId: "A",
      accountId: "acc-a-cmb",
      name: "租金付款",
      direction: "outflow",
      amount: 30,
      eventDate: "2026-06-18",
      status: "confirmed",
      source: "excel",
      confidence: "high",
      affectsForecast: true,
      includeInBaseline: true,
      counterparty: "园区物业",
      matchStatus: "not_required",
      voucherStatus: "not_generated",
    },
    {
      id: "evt-transfer-ba",
      eventType: "transfer_in",
      entityId: "A",
      accountId: "acc-a-cmb",
      name: "B主体 -> A主体调拨",
      direction: "inflow",
      amount: 80,
      eventDate: "2026-06-18",
      status: "pending_confirm",
      source: "ai",
      confidence: "high",
      affectsForecast: true,
      includeInBaseline: false,
      counterparty: "B主体",
      matchStatus: "not_required",
      voucherStatus: "not_required",
    },
    {
      id: "evt-ops-receivable",
      eventType: "receivable_plan",
      entityId: "A",
      accountId: "acc-a-ccb",
      name: "客户C运营回款",
      direction: "inflow",
      amount: 220,
      eventDate: "2026-06-20",
      status: "confirmed",
      source: "erp",
      confidence: "high",
      affectsForecast: true,
      includeInBaseline: true,
      counterparty: "客户C",
      matchStatus: "not_required",
      voucherStatus: "not_generated",
    },
    {
      id: "evt-payroll",
      eventType: "payroll_plan",
      entityId: "A",
      accountId: "acc-a-ccb",
      name: "工资付款",
      direction: "outflow",
      amount: 150,
      eventDate: "2026-06-21",
      status: "confirmed",
      source: "erp",
      confidence: "high",
      affectsForecast: true,
      includeInBaseline: true,
      counterparty: "员工工资批次",
      matchStatus: "not_required",
      voucherStatus: "not_generated",
    },
    {
      id: "evt-unmatched-inflow",
      eventType: "bank_transaction",
      entityId: "A",
      accountId: "acc-a-cmb",
      name: "银行流水：客户A疑似到账",
      direction: "inflow",
      amount: 30,
      eventDate: "2026-06-13",
      status: "occurred",
      source: "bank",
      confidence: "medium",
      affectsForecast: false,
      includeInBaseline: false,
      counterparty: "客户A",
      matchStatus: "unmatched",
      voucherStatus: "none",
    },
    {
      id: "evt-duplicate-payment",
      eventType: "payable_plan",
      entityId: "A",
      accountId: "acc-a-ccb",
      name: "疑似重复付款复核",
      direction: "outflow",
      amount: 30,
      eventDate: "2026-06-17",
      status: "pending_confirm",
      source: "ai",
      confidence: "medium",
      affectsForecast: false,
      includeInBaseline: false,
      counterparty: "供应商D",
      matchStatus: "proposed",
      voucherStatus: "not_generated",
    },
  ],
  tasks: [
    {
      id: "task-receivable-a",
      taskType: "confirm_receivable",
      title: "客户A回款待确认",
      entityId: "A",
      amount: 50,
      affectedDate: "2026-06-15",
      impactDescription: "若延期，2026年6月18日缺口将从 -32.0万元 扩大到 -82.0万元。",
      recommendedActions: ["确认到账", "修改日期", "标记不确定"],
      status: "pending",
      relatedEventIds: ["evt-receivable-a"],
      priority: "high",
    },
    {
      id: "task-transfer-ba",
      taskType: "confirm_transfer",
      title: "B主体 -> A主体调拨待确认",
      entityId: "A",
      amount: 80,
      affectedDate: "2026-06-18",
      impactDescription: "确认后，A主体2026年6月18日预计可用资金从 -32.0万元 更新为 +48.0万元。",
      recommendedActions: ["确认调拨", "改金额", "取消"],
      status: "pending",
      relatedEventIds: ["evt-transfer-ba"],
      priority: "high",
    },
    {
      id: "task-match-flow",
      taskType: "match_transaction",
      title: "客户A疑似到账流水待匹配",
      entityId: "A",
      amount: 30,
      affectedDate: "2026-06-13",
      impactDescription: "匹配后可把银行流水与客户A回款计划合并，避免重复计入。",
      recommendedActions: ["匹配计划", "忽略流水"],
      status: "pending",
      relatedEventIds: ["evt-unmatched-inflow"],
      priority: "medium",
    },
    {
      id: "task-duplicate-payment",
      taskType: "review_duplicate_payment",
      title: "供应商D疑似重复付款",
      entityId: "A",
      amount: 30,
      affectedDate: "2026-06-17",
      impactDescription: "若确认为重复付款，应取消计划，避免风险日期前额外流出。",
      recommendedActions: ["标记重复", "确认正常"],
      status: "pending",
      relatedEventIds: ["evt-duplicate-payment"],
      priority: "high",
    },
    {
      id: "task-supplier-b",
      taskType: "confirm_payable",
      title: "供应商B付款凭证待复核",
      entityId: "A",
      amount: 120,
      affectedDate: "2026-06-18",
      impactDescription: "该付款已纳入预测，复核凭证可提高追溯完整性。",
      recommendedActions: ["确认凭证", "查看详情"],
      status: "pending",
      relatedEventIds: ["evt-supplier-b"],
      priority: "medium",
    },
    {
      id: "task-payroll",
      taskType: "change_plan_date",
      title: "工资付款批次日期复核",
      entityId: "A",
      amount: 150,
      affectedDate: "2026-06-21",
      impactDescription: "如提前至2026年6月18日前，将加剧短期资金压力。",
      recommendedActions: ["确认日期", "修改日期"],
      status: "pending",
      relatedEventIds: ["evt-payroll"],
      priority: "medium",
    },
    {
      id: "task-ops-receivable",
      taskType: "confirm_receivable",
      title: "客户C运营回款日期复核",
      entityId: "A",
      amount: 220,
      affectedDate: "2026-06-20",
      impactDescription: "该回款影响工资付款后的安全垫，建议确认到账窗口。",
      recommendedActions: ["确认日期", "修改日期"],
      status: "pending",
      relatedEventIds: ["evt-ops-receivable"],
      priority: "low",
    },
  ],
  records: [
    {
      id: "record-risk-1",
      createdAt: "2026-06-02 09:32",
      recordType: "risk_tip",
      title: "发现 A主体 6月18日资金缺口",
      content: "基准预测下，A主体2026年6月18日预计期末可用资金为 -32.0万元。主要原因是当日确认付款合计 192.0万元，而 B主体 -> A主体 80.0万元调拨仍未确认。",
      relatedEventIds: ["evt-supplier-b", "evt-tax", "evt-rent", "evt-transfer-ba"],
      relatedTaskIds: ["task-transfer-ba"],
    },
    {
      id: "record-explain-1",
      createdAt: "2026-06-02 09:31",
      recordType: "explanation",
      title: "预测口径说明",
      content: "当前使用基准预测：已确认事项 + 高置信度且可直接纳入的待确认事项。调拨计划在用户确认前暂不纳入基准预测。",
      relatedEventIds: ["evt-transfer-ba"],
      relatedTaskIds: [],
    },
  ],
};

let state = {
  forecastMode: "baseline",
  selectedDate: "2026-06-18",
  selectedTaskId: null,
  drawerOpen: false,
  showCriticalOnly: false,
  chartMeta: null,
  resizeBound: false,
  ...clone(initialData),
};

const app = document.querySelector("#app");

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function parseDate(iso) {
  return new Date(`${iso}T00:00:00+08:00`);
}

function toISO(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function addDays(iso, count) {
  const date = parseDate(iso);
  date.setDate(date.getDate() + count);
  return toISO(date);
}

function formatDateZh(iso) {
  const date = parseDate(iso);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

function formatMonthDay(iso) {
  const date = parseDate(iso);
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

function formatWeek(iso) {
  const names = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  return names[parseDate(iso).getDay()];
}

function formatAmountWan(value, options = {}) {
  const { showSign = false, unit = true, decimals = 1 } = options;
  const sign = value < 0 ? "-" : showSign && value > 0 ? "+" : "";
  const n = Math.abs(value).toLocaleString("zh-CN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${sign}${n}${unit ? "万元" : ""}`;
}

function formatPercent(value) {
  return `${value.toLocaleString("zh-CN", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })}%`;
}

function sum(values) {
  return values.reduce((total, value) => total + value, 0);
}

function getEntityName(id) {
  return state.entities.find((entity) => entity.id === id)?.name || id;
}

function getAccountName(id) {
  const account = state.accounts.find((item) => item.id === id);
  if (!account) return "未指定账户";
  return `${account.bankName}${account.accountName}`;
}

function getSourceLabel(source) {
  const map = {
    bank: "银行流水",
    manual: "手工计划",
    excel: "Excel导入",
    ai: "AI建议",
    erp: "ERP计划",
  };
  return map[source] || source;
}

function getStatusLabel(status) {
  const map = {
    pending_confirm: "待确认",
    confirmed: "已确认",
    occurred: "已发生",
    matched: "已匹配",
    ignored: "已忽略",
    cancelled: "已取消",
    pending: "待处理",
    done: "已处理",
    unmatched: "未匹配",
    proposed: "建议匹配",
    not_required: "不适用",
    not_generated: "未生成",
    generated: "已生成",
    none: "无",
  };
  return map[status] || status;
}

function getEventTypeLabel(type) {
  const map = {
    bank_transaction: "流水",
    receivable_plan: "收款",
    payable_plan: "付款",
    tax_plan: "税费",
    payroll_plan: "工资",
    loan_plan: "融资",
    transfer_in: "调入",
    transfer_out: "调出",
    risk: "风险",
    ai_suggestion: "AI建议",
  };
  return map[type] || type;
}

function getTagClass(statusOrRisk) {
  if (["risk", "high"].includes(statusOrRisk)) return "risk";
  if (["watch", "medium", "pending", "pending_confirm"].includes(statusOrRisk)) return "watch";
  if (["safe", "low", "done", "confirmed", "occurred", "matched"].includes(statusOrRisk)) return "brand";
  return "";
}

function getRiskLabel(level) {
  if (level === "risk") return "风险";
  if (level === "watch") return "关注";
  return "正常";
}

function eventSignedAmount(event) {
  if (event.direction === "outflow") return -event.amount;
  if (event.direction === "inflow") return event.amount;
  return 0;
}

function shouldIncludeEvent(event) {
  if (!event.affectsForecast) return false;
  if (["confirmed", "occurred", "matched"].includes(event.status)) return true;
  if (event.status !== "pending_confirm") return false;
  if (state.forecastMode === "conservative") return false;
  if (state.forecastMode === "optimistic") return true;
  return Boolean(event.includeInBaseline);
}

function computeForecast() {
  const days = [];
  let opening = FORECAST_OPENING;

  for (let i = 0; i < FORECAST_DAYS; i += 1) {
    const date = addDays(TODAY, i);
    const dayEvents = state.events.filter((event) => event.entityId === "A" && event.eventDate === date);
    const includedEvents = dayEvents.filter(shouldIncludeEvent);

    const confirmedInflow = sum(
      includedEvents
        .filter((event) => event.direction === "inflow" && event.eventType !== "transfer_in" && event.status !== "pending_confirm")
        .map((event) => event.amount)
    );
    const pendingInflowIncluded = sum(
      includedEvents
        .filter((event) => event.direction === "inflow" && event.eventType !== "transfer_in" && event.status === "pending_confirm")
        .map((event) => event.amount)
    );
    const confirmedOutflow = sum(
      includedEvents
        .filter((event) => event.direction === "outflow" && event.eventType !== "transfer_out" && event.status !== "pending_confirm")
        .map((event) => event.amount)
    );
    const pendingOutflowIncluded = sum(
      includedEvents
        .filter((event) => event.direction === "outflow" && event.eventType !== "transfer_out" && event.status === "pending_confirm")
        .map((event) => event.amount)
    );
    const transferIn = sum(includedEvents.filter((event) => event.eventType === "transfer_in").map((event) => event.amount));
    const transferOut = sum(includedEvents.filter((event) => event.eventType === "transfer_out").map((event) => event.amount));
    const ending =
      opening +
      confirmedInflow +
      pendingInflowIncluded -
      confirmedOutflow -
      pendingOutflowIncluded +
      transferIn -
      transferOut;

    const pendingTaskIds = state.tasks
      .filter((task) => task.status === "pending" && task.affectedDate === date)
      .map((task) => task.id);
    const riskLevel = ending < 0 ? "risk" : ending < SAFETY_LINE || pendingTaskIds.length > 0 ? "watch" : "safe";

    days.push({
      date,
      openingAvailableBalance: opening,
      confirmedInflow,
      pendingInflowIncluded,
      confirmedOutflow,
      pendingOutflowIncluded,
      transferIn,
      transferOut,
      endingAvailableBalance: ending,
      riskLevel,
      relatedEventIds: dayEvents.map((event) => event.id),
      pendingTaskIds,
    });

    opening = ending;
  }

  const minDay = days.reduce((min, day) => (day.endingAvailableBalance < min.endingAvailableBalance ? day : min), days[0]);
  const recentRisk = days.find((day) => day.endingAvailableBalance < 0) || null;
  return { days, minDay, recentRisk };
}

function computeMetrics(forecast) {
  const bookBalance = sum(state.accounts.map((account) => account.bookBalance));
  const restrictedAmount = sum(state.accounts.map((account) => account.restrictedAmount));
  const availableBalance = sum(state.accounts.map((account) => account.availableBalance));
  const pendingTasks = state.tasks.filter((task) => task.status === "pending");
  const criticalTasks = pendingTasks.filter((task) => ["high", "medium"].includes(task.priority));
  const riskIsResolved = !forecast.recentRisk;
  const minLevel = forecast.minDay.endingAvailableBalance < 0 ? "risk" : forecast.minDay.endingAvailableBalance < SAFETY_LINE ? "watch" : "safe";

  return {
    bookBalance,
    restrictedAmount,
    availableBalance,
    pendingTaskCount: pendingTasks.length,
    criticalTaskCount: criticalTasks.length,
    criticalImpact: 260,
    minLevel,
    conclusion: riskIsResolved
      ? `当前现金风险已解除，但 A主体 ${formatMonthDay(forecast.minDay.date)} 安全垫仅 ${formatAmountWan(
          forecast.minDay.endingAvailableBalance,
          { showSign: true }
        )}，仍需继续确认关键事项。`
      : `当前现金总体可控，但 A主体 ${formatMonthDay(forecast.recentRisk.date)} 预计缺口 ${formatAmountWan(
          forecast.recentRisk.endingAvailableBalance,
          { showSign: true }
        )}，主要受供应商付款集中和调拨未确认影响。`,
    statusLabel: riskIsResolved ? "关注" : "可控",
  };
}

function render() {
  const forecast = computeForecast();
  const metrics = computeMetrics(forecast);
  const selectedDay = forecast.days.find((day) => day.date === state.selectedDate) || forecast.minDay;

  app.innerHTML = `
    <div class="app-shell">
      ${renderTopbar()}
      <main class="page">
        ${renderConclusion(metrics, forecast)}
        ${renderMetrics(metrics, forecast)}
        ${renderTrendSection()}
        ${renderWorkspace(forecast, metrics)}
      </main>
      ${renderDrawer(selectedDay)}
    </div>
  `;

  bindEvents(forecast);
  drawTrendChart(forecast);
  if (!state.resizeBound) {
    state.resizeBound = true;
    window.addEventListener("resize", debounce(() => render(), 120));
  }
}

function renderTopbar() {
  return `
    <header class="topbar">
      <div class="product-mark">
        <div class="mark-icon">资</div>
        <div>
          <h1 class="product-title">AI-native 资金管理原型</h1>
          <p class="product-subtitle">可信资金事实 -> 现金安全判断 -> 关键事项处理 -> AI 记录追溯</p>
        </div>
      </div>
      <div class="topbar-actions">
        <div class="segmented" aria-label="预测口径">
          ${["conservative", "baseline", "optimistic"]
            .map(
              (mode) => `
                <button type="button" class="${state.forecastMode === mode ? "active" : ""}" data-mode="${mode}">
                  ${mode === "conservative" ? "保守" : mode === "baseline" ? "基准" : "乐观"}
                </button>`
            )
            .join("")}
        </div>
        <button type="button" class="ghost-button" data-action="reset-demo">重置演示</button>
      </div>
    </header>
  `;
}

function renderConclusion(metrics, forecast) {
  const dotClass = forecast.recentRisk ? "risk" : metrics.minLevel === "watch" ? "watch" : "";
  return `
    <section class="conclusion-band" aria-labelledby="cashConclusionTitle">
      <div>
        <div class="conclusion-label">
          <span class="status-dot ${dotClass}"></span>
          <span id="cashConclusionTitle">现金安全结论：${metrics.statusLabel}</span>
        </div>
        <p class="conclusion-text">${highlightRisk(metrics.conclusion)}</p>
        <div class="conclusion-meta">
          <span>演示日期：${formatDateZh(TODAY)}</span>
          <span>预测范围：未来30天</span>
          <span>安全线：${formatAmountWan(SAFETY_LINE)}</span>
          <span>预测可信度：${formatPercent(86.4)}</span>
        </div>
      </div>
      <aside class="audit-box" aria-label="数据可信状态">
        <p class="audit-title">可信资金事实</p>
        <div class="audit-row"><span>余额同步</span><strong>4/4</strong></div>
        <div class="audit-row"><span>计划纳入</span><strong>${state.events.filter((event) => event.affectsForecast).length}项</strong></div>
        <div class="audit-row"><span>流水待匹配</span><strong>${state.tasks.filter((task) => task.taskType === "match_transaction" && task.status === "pending").length}项</strong></div>
        <div class="audit-row"><span>AI 直接改数</span><strong>不允许</strong></div>
      </aside>
    </section>
  `;
}

function highlightRisk(text) {
  return text.replace(/(-|\+)?[\d,.]+\.0万元|缺口|安全垫仅/g, (match) => {
    if (match.includes("-") || match === "缺口" || match === "安全垫仅") return `<strong>${match}</strong>`;
    return `<span class="num">${match}</span>`;
  });
}

function renderMetrics(metrics, forecast) {
  const minClass = metrics.minLevel === "risk" ? "risk" : metrics.minLevel === "watch" ? "watch" : "";
  return `
    <section class="metrics-grid" aria-label="核心资金指标">
      <button type="button" class="metric-card" data-action="show-accounts">
        <span class="metric-label">当前可用资金</span>
        <span class="metric-value num">${formatAmountWan(metrics.availableBalance)}</span>
        <span class="metric-note">账面余额：${formatAmountWan(metrics.bookBalance)}｜受限资金：${formatAmountWan(metrics.restrictedAmount)}<br />数据截至：2026-06-02 09:30</span>
      </button>
      <button type="button" class="metric-card" data-action="open-min-day">
        <span class="metric-label">未来最低可用资金</span>
        <span class="metric-value num ${minClass}">${formatAmountWan(forecast.minDay.endingAvailableBalance, { showSign: true })}</span>
        <span class="metric-note">基准预测｜A主体｜${formatDateZh(forecast.minDay.date)}</span>
      </button>
      <button type="button" class="metric-card" data-action="open-risk-day">
        <span class="metric-label">最近风险 / 最大缺口</span>
        <span class="metric-value num ${forecast.recentRisk ? "risk" : "watch"}">${
          forecast.recentRisk ? `A主体 ${formatAmountWan(forecast.recentRisk.endingAvailableBalance, { showSign: true })}` : "暂无负余额"
        }</span>
        <span class="metric-note">${forecast.recentRisk ? `${formatDateZh(forecast.recentRisk.date)}｜余额不足` : `${formatDateZh(forecast.minDay.date)}｜低于安全线`}</span>
      </button>
      <button type="button" class="metric-card" data-action="toggle-critical">
        <span class="metric-label">关键待处理事项</span>
        <span class="metric-value num ${metrics.criticalTaskCount > 0 ? "watch" : ""}">${metrics.pendingTaskCount}项</span>
        <span class="metric-note">关键事项：${metrics.criticalTaskCount}项｜影响金额：${formatAmountWan(metrics.criticalImpact)}</span>
      </button>
    </section>
  `;
}

function renderTrendSection() {
  return `
    <section class="trend-section" aria-labelledby="trendTitle">
      <div class="section-header">
        <div>
          <h2 class="section-title" id="trendTitle">未来30天现金安全趋势</h2>
          <p class="section-subtitle">X轴为日期，Y轴为 A主体预计期末可用资金。点击风险点可打开日期详情。</p>
        </div>
        <button type="button" class="ghost-button" data-action="open-min-day">定位最低点</button>
      </div>
      <div class="chart-wrap">
        <canvas id="trendChart" aria-label="未来30天现金安全趋势图"></canvas>
        <div id="chartTooltip" class="chart-tooltip" role="presentation"></div>
      </div>
      <div class="chart-legend">
        <span class="legend-item"><span class="legend-line"></span>预计期末可用资金</span>
        <span class="legend-item"><span class="legend-line safety"></span>安全线 ${formatAmountWan(SAFETY_LINE)}</span>
        <span class="legend-item"><span class="legend-dot"></span>风险点 / 最低点</span>
      </div>
    </section>
  `;
}

function renderWorkspace(forecast, metrics) {
  return `
    <section class="workspace" aria-label="资金作业区">
      <aside class="panel task-panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">关键待处理清单</h2>
            <div class="panel-meta">${state.showCriticalOnly ? "仅看高/中优先级" : "今日优先 + 风险相关 + 流水待匹配"}</div>
          </div>
          <span class="tag ${metrics.criticalTaskCount > 0 ? "watch" : "brand"}">${metrics.pendingTaskCount}项</span>
        </div>
        <div class="task-list">
          ${renderTasks()}
        </div>
      </aside>
      <section class="panel calendar-panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">资金变动日历</h2>
            <div class="panel-meta">日期卡片只展示余额、收款、付款、调拨和风险标记，明细进入抽屉。</div>
          </div>
          <div class="calendar-tools">
            <span class="tag brand">金额单位：万元</span>
            <span class="tag watch">小数：1位</span>
          </div>
        </div>
        <div class="weekday-row" aria-hidden="true">
          ${forecast.days
            .slice(0, 7)
            .map((day) => `<div>${formatWeek(day.date)}</div>`)
            .join("")}
        </div>
        <div class="calendar-grid">
          ${forecast.days.map(renderDayCard).join("")}
        </div>
      </section>
      <aside class="panel record-panel">
        <div class="panel-header">
          <div>
            <h2 class="panel-title">AI 记录 / 解释</h2>
            <div class="panel-meta">AI 只整理、解释、记录，不直接修改正式状态。</div>
          </div>
          <span class="tag brand">${state.records.length}条</span>
        </div>
        <div class="record-feed">
          ${state.records.map(renderRecord).join("")}
        </div>
      </aside>
    </section>
  `;
}

function renderTasks() {
  const tasks = state.tasks
    .filter((task) => (state.showCriticalOnly ? ["high", "medium"].includes(task.priority) : true))
    .sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      if (a.status !== b.status) return a.status === "pending" ? -1 : 1;
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) return priorityOrder[a.priority] - priorityOrder[b.priority];
      return a.affectedDate.localeCompare(b.affectedDate);
    });

  return tasks
    .map((task) => {
      const action = getTaskAction(task);
      return `
        <article class="task-card ${state.selectedTaskId === task.id ? "active" : ""} ${task.status === "done" ? "done" : ""}">
          <div class="task-top">
            <h3 class="task-title">${task.title}</h3>
            <span class="tag ${task.status === "done" ? "brand" : getTagClass(task.priority)}">${task.status === "done" ? "已处理" : task.priority === "high" ? "高" : task.priority === "medium" ? "中" : "低"}</span>
          </div>
          <div class="task-detail-grid">
            <span>主体</span><span>${getEntityName(task.entityId)}</span>
            <span>金额</span><span class="num">${formatAmountWan(task.amount, { showSign: true })}</span>
            <span>影响日期</span><span>${formatDateZh(task.affectedDate)}</span>
          </div>
          <p class="task-impact">${task.impactDescription}</p>
          <div class="task-actions">
            <button type="button" class="${task.status === "done" ? "ghost-button" : "primary-button"}" data-action="${action.action}" data-task-id="${task.id}" ${task.status === "done" ? "disabled" : ""}>${action.label}</button>
            <button type="button" class="ghost-button" data-action="open-task" data-task-id="${task.id}">查看详情</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function getTaskAction(task) {
  if (task.taskType === "confirm_transfer") return { action: "confirm-transfer", label: "确认调拨" };
  if (task.taskType === "confirm_receivable") return { action: "confirm-receivable", label: "确认事项" };
  if (task.taskType === "match_transaction") return { action: "mark-reviewed", label: "标记已匹配" };
  if (task.taskType === "review_duplicate_payment") return { action: "mark-reviewed", label: "标记已复核" };
  return { action: "mark-reviewed", label: "标记已确认" };
}

function renderDayCard(day) {
  const inflow = day.confirmedInflow + day.pendingInflowIncluded + day.transferIn;
  const outflow = day.confirmedOutflow + day.pendingOutflowIncluded + day.transferOut;
  const balanceClass = day.riskLevel === "risk" ? "risk" : day.riskLevel === "watch" ? "watch" : "";
  const tasks = state.tasks.filter((task) => task.status === "pending" && task.affectedDate === day.date);
  return `
    <button type="button" class="day-card ${day.riskLevel} ${state.selectedDate === day.date ? "active" : ""}" data-action="open-day" data-date="${day.date}">
      <div class="day-title">
        <span class="day-date">${formatMonthDay(day.date)}</span>
        <span>${formatWeek(day.date)}</span>
      </div>
      <div class="day-balance num ${balanceClass}">${formatAmountWan(day.endingAvailableBalance, { showSign: true })}</div>
      <div class="day-flow">
        <span>收款</span><strong class="num positive">${formatAmountWan(inflow, { showSign: true })}</strong>
        <span>付款</span><strong class="num negative">${formatAmountWan(-outflow, { showSign: true })}</strong>
        <span>调拨</span><strong class="num">${formatAmountWan(day.transferIn - day.transferOut, { showSign: true })}</strong>
      </div>
      <div class="day-tags">
        <span class="tag ${getTagClass(day.riskLevel)}">${getRiskLabel(day.riskLevel)}</span>
        ${tasks.length ? `<span class="tag watch">待处理 ${tasks.length}项</span>` : ""}
      </div>
    </button>
  `;
}

function renderRecord(record) {
  return `
    <article class="record-item ${record.recordType}">
      <div class="record-head">
        <h3 class="record-title">${record.title}</h3>
        <span class="record-time">${record.createdAt}</span>
      </div>
      <p class="record-content">${record.content}</p>
    </article>
  `;
}

function renderDrawer(day) {
  const dayEvents = state.events.filter((event) => day.relatedEventIds.includes(event.id));
  const dayTasks = state.tasks.filter((task) => day.pendingTaskIds.includes(task.id));
  const resultClass = day.endingAvailableBalance < 0 ? "" : day.endingAvailableBalance < SAFETY_LINE ? "watch" : "brand";

  return `
    <div class="drawer-backdrop ${state.drawerOpen ? "open" : ""}" data-action="close-drawer"></div>
    <aside class="drawer ${state.drawerOpen ? "open" : ""}" aria-label="日期详情抽屉" aria-hidden="${state.drawerOpen ? "false" : "true"}">
      <header class="drawer-header">
        <div>
          <h2 class="drawer-title">${formatDateZh(day.date)}资金明细</h2>
          <p class="drawer-subtitle">${getEntityName("A")}｜${getRiskLabel(day.riskLevel)}｜${dayTasks.length}项待处理｜安全线 ${formatAmountWan(SAFETY_LINE)}</p>
        </div>
        <button type="button" class="ghost-button" data-action="close-drawer" aria-label="关闭详情">关闭</button>
      </header>
      <div class="drawer-body">
        <section class="drawer-section">
          <h3 class="drawer-section-title">资金计算摘要</h3>
          <div class="calc-grid">
            <span>期初可用资金</span><strong class="num">${formatAmountWan(day.openingAvailableBalance)}</strong>
            <span>+ 确认收款</span><strong class="num positive">${formatAmountWan(day.confirmedInflow, { showSign: true })}</strong>
            <span>+ 纳入预测的待确认收款</span><strong class="num positive">${formatAmountWan(day.pendingInflowIncluded, { showSign: true })}</strong>
            <span>- 确认付款</span><strong class="num negative">${formatAmountWan(-day.confirmedOutflow, { showSign: true })}</strong>
            <span>- 纳入预测的待确认付款</span><strong class="num negative">${formatAmountWan(-day.pendingOutflowIncluded, { showSign: true })}</strong>
            <span>+ 调入 / - 调出</span><strong class="num">${formatAmountWan(day.transferIn - day.transferOut, { showSign: true })}</strong>
            <span class="result ${resultClass}">= 预计期末可用资金</span><strong class="num result ${resultClass}">${formatAmountWan(day.endingAvailableBalance, { showSign: true })}</strong>
          </div>
        </section>
        <section class="drawer-section">
          <h3 class="drawer-section-title">资金事项明细表</h3>
          <div class="detail-table-wrap">
            <table class="detail-table">
              <thead>
                <tr>
                  <th class="type-cell">事项类型</th>
                  <th>事项名称</th>
                  <th>主体</th>
                  <th>账户</th>
                  <th class="amount-cell">金额</th>
                  <th class="date-cell">日期</th>
                  <th class="status-cell">状态</th>
                  <th>来源</th>
                  <th>影响预测</th>
                  <th>匹配状态</th>
                  <th>凭证状态</th>
                  <th class="action-cell">操作</th>
                </tr>
              </thead>
              <tbody>
                ${dayEvents.length ? dayEvents.map(renderEventRow).join("") : renderEmptyEventRow()}
              </tbody>
            </table>
          </div>
        </section>
        <section class="drawer-section">
          <h3 class="drawer-section-title">AI 解释</h3>
          <p class="ai-explain">${buildAiExplanation(day, dayEvents)}</p>
        </section>
        <section class="drawer-section">
          <h3 class="drawer-section-title">可执行动作</h3>
          <div class="drawer-actions">
            ${renderDrawerActions(day, dayTasks)}
          </div>
        </section>
      </div>
    </aside>
  `;
}

function renderEventRow(event) {
  const signed = eventSignedAmount(event);
  const amountClass = signed < 0 ? "negative" : signed > 0 ? "positive" : "";
  const task = state.tasks.find((item) => item.relatedEventIds.includes(event.id) && item.status === "pending");
  const action = task ? getTaskAction(task) : null;
  return `
    <tr>
      <td class="type-cell">${getEventTypeLabel(event.eventType)}</td>
      <td>${event.name}</td>
      <td>${getEntityName(event.entityId)}</td>
      <td>${getAccountName(event.accountId)}</td>
      <td class="amount-cell num ${amountClass}">${formatAmountWan(signed, { showSign: true })}</td>
      <td class="date-cell">${formatMonthDay(event.eventDate)}</td>
      <td class="status-cell"><span class="tag ${getTagClass(event.status)}">${getStatusLabel(event.status)}</span></td>
      <td>${getSourceLabel(event.source)}</td>
      <td>${event.affectsForecast ? "是" : "否"}</td>
      <td>${getStatusLabel(event.matchStatus || "not_required")}</td>
      <td>${getStatusLabel(event.voucherStatus || "not_required")}</td>
      <td class="action-cell">${
        action ? `<button type="button" class="plain-button" data-action="${action.action}" data-task-id="${task.id}">${action.label}</button>` : "查看"
      }</td>
    </tr>
  `;
}

function renderEmptyEventRow() {
  return `
    <tr>
      <td colspan="12" class="muted">该日暂无纳入预测的资金事项。</td>
    </tr>
  `;
}

function renderDrawerActions(day, dayTasks) {
  if (!dayTasks.length) {
    return `<button type="button" class="ghost-button" data-action="add-risk-record" data-date="${day.date}">标记风险已知</button>`;
  }
  return dayTasks
    .map((task) => {
      const action = getTaskAction(task);
      return `<button type="button" class="${task.taskType === "confirm_transfer" ? "primary-button" : "ghost-button"}" data-action="${action.action}" data-task-id="${task.id}">${action.label}</button>`;
    })
    .join("");
}

function buildAiExplanation(day, dayEvents) {
  if (day.date === "2026-06-18") {
    const transfer = state.events.find((event) => event.id === "evt-transfer-ba");
    const transferConfirmed = transfer?.status === "confirmed";
    return transferConfirmed
      ? `2026年6月18日原本的负余额风险已通过调拨确认解除。
1. 当日确认付款合计 ${formatAmountWan(192)}，包括供应商B付款 ${formatAmountWan(120)}、税费缴纳 ${formatAmountWan(42)}、租金付款 ${formatAmountWan(30)}。
2. B主体 -> A主体 ${formatAmountWan(80)} 调拨已确认并纳入预测。
3. A主体预计期末可用资金从 -32.0万元 更新为 +48.0万元。
4. 该金额仍低于安全线 ${formatAmountWan(SAFETY_LINE)}，所以状态从“风险”降为“关注”。`
      : `2026年6月18日出现缺口的主要原因：
1. 当日确认付款合计 ${formatAmountWan(192)}，包括供应商B付款 ${formatAmountWan(120)}、税费缴纳 ${formatAmountWan(42)}、租金付款 ${formatAmountWan(30)}。
2. 客户A ${formatAmountWan(50)} 回款已按高置信度纳入基准预测。
3. B主体 -> A主体 ${formatAmountWan(80)} 调拨仍为待确认，基准口径暂不纳入。
4. 因此 A主体预计期末可用资金为 ${formatAmountWan(day.endingAvailableBalance, { showSign: true })}。若确认调拨，将更新为 +48.0万元。`;
  }

  if (!dayEvents.length) {
    return `该日没有直接资金事项，预计余额来自前一日结转。AI 仅记录计算链路，不凭空生成新收付款。`;
  }

  const inflow = sum(dayEvents.filter((event) => event.direction === "inflow").map((event) => event.amount));
  const outflow = sum(dayEvents.filter((event) => event.direction === "outflow").map((event) => event.amount));
  return `${formatDateZh(day.date)}共有 ${dayEvents.length} 项资金事项：收款/调入 ${formatAmountWan(inflow, { showSign: true })}，付款/调出 ${formatAmountWan(-outflow, { showSign: true })}。当前预测口径为“${getModeLabel(state.forecastMode)}”，仅按规则纳入符合条件的事项。`;
}

function getModeLabel(mode) {
  if (mode === "conservative") return "保守预测";
  if (mode === "optimistic") return "乐观预测";
  return "基准预测";
}

function bindEvents(forecast) {
  app.querySelectorAll("[data-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      state.forecastMode = button.dataset.mode;
      render();
    });
  });

  app.querySelectorAll("[data-action]").forEach((element) => {
    element.addEventListener("click", (event) => {
      const action = element.dataset.action;
      const taskId = element.dataset.taskId;
      const date = element.dataset.date;
      if (action !== "close-drawer") event.stopPropagation();

      if (action === "open-day") openDay(element.dataset.date);
      if (action === "open-min-day") openDay(forecast.minDay.date);
      if (action === "open-risk-day") openDay((forecast.recentRisk || forecast.minDay).date);
      if (action === "open-task") openTask(taskId);
      if (action === "confirm-transfer") confirmTransfer(taskId);
      if (action === "confirm-receivable") confirmReceivable(taskId);
      if (action === "mark-reviewed") markReviewed(taskId);
      if (action === "toggle-critical") {
        state.showCriticalOnly = !state.showCriticalOnly;
        render();
      }
      if (action === "show-accounts") {
        addRecord("explanation", "账户余额口径", `当前可用资金为集团合计 ${formatAmountWan(sum(state.accounts.map((item) => item.availableBalance)))}。A主体风险日期按付款专户可调度资金口径演示，避免把不可及时调度的余额误当成可覆盖付款的现金。`);
        render();
      }
      if (action === "close-drawer") {
        state.drawerOpen = false;
        render();
      }
      if (action === "reset-demo") {
        state = {
          forecastMode: "baseline",
          selectedDate: "2026-06-18",
          selectedTaskId: null,
          drawerOpen: false,
          showCriticalOnly: false,
          chartMeta: null,
          resizeBound: true,
          ...clone(initialData),
        };
        render();
      }
      if (action === "add-risk-record") {
        addRecord("operation", "风险已知标记", `你已将 ${formatDateZh(date)} 的资金状态标记为已知风险。该操作只生成记录，不改变预测数值。`);
        render();
      }
    });
  });

  const canvas = app.querySelector("#trendChart");
  const tooltip = app.querySelector("#chartTooltip");
  if (canvas && tooltip) {
    canvas.addEventListener("mousemove", (event) => handleChartMove(event, tooltip));
    canvas.addEventListener("mouseleave", () => tooltip.classList.remove("visible"));
    canvas.addEventListener("click", (event) => {
      const point = getNearestChartPoint(event);
      if (point) openDay(point.day.date);
    });
  }
}

function openDay(date) {
  state.selectedDate = date;
  state.selectedTaskId = null;
  state.drawerOpen = true;
  render();
}

function openTask(taskId) {
  const task = state.tasks.find((item) => item.id === taskId);
  if (!task) return;
  state.selectedTaskId = taskId;
  state.selectedDate = task.affectedDate;
  state.drawerOpen = true;
  render();
}

function confirmTransfer(taskId) {
  const task = state.tasks.find((item) => item.id === taskId);
  const event = state.events.find((item) => item.id === "evt-transfer-ba");
  if (!task || !event || task.status === "done") return;

  const beforeForecast = computeForecast();
  const beforeDay = beforeForecast.days.find((day) => day.date === task.affectedDate);
  event.status = "confirmed";
  event.includeInBaseline = true;
  task.status = "done";
  const afterForecast = computeForecast();
  const afterDay = afterForecast.days.find((day) => day.date === task.affectedDate);

  addRecord(
    "operation",
    "确认 B主体 -> A主体调拨",
    `你确认了 B主体 -> A主体 的 ${formatAmountWan(event.amount)} 调拨计划。影响：${formatDateZh(task.affectedDate)} A主体预计可用资金从 ${formatAmountWan(
      beforeDay.endingAvailableBalance,
      { showSign: true }
    )} 更新为 ${formatAmountWan(afterDay.endingAvailableBalance, { showSign: true })}。风险状态：余额不足风险已解除，但安全垫仍低于 ${formatAmountWan(SAFETY_LINE)}。`
  );

  state.selectedDate = task.affectedDate;
  state.selectedTaskId = task.id;
  state.drawerOpen = true;
  render();
}

function confirmReceivable(taskId) {
  const task = state.tasks.find((item) => item.id === taskId);
  if (!task || task.status === "done") return;
  const relatedEvents = state.events.filter((event) => task.relatedEventIds.includes(event.id));
  relatedEvents.forEach((event) => {
    if (event.status === "pending_confirm") {
      event.status = "confirmed";
      event.includeInBaseline = true;
    }
  });
  task.status = "done";
  addRecord(
    "operation",
    `确认${task.title}`,
    `你确认了 ${task.title}，金额 ${formatAmountWan(task.amount, { showSign: true })}，影响日期 ${formatDateZh(task.affectedDate)}。若该事项此前已纳入基准预测，本次操作主要提升预测可信度和追溯完整性。`
  );
  state.selectedDate = task.affectedDate;
  state.selectedTaskId = task.id;
  state.drawerOpen = true;
  render();
}

function markReviewed(taskId) {
  const task = state.tasks.find((item) => item.id === taskId);
  if (!task || task.status === "done") return;
  task.status = "done";
  addRecord(
    "operation",
    `处理${task.title}`,
    `你将 ${task.title} 标记为已处理，金额 ${formatAmountWan(task.amount, { showSign: true })}，影响日期 ${formatDateZh(task.affectedDate)}。该动作保留操作记录，未直接改变正式付款或银行流水。`
  );
  state.selectedDate = task.affectedDate;
  state.selectedTaskId = task.id;
  state.drawerOpen = true;
  render();
}

function addRecord(recordType, title, content) {
  state.records.unshift({
    id: `record-${Date.now()}`,
    createdAt: "2026-06-02 09:45",
    recordType,
    title,
    content,
    relatedEventIds: [],
    relatedTaskIds: [],
  });
}

function drawTrendChart(forecast) {
  const canvas = app.querySelector("#trendChart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(rect.width * dpr));
  canvas.height = Math.max(1, Math.floor(rect.height * dpr));
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const styles = getComputedStyle(document.documentElement);
  const brand = styles.getPropertyValue("--brand").trim();
  const risk = styles.getPropertyValue("--risk").trim();
  const aux = styles.getPropertyValue("--aux").trim();
  const muted = styles.getPropertyValue("--muted").trim();
  const line = styles.getPropertyValue("--line").trim();
  const text = styles.getPropertyValue("--text").trim();

  const width = rect.width;
  const height = rect.height;
  const pad = { top: 24, right: 24, bottom: 38, left: 62 };
  const plotWidth = width - pad.left - pad.right;
  const plotHeight = height - pad.top - pad.bottom;
  const values = forecast.days.map((day) => day.endingAvailableBalance);
  const minValue = Math.min(...values, 0, SAFETY_LINE);
  const maxValue = Math.max(...values, SAFETY_LINE, FORECAST_OPENING);
  const yMin = Math.floor((minValue - 40) / 20) * 20;
  const yMax = Math.ceil((maxValue + 40) / 20) * 20;
  const yScale = (value) => pad.top + ((yMax - value) / (yMax - yMin)) * plotHeight;
  const xScale = (index) => pad.left + (index / (forecast.days.length - 1)) * plotWidth;

  ctx.clearRect(0, 0, width, height);
  ctx.lineWidth = 1;
  ctx.strokeStyle = line;
  ctx.fillStyle = muted;
  ctx.font = "12px sans-serif";
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";

  const gridCount = 5;
  for (let i = 0; i <= gridCount; i += 1) {
    const value = yMin + ((yMax - yMin) / gridCount) * i;
    const y = yScale(value);
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(width - pad.right, y);
    ctx.stroke();
    ctx.fillText(formatAmountWan(value, { unit: false }), pad.left - 10, y);
  }

  const safetyY = yScale(SAFETY_LINE);
  ctx.strokeStyle = aux;
  ctx.setLineDash([6, 5]);
  ctx.beginPath();
  ctx.moveTo(pad.left, safetyY);
  ctx.lineTo(width - pad.right, safetyY);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.strokeStyle = brand;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  forecast.days.forEach((day, index) => {
    const x = xScale(index);
    const y = yScale(day.endingAvailableBalance);
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  forecast.days.forEach((day, index) => {
    const x = xScale(index);
    const y = yScale(day.endingAvailableBalance);
    const isMin = day.date === forecast.minDay.date;
    const isRisk = day.endingAvailableBalance < 0;
    const isToday = day.date === TODAY;
    if (!isMin && !isRisk && !isToday) return;
    ctx.beginPath();
    ctx.arc(x, y, isMin ? 5 : 4, 0, Math.PI * 2);
    ctx.fillStyle = isRisk || isMin ? risk : brand;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#fff";
    ctx.stroke();
  });

  ctx.fillStyle = text;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  const dateIndexes = [0, 6, 12, 18, 24, 29];
  dateIndexes.forEach((index) => {
    const day = forecast.days[index];
    if (!day) return;
    ctx.fillText(formatMonthDay(day.date), xScale(index), height - pad.bottom + 14);
  });

  state.chartMeta = {
    rect,
    points: forecast.days.map((day, index) => ({
      day,
      x: xScale(index),
      y: yScale(day.endingAvailableBalance),
    })),
  };
}

function handleChartMove(event, tooltip) {
  const point = getNearestChartPoint(event);
  if (!point) {
    tooltip.classList.remove("visible");
    return;
  }
  const day = point.day;
  tooltip.innerHTML = `
    <p class="tooltip-title">${formatDateZh(day.date)} ${formatWeek(day.date)}</p>
    <div class="tooltip-grid">
      <span>期末可用</span><strong>${formatAmountWan(day.endingAvailableBalance, { showSign: true })}</strong>
      <span>收款</span><strong>${formatAmountWan(day.confirmedInflow + day.pendingInflowIncluded + day.transferIn, { showSign: true })}</strong>
      <span>付款</span><strong>${formatAmountWan(-(day.confirmedOutflow + day.pendingOutflowIncluded + day.transferOut), { showSign: true })}</strong>
      <span>状态</span><strong>${getRiskLabel(day.riskLevel)}</strong>
    </div>
  `;
  tooltip.style.left = `${point.x}px`;
  tooltip.style.top = `${point.y - 12}px`;
  tooltip.classList.add("visible");
}

function getNearestChartPoint(event) {
  if (!state.chartMeta) return null;
  const canvas = app.querySelector("#trendChart");
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  let nearest = null;
  let distance = Infinity;
  state.chartMeta.points.forEach((point) => {
    const d = Math.abs(point.x - x);
    if (d < distance) {
      distance = d;
      nearest = point;
    }
  });
  return distance <= 28 ? nearest : null;
}

function debounce(fn, wait) {
  let timer = null;
  return (...args) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => fn(...args), wait);
  };
}

render();
