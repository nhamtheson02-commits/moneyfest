"use client";

import { useEffect, useRef, useState, useTransition, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ClipboardCheck, Compass, RotateCcw, Target, Wallet, X } from "lucide-react";
import { submitCashflow, submitFinancialQuiz, submitGoalPlanner, submitMoneyPersona } from "@/lib/actions";
import { monthlyNeeded } from "@/lib/goal";
import {
  personaOrder,
  personaQuestions,
  personas,
  quizAreas,
  type PersonaKey,
} from "@/data/tools-lab";

type ToolId = "cashflow" | "quiz" | "persona" | "goal";

const tools: { id: ToolId; icon: typeof Wallet; title: string; desc: string; meta: string }[] = [
  { id: "cashflow", icon: Wallet, title: "Tiền của tôi đang đi đâu?", desc: "Nhìn rõ thu nhập, chi tiêu và phần tiết kiệm trong một tháng.", meta: "3 phút · Bản đồ dòng tiền" },
  { id: "quiz", icon: ClipboardCheck, title: "Tôi đã sẵn sàng đầu tư chưa?", desc: "5 câu hỏi giúp bạn biết nền tảng tài chính của mình đang ở đâu.", meta: "2 phút · Điểm trên thang 15" },
  { id: "persona", icon: Compass, title: "Tôi là người thế nào với tiền?", desc: "Minigame 6 tình huống để nhận “Chân dung tiền bạc” của riêng bạn.", meta: "2 phút · Chân dung tiền bạc" },
  { id: "goal", icon: Target, title: "Mục tiêu của tôi cần bao nhiêu?", desc: "Tính số tiền nên dành ra mỗi tháng để chạm mục tiêu đúng hạn.", meta: "1 phút · Kế hoạch theo tháng" },
];

const nf = new Intl.NumberFormat("vi-VN");

function short(n: number) {
  const abs = Math.abs(n);
  const sign = n < 0 ? "-" : "";
  if (abs >= 1e9) return `${sign}${(abs / 1e9).toLocaleString("vi-VN", { maximumFractionDigits: 2 })} tỷ`;
  if (abs >= 1e6) return `${sign}${(abs / 1e6).toLocaleString("vi-VN", { maximumFractionDigits: 1 })} triệu`;
  return `${sign}${nf.format(Math.round(abs))} đ`;
}

export function ToolsLab() {
  const [active, setActive] = useState<ToolId | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const read = () => {
      const id = window.location.hash.replace("#", "") as ToolId;
      if (tools.some((tool) => tool.id === id)) setActive(id);
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  useEffect(() => {
    if (!active) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => {
      panelRef.current?.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
    }, 60);
    return () => window.clearTimeout(timer);
  }, [active]);

  const activeTool = tools.find((tool) => tool.id === active) ?? null;

  function closePanel() {
    setActive(null);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("lab")?.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <div>
      <div className="tl-grid" role="list">
        {tools.map((tool, index) => {
          const Icon = tool.icon;
          const isActive = tool.id === active;
          return (
            <button
              key={tool.id}
              type="button"
              role="listitem"
              className={`tl-card${isActive ? " is-active" : ""}`}
              aria-pressed={isActive}
              aria-controls="tool-panel"
              onClick={() => setActive(isActive ? null : tool.id)}
            >
              <span className="tl-card-top">
                <span className="tl-card-icon"><Icon size={26} aria-hidden="true" /></span>
                <span className="tl-card-num">0{index + 1}</span>
              </span>
              <span className="tl-card-title">{tool.title}</span>
              <span className="tl-card-desc">{tool.desc}</span>
              <span className="tl-card-foot">
                <span>{tool.meta}</span>
                <span className="tl-card-go">{isActive ? "Đang mở" : "Bắt đầu"}<ArrowRight size={14} aria-hidden="true" /></span>
              </span>
            </button>
          );
        })}
      </div>

      <div id="tool-panel" ref={panelRef} className="scroll-mt-24">
        {activeTool ? (
          <section className="tl-panel" key={activeTool.id} aria-label={activeTool.title}>
            <header className="tl-panel-head">
              <span className="tl-card-icon"><activeTool.icon size={22} aria-hidden="true" /></span>
              <h3 className="mf-display text-2xl font-bold text-[var(--mf-midnight)]">{activeTool.title}</h3>
              <button type="button" className="tl-close" onClick={closePanel} aria-label="Đóng công cụ">
                <X size={18} aria-hidden="true" />
              </button>
            </header>
            <div className="tl-panel-body">
              {activeTool.id === "cashflow" ? <CashflowFlow /> : null}
              {activeTool.id === "quiz" ? <QuizFlow /> : null}
              {activeTool.id === "persona" ? <PersonaFlow /> : null}
              {activeTool.id === "goal" ? <GoalFlow /> : null}
            </div>
          </section>
        ) : (
          <p className="tl-hint">Chọn một thẻ ở trên để bắt đầu. Kết quả hiện ngay trên màn hình.</p>
        )}
      </div>
    </div>
  );
}

/* ---------- Thành phần dùng chung ---------- */

/** Giữ đầu khung công cụ trong tầm nhìn khi đổi bước/kết quả (quan trọng trên điện thoại). */
function usePanelTop(dep: unknown) {
  const ref = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const panel = ref.current?.closest(".tl-panel");
    if (!panel) return;
    if (panel.getBoundingClientRect().top < 0) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      panel.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
    }
  }, [dep]);
  return ref;
}

function Progress({ step, total }: { step: number; total: number }) {
  return (
    <div className="tl-progress" aria-label={`Bước ${step} trên ${total}`}>
      <div className="tl-progress-bar"><span style={{ width: `${(step / total) * 100}%` }} /></div>
      <span className="tl-progress-text">{step}/{total}</span>
    </div>
  );
}

function ChoiceWizard<T extends string | number>({
  questions,
  onDone,
}: {
  questions: { q: string; options: { label: string; value: T }[] }[];
  onDone: (answers: T[]) => void;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(T | undefined)[]>([]);
  const question = questions[step];
  const topRef = usePanelTop(step);

  function choose(value: T) {
    const next = [...answers];
    next[step] = value;
    setAnswers(next);
    if (step === questions.length - 1) onDone(next as T[]);
    else setStep(step + 1);
  }

  return (
    <div ref={topRef}>
      <Progress step={step + 1} total={questions.length} />
      <div key={step} className="tl-step">
        <p className="mf-display text-[1.35rem] font-semibold leading-snug text-[var(--mf-midnight)]">{question.q}</p>
        <div className="tl-options">
          {question.options.map((option, index) => (
            <button
              key={String(option.value) + index}
              type="button"
              className={`tl-option${answers[step] === option.value ? " is-selected" : ""}`}
              onClick={() => choose(option.value)}
            >
              <span className="tl-option-key">{String.fromCharCode(65 + index)}</span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </div>
      {step > 0 ? (
        <button type="button" className="tl-back" onClick={() => setStep(step - 1)}>
          <ArrowLeft size={14} aria-hidden="true" /> Câu trước
        </button>
      ) : null}
    </div>
  );
}

function SaveBox({
  save,
}: {
  save: (email: string, consent: boolean) => Promise<{ ok: boolean; message: string }>;
}) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, startTransition] = useTransition();

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!email.trim()) return setMessage({ ok: false, text: "Vui lòng nhập email của bạn." });
    if (!consent) return setMessage({ ok: false, text: "Vui lòng đồng ý với Chính sách bảo mật để lưu kết quả." });
    startTransition(async () => {
      const response = await save(email.trim(), consent);
      setMessage({ ok: response.ok, text: response.message });
    });
  }

  if (message?.ok) {
    return (
      <p className="tl-save-ok"><Check size={16} aria-hidden="true" />{message.text}</p>
    );
  }

  return (
    <form onSubmit={submit} className="tl-save" noValidate>
      <p className="font-semibold text-[var(--mf-midnight)]">Muốn lưu lại kết quả này?</p>
      <p className="mf-muted mt-1 text-sm">Để lại email, MONEYFEST sẽ gửi kết quả cùng gợi ý bước tiếp theo. Bạn không bắt buộc.</p>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <input
          className="mf-field flex-1"
          type="email"
          placeholder="email@cua-ban.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-label="Email"
        />
        <button className="mf-btn mf-btn-primary" disabled={pending}>{pending ? "Đang lưu..." : "Lưu kết quả"}</button>
      </div>
      <label className="mt-3 flex items-start gap-3 text-sm leading-6 text-[var(--mf-slate)]">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-[var(--mf-border)] accent-[var(--mf-gold)]"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
        />
        <span>
          Tôi đồng ý để MONEYFEST lưu thông tin và liên hệ theo{" "}
          <Link href="/privacy" className="font-bold text-[var(--mf-midnight)] underline">Chính sách bảo mật</Link>.
        </span>
      </label>
      {message && !message.ok ? <p className="mf-error-text mt-2">{message.text}</p> : null}
    </form>
  );
}

function ResultActions({ onReset, children }: { onReset: () => void; children?: ReactNode }) {
  return (
    <div className="tl-actions">
      {children}
      <button type="button" className="tl-back" onClick={onReset}><RotateCcw size={14} aria-hidden="true" /> Làm lại</button>
    </div>
  );
}

function NextLinks({ items }: { items: { label: string; href: string }[] }) {
  return (
    <div className="tl-next">
      <p className="mf-eyebrow !text-[var(--mf-warning)]">Bước tiếp theo</p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        {items.map((item, index) => (
          <Link key={item.href + item.label} href={item.href} className={index === 0 ? "mf-btn mf-btn-primary" : "mf-btn mf-btn-outline-dark"}>
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ---------- 1. Dòng tiền ---------- */

const cashFields = [
  { key: "income", label: "Thu nhập mỗi tháng", hint: "Tổng số tiền bạn nhận được sau thuế.", presets: [10, 15, 20, 30, 50] },
  { key: "fixedExpense", label: "Chi phí cố định", hint: "Nhà ở, điện nước, học phí, bảo hiểm… những khoản gần như không đổi.", presets: [3, 5, 8, 12] },
  { key: "flexibleExpense", label: "Chi phí linh hoạt", hint: "Ăn uống, mua sắm, giải trí… phần bạn có thể điều chỉnh.", presets: [3, 5, 8, 12] },
  { key: "debtPayment", label: "Trả nợ hằng tháng", hint: "Vay mua nhà, xe, thẻ tín dụng. Chọn 0 nếu không có.", presets: [0, 2, 5, 10] },
  { key: "saving", label: "Tiết kiệm hoặc đầu tư mỗi tháng", hint: "Số tiền bạn chủ động dành ra.", presets: [0, 2, 5, 10] },
] as const;

type CashKey = (typeof cashFields)[number]["key"];

function parseMoney(raw: string) {
  const digits = raw.replace(/\D/g, "");
  return digits ? Number(digits) : null;
}

function CashflowFlow() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Partial<Record<CashKey, number>>>({});
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);

  const field = cashFields[step];
  const topRef = usePanelTop(`${step}-${done}`);

  function setAmount(amount: number | null) {
    setText(amount === null ? "" : nf.format(amount));
  }

  function next(event?: React.FormEvent) {
    event?.preventDefault();
    const amount = parseMoney(text);
    if (amount === null) return;
    const updated = { ...values, [field.key]: amount };
    setValues(updated);
    if (step === cashFields.length - 1) {
      setDone(true);
    } else {
      setStep(step + 1);
      const upcoming = updated[cashFields[step + 1].key];
      setText(upcoming === undefined ? "" : nf.format(upcoming));
    }
  }

  function back() {
    setStep(step - 1);
    const prev = values[cashFields[step - 1].key];
    setText(prev === undefined ? "" : nf.format(prev));
  }

  function reset() {
    setStep(0);
    setValues({});
    setText("");
    setDone(false);
  }

  if (done) {
    return <div ref={topRef}><CashflowResult values={values as Record<CashKey, number>} onReset={reset} /></div>;
  }

  return (
    <div ref={topRef}>
      <Progress step={step + 1} total={cashFields.length} />
      <form key={step} className="tl-step" onSubmit={next}>
        <label className="mf-display block text-[1.35rem] font-semibold leading-snug text-[var(--mf-midnight)]" htmlFor="cash-input">
          {field.label}
        </label>
        <p className="mf-muted mt-1 text-sm">{field.hint}</p>
        <div className="tl-money">
          <input
            id="cash-input"
            autoFocus
            inputMode="numeric"
            autoComplete="off"
            placeholder="0"
            value={text}
            onChange={(event) => setAmount(parseMoney(event.target.value))}
          />
          <span>đ / tháng</span>
        </div>
        <div className="tl-chips">
          {field.presets.map((million) => (
            <button key={million} type="button" className="tl-chip" onClick={() => setAmount(million * 1_000_000)}>
              {million === 0 ? "Không có" : `${million} triệu`}
            </button>
          ))}
        </div>
        <div className="tl-actions">
          <button className="mf-btn mf-btn-primary" disabled={parseMoney(text) === null}>
            {step === cashFields.length - 1 ? "Xem bản đồ dòng tiền" : "Tiếp tục"} <ArrowRight size={16} aria-hidden="true" />
          </button>
          {step > 0 ? (
            <button type="button" className="tl-back" onClick={back}><ArrowLeft size={14} aria-hidden="true" /> Quay lại</button>
          ) : null}
        </div>
      </form>
    </div>
  );
}

function CashflowResult({ values, onReset }: { values: Record<CashKey, number>; onReset: () => void }) {
  const { income, fixedExpense, flexibleExpense, debtPayment, saving } = values;
  const net = income - fixedExpense - flexibleExpense - debtPayment;
  const savingRate = income > 0 ? Math.round((saving / income) * 100) : 0;
  const free = net - saving;
  const total = Math.max(income, fixedExpense + flexibleExpense + debtPayment + saving, 1);

  const segments = [
    { name: "Chi phí cố định", value: fixedExpense, color: "var(--mf-midnight)" },
    { name: "Chi phí linh hoạt", value: flexibleExpense, color: "#8a6a2b" },
    { name: "Trả nợ", value: debtPayment, color: "#a9453a" },
    { name: "Tiết kiệm / đầu tư", value: saving, color: "var(--mf-success)" },
    { name: "Phần còn lại chưa phân bổ", value: Math.max(free, 0), color: "var(--mf-gold)" },
  ];

  const headline =
    net < 0
      ? `Chi tiêu và nợ đang vượt thu nhập ${short(Math.abs(net))} mỗi tháng.`
      : free <= 0
        ? `Sau chi tiêu và nợ, bạn còn ${short(net)} mỗi tháng và đã dành toàn bộ cho tiết kiệm.`
        : `Sau chi tiêu và nợ, bạn còn ${short(net)} mỗi tháng. Trong đó ${short(free)} chưa được giao nhiệm vụ.`;

  const advice =
    net < 0
      ? "Hãy bắt đầu từ khoản chi linh hoạt, sau đó xem lại các khoản nợ có chi phí cao. Chỉ cần đưa dòng tiền về mức cân bằng là đã tiến một bước lớn."
      : savingRate >= 20
        ? `Bạn đang dành ${savingRate}% thu nhập cho tương lai, một nền tảng tốt. Bước tiếp theo là quyết định số tiền ấy đi vào đâu một cách có chủ đích.`
        : `Tỷ lệ tiết kiệm hiện tại là ${savingRate}%. Nhiều người chọn bắt đầu từ 10–20% thu nhập và tăng dần khi dòng tiền ổn định.`;

  return (
    <div className="tl-result">
      <p className="mf-eyebrow !text-[var(--mf-warning)]">Bản đồ dòng tiền của bạn</p>
      <p className="mf-display mt-2 text-[clamp(1.5rem,3vw,2.1rem)] font-bold leading-tight text-[var(--mf-midnight)]">{headline}</p>
      <div className="tl-stack" role="img" aria-label="Cơ cấu thu nhập hằng tháng">
        {segments.filter((segment) => segment.value > 0).map((segment) => (
          <span key={segment.name} style={{ width: `${(segment.value / total) * 100}%`, background: segment.color }} />
        ))}
      </div>
      <ul className="tl-legend">
        {segments.map((segment) => (
          <li key={segment.name}>
            <i style={{ background: segment.color }} />
            <span>{segment.name}</span>
            <b>{short(segment.value)}{income > 0 ? ` · ${Math.round((segment.value / income) * 100)}%` : ""}</b>
          </li>
        ))}
      </ul>
      <p className="mt-4 leading-7 text-[var(--mf-slate)]">{advice}</p>
      <NextLinks items={[{ label: "Nhận ebook “5 bước nhìn rõ dòng tiền gia đình”", href: "/ebooks" }, { label: "Đặt lịch tư vấn 1:1", href: "/contact" }]} />
      <SaveBox save={(email, consent) => submitCashflow({ ...values, email, consentGiven: consent, company: "" })} />
      <ResultActions onReset={onReset} />
    </div>
  );
}

/* ---------- 2. Sẵn sàng đầu tư ---------- */

function QuizFlow() {
  const [answers, setAnswers] = useState<number[] | null>(null);
  const topRef = usePanelTop(answers === null);
  const questions = quizAreas.map((area) => ({
    q: area.q,
    options: area.options.map((label, value) => ({ label, value })),
  }));

  if (!answers) return <div ref={topRef}><ChoiceWizard<number> questions={questions} onDone={setAnswers} /></div>;

  const score = answers.reduce((sum, value) => sum + value, 0);
  const tier =
    score >= 12
      ? { name: "Nền tảng vững", text: "Sức khỏe tài chính của bạn đang tốt. Bạn có thể tập trung tối ưu việc đầu tư và mục tiêu dài hạn." }
      : score >= 8
        ? { name: "Đang đi đúng hướng", text: "Bạn đã có nhiều viên gạch đầu tiên. Một kế hoạch 90 ngày để tăng quỹ dự phòng và kiểm soát chi tiêu sẽ giúp nền móng chắc hơn." }
        : { name: "Cần dựng nền trước", text: "Hãy ưu tiên ngân sách cơ bản, quỹ dự phòng và xử lý nợ trước khi nghĩ đến đầu tư. Đây là bước chuẩn bị rất đáng làm." };
  const weakest = answers.reduce((min, value, index) => (value < answers[min] ? index : min), 0);

  const values = Object.fromEntries(quizAreas.map((area, index) => [area.key, answers[index]]));

  return (
    <div className="tl-result" ref={topRef}>
      <p className="mf-eyebrow !text-[var(--mf-warning)]">Kết quả của bạn</p>
      <div className="tl-score">
        <b>{score}</b><span>/15</span>
        <em>{tier.name}</em>
      </div>
      <div className="tl-meter" aria-hidden="true"><span style={{ width: `${(score / 15) * 100}%` }} /></div>
      <p className="mt-4 leading-7 text-[var(--mf-slate)]">{tier.text}</p>
      <ul className="tl-areas">
        {quizAreas.map((area, index) => (
          <li key={area.key} className={index === weakest ? "is-weak" : ""}>
            <span>{area.name}</span>
            <span className="tl-dots" aria-label={`${answers[index]}/3`}>
              {[0, 1, 2].map((dot) => <i key={dot} className={dot < answers[index] ? "on" : ""} />)}
            </span>
          </li>
        ))}
      </ul>
      <div className="tl-tip">
        <b>Nên ưu tiên: {quizAreas[weakest].name}.</b> {quizAreas[weakest].tip}
      </div>
      <NextLinks items={[{ label: "Nhận checklist sức khỏe tài chính", href: "/ebooks" }, { label: "Đặt lịch tư vấn 1:1", href: "/contact" }]} />
      <SaveBox save={(email, consent) => submitFinancialQuiz({ ...values, email, consentGiven: consent, company: "" })} />
      <ResultActions onReset={() => setAnswers(null)} />
    </div>
  );
}

/* ---------- 3. Chân dung tiền bạc ---------- */

function PersonaFlow() {
  const [answers, setAnswers] = useState<PersonaKey[] | null>(null);
  const topRef = usePanelTop(answers === null);

  if (!answers) return <div ref={topRef}><ChoiceWizard<PersonaKey> questions={personaQuestions} onDone={setAnswers} /></div>;

  const counts = Object.fromEntries(personaOrder.map((key) => [key, 0])) as Record<PersonaKey, number>;
  answers.forEach((key) => { counts[key] += 1; });
  const topCount = Math.max(...personaOrder.map((key) => counts[key]));
  // Hòa điểm: ưu tiên chân dung được chọn ở câu gần nhất.
  const tied = personaOrder.filter((key) => counts[key] === topCount);
  const winner = [...answers].reverse().find((key) => tied.includes(key)) ?? tied[0];
  const persona = personas[winner];

  return (
    <div className="tl-result" ref={topRef}>
      <p className="mf-eyebrow !text-[var(--mf-warning)]">Chân dung tiền bạc của bạn</p>
      <div className="tl-persona">
        <div className="tl-persona-img">
          <Image src={persona.image} alt={persona.name} fill sizes="(max-width: 768px) 100vw, 320px" className="object-cover" />
        </div>
        <div>
          <h4 className="mf-display text-[clamp(1.9rem,4vw,2.6rem)] font-bold leading-tight text-[var(--mf-midnight)]">{persona.name}</h4>
          <p className="mt-2 leading-7 text-[var(--mf-slate)]">{persona.tagline}</p>
          <dl className="tl-dl">
            <div><dt>Điểm mạnh</dt><dd>{persona.strengths}</dd></div>
            <div><dt>Điều nên lưu ý</dt><dd>{persona.watch}</dd></div>
          </dl>
        </div>
      </div>
      <ul className="tl-bars">
        {personaOrder.map((key) => (
          <li key={key}>
            <span>{personas[key].name}</span>
            <span className="tl-bar"><i style={{ width: `${(counts[key] / answers.length) * 100}%` }} /></span>
            <b>{Math.round((counts[key] / answers.length) * 100)}%</b>
          </li>
        ))}
      </ul>
      <NextLinks items={[persona.next, { label: "Đặt lịch tư vấn 1:1", href: "/contact" }]} />
      <SaveBox save={(email, consent) => submitMoneyPersona({ persona: winner, answers, email, consentGiven: consent, company: "" })} />
      <ResultActions onReset={() => setAnswers(null)} />
    </div>
  );
}

/* ---------- 4. Mục tiêu cần bao nhiêu ---------- */

function GoalFlow() {
  const [target, setTarget] = useState(1_000_000_000);
  const [current, setCurrent] = useState(0);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(5);

  const months = years * 12;
  const monthly = Math.ceil(monthlyNeeded(target, years, current, rate) / 10_000) * 10_000;
  const contributed = monthly * months;
  const growth = Math.max(target - current - contributed, 0);
  const longer = Math.ceil(monthlyNeeded(target, years + 2, current, rate) / 10_000) * 10_000;
  const barTotal = Math.max(current + contributed + growth, 1);

  return (
    <div className="tl-goal">
      <div className="tl-goal-form">
        <MoneyField label="Số tiền mục tiêu" value={target} onChange={setTarget} presets={[500, 1000, 2000, 5000]} />
        <MoneyField label="Số tiền bạn đã có" value={current} onChange={setCurrent} presets={[0, 50, 100, 300]} />
        <label className="tl-range">
          <span>Thời gian thực hiện <b>{years} năm</b></span>
          <input type="range" min={1} max={30} step={1} value={years} onChange={(event) => setYears(Number(event.target.value))} />
        </label>
        <label className="tl-range">
          <span>Mức sinh lời giả định mỗi năm <b>{rate.toLocaleString("vi-VN")}%</b></span>
          <input type="range" min={0} max={12} step={0.5} value={rate} onChange={(event) => setRate(Number(event.target.value))} />
          <small>Con số giả định để bạn hình dung. Bạn có thể thử các mức khác nhau.</small>
        </label>
      </div>

      <div className="tl-result tl-goal-result">
        <p className="mf-eyebrow !text-[var(--mf-warning)]">Kế hoạch của bạn</p>
        {monthly === 0 ? (
          <p className="mf-display mt-2 text-[1.6rem] font-bold leading-tight text-[var(--mf-midnight)]">
            Khoản bạn đã có đã đủ để chạm mục tiêu sau {years} năm theo giả định này.
          </p>
        ) : (
          <>
            <p className="mt-2 text-sm text-[var(--mf-slate)]">Mỗi tháng nên dành ra khoảng</p>
            <p className="mf-display text-[clamp(2.2rem,5vw,3.2rem)] font-bold leading-none text-[var(--mf-midnight)]">{short(monthly)}</p>
            <div className="tl-stack" role="img" aria-label="Cơ cấu nguồn tiền để chạm mục tiêu">
              {current > 0 ? <span style={{ width: `${(current / barTotal) * 100}%`, background: "var(--mf-midnight)" }} /> : null}
              <span style={{ width: `${(contributed / barTotal) * 100}%`, background: "var(--mf-gold)" }} />
              {growth > 0 ? <span style={{ width: `${(growth / barTotal) * 100}%`, background: "var(--mf-success)" }} /> : null}
            </div>
            <ul className="tl-legend">
              {current > 0 ? <li><i style={{ background: "var(--mf-midnight)" }} /><span>Số tiền bạn đã có</span><b>{short(current)}</b></li> : null}
              <li><i style={{ background: "var(--mf-gold)" }} /><span>Tổng số bạn dành ra ({months} tháng)</span><b>{short(contributed)}</b></li>
              {growth > 0 ? <li><i style={{ background: "var(--mf-success)" }} /><span>Phần tăng thêm theo giả định</span><b>{short(growth)}</b></li> : null}
            </ul>
            {years < 30 ? (
              <p className="mt-3 leading-7 text-[var(--mf-slate)]">
                Nếu kéo dài thêm 2 năm, mỗi tháng chỉ cần khoảng <b className="text-[var(--mf-midnight)]">{short(longer)}</b>.
              </p>
            ) : null}
          </>
        )}
        <NextLinks items={[{ label: "Đặt lịch tư vấn 1:1", href: "/contact" }, { label: "Xem ebook về phân bổ tài sản", href: "/ebooks" }]} />
        <SaveBox save={(email, consent) => submitGoalPlanner({ target, years, current, rate, email, consentGiven: consent, company: "" })} />
      </div>
    </div>
  );
}

function MoneyField({
  label,
  value,
  onChange,
  presets,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  presets: number[];
}) {
  return (
    <div className="tl-field">
      <span className="tl-field-label">{label}</span>
      <div className="tl-money">
        <input
          inputMode="numeric"
          autoComplete="off"
          aria-label={label}
          value={value === 0 ? "" : nf.format(value)}
          placeholder="0"
          onChange={(event) => onChange(parseMoney(event.target.value) ?? 0)}
        />
        <span>đ</span>
      </div>
      <div className="tl-chips">
        {presets.map((million) => (
          <button key={million} type="button" className="tl-chip" onClick={() => onChange(million * 1_000_000)}>
            {million === 0 ? "Chưa có" : million >= 1000 ? `${million / 1000} tỷ` : `${million} triệu`}
          </button>
        ))}
      </div>
    </div>
  );
}
