import { useState, useEffect } from 'react'
import s from './AdminPage.module.css'

const ADMIN_PASS = 'pworld2024' // Admin can change this

function fmt(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) +
    ' · ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}

function getMessages() {
  return JSON.parse(localStorage.getItem('pworld_messages') || '[]')
}
function saveMessages(msgs) {
  localStorage.setItem('pworld_messages', JSON.stringify(msgs))
}

export default function AdminPage({ onExit }) {
  const [authed, setAuthed] = useState(() => localStorage.getItem('pworld_authed') === 'true')
  const [pw, setPw] = useState('')
  const [pwErr, setPwErr] = useState(false)
  const [messages, setMessages] = useState([])
  const [selected, setSelected] = useState(null)
  const [replyText, setReplyText] = useState('')
  const [replySent, setReplySent] = useState(false)
  const [filter, setFilter] = useState('all')    // all | unread | read
  const [search, setSearch] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const [smtpStatus, setSmtpStatus] = useState('')

  useEffect(() => {
    if (authed) setMessages(getMessages())
  }, [authed])

  // ── Auth ────────────────────────────────────────────────────────────────
  const login = (e) => {
    e.preventDefault()
    if (pw === ADMIN_PASS) {
      setAuthed(true)
      setPwErr(false)
      localStorage.setItem('pworld_authed', 'true')
    }
    else {
      setPwErr(true)
      setPw('')
    }
  }

  const handleExit = () => {
    setAuthed(false)
    localStorage.removeItem('pworld_authed')
    if (onExit) onExit()
  }

  // ── Message helpers ─────────────────────────────────────────────────────
  const markRead = (id) => {
    const updated = messages.map(m => m.id === id ? { ...m, read: true } : m)
    setMessages(updated); saveMessages(updated)
  }

  const openMessage = (msg) => {
    setSelected(msg); setReplyText(msg.reply || ''); setReplySent(false)
    if (!msg.read) markRead(msg.id)
  }

  const sendReply = async () => {
    if (!replyText.trim()) return

    setSmtpStatus('Sending...')
    try {
      const res = await fetch('/api/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: selected.email,
          subject: 'Re: Your Enquiry — P-World Engineering',
          text: replyText
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to send')

      const updated = messages.map(m =>
        m.id === selected.id ? { ...m, reply: replyText, repliedAt: new Date().toISOString() } : m
      )
      setMessages(updated); saveMessages(updated)
      setSelected(prev => ({ ...prev, reply: replyText, repliedAt: new Date().toISOString() }))
      setReplySent(true)
      setSmtpStatus('Sent successfully via SMTP')
    } catch (err) {
      setSmtpStatus(`Error: ${err.message}. Ensure backend is running!`)
    }
  }

  const deleteMessage = (id) => {
    const updated = messages.filter(m => m.id !== id)
    setMessages(updated); saveMessages(updated)
    if (selected?.id === id) setSelected(null)
    setDeleteConfirm(null)
  }

  const markAllRead = () => {
    const updated = messages.map(m => ({ ...m, read: true }))
    setMessages(updated); saveMessages(updated)
  }

  // ── Filtering ───────────────────────────────────────────────────────────
  const filtered = messages.filter(m => {
    const matchFilter =
      filter === 'all' ? true :
        filter === 'unread' ? !m.read :
          filter === 'read' ? m.read : true
    const q = search.toLowerCase()
    const matchSearch = !q ||
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.message.toLowerCase().includes(q) ||
      (m.service || '').toLowerCase().includes(q)
    return matchFilter && matchSearch
  })

  const unreadCount = messages.filter(m => !m.read).length

  // ── Login Screen ────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className={s.loginWrap}>
        <div className={s.loginBox}>
          <div className={s.loginLogo}>P-<span>WORLD</span></div>
          <p className={s.loginSub}>Admin Dashboard</p>
          <form onSubmit={login} className={s.loginForm}>
            <label className={s.loginField}>
              <span className={s.loginLbl}>Password</span>
              <input
                type="password"
                value={pw}
                onChange={e => { setPw(e.target.value); setPwErr(false) }}
                className={`${s.loginInput} ${pwErr ? s.loginInputErr : ''}`}
                placeholder="Enter admin password"
                autoFocus
              />
              {pwErr && <span className={s.loginErr}>Incorrect password</span>}
            </label>
            <button type="submit" className={s.loginBtn}>⚡ Sign In</button>
          </form>
          <button className={s.loginBack} onClick={onExit}>← Back to site</button>
        </div>
      </div>
    )
  }

  // ── Dashboard ───────────────────────────────────────────────────────────
  return (
    <div className={s.dashboard}>

      {/* Sidebar */}
      <aside className={s.sidebar}>
        <div className={s.sideTop}>
          <div className={s.sideLogo}>P-<span>WORLD</span></div>
          <p className={s.sideRole}>Admin Panel</p>
        </div>

        <nav className={s.sideNav}>
          <button
            className={`${s.sideItem} ${filter === 'all' ? s.active : ''}`}
            onClick={() => setFilter('all')}
          >
            📨 All Messages
            <span className={s.badge}>{messages.length}</span>
          </button>
          <button
            className={`${s.sideItem} ${filter === 'unread' ? s.active : ''}`}
            onClick={() => setFilter('unread')}
          >
            🔴 Unread
            {unreadCount > 0 && <span className={`${s.badge} ${s.badgeRed}`}>{unreadCount}</span>}
          </button>
          <button
            className={`${s.sideItem} ${filter === 'read' ? s.active : ''}`}
            onClick={() => setFilter('read')}
          >
            ✅ Read
            <span className={s.badge}>{messages.length - unreadCount}</span>
          </button>
        </nav>

        <div className={s.sideActions}>
          {unreadCount > 0 && (
            <button className={s.markAllBtn} onClick={markAllRead}>
              Mark all read
            </button>
          )}
          <button className={s.exitBtn} onClick={handleExit}>
            ← Exit Admin
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className={s.main}>

        {/* Header */}
        <header className={s.header}>
          <div>
            <h1 className={s.headerTitle}>Messages</h1>
            <p className={s.headerSub}>
              {filtered.length} message{filtered.length !== 1 ? 's' : ''}
              {unreadCount > 0 && ` · ${unreadCount} unread`}
            </p>
          </div>
          <div className={s.searchWrap}>
            <span className={s.searchIcon}>🔍</span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={s.searchInput}
              placeholder="Search messages…"
            />
          </div>
        </header>

        <div className={s.body}>

          {/* Message list */}
          <div className={`${s.list} ${selected ? s.listNarrow : ''}`}>
            {filtered.length === 0 ? (
              <div className={s.empty}>
                <div className={s.emptyIcon}>📭</div>
                <p>No messages found</p>
              </div>
            ) : (
              filtered.map(msg => (
                <div
                  key={msg.id}
                  className={`${s.msgRow} ${!msg.read ? s.unread : ''} ${selected?.id === msg.id ? s.selectedRow : ''}`}
                  onClick={() => openMessage(msg)}
                >
                  {!msg.read && <span className={s.unreadDot} />}
                  <div className={s.msgMeta}>
                    <span className={s.msgName}>{msg.name}</span>
                    <span className={s.msgDate}>{fmt(msg.date)}</span>
                  </div>
                  <p className={s.msgEmail}>{msg.email}</p>
                  {msg.service && (
                    <span className={s.msgService}>{msg.service}</span>
                  )}
                  <p className={s.msgPreview}>{msg.message}</p>
                  {msg.reply && <span className={s.replied}>✓ Replied</span>}
                </div>
              ))
            )}
          </div>

          {/* Message detail */}
          {selected && (
            <div className={s.detail}>
              <div className={s.detailHead}>
                <div>
                  <h2 className={s.detailName}>{selected.name}</h2>
                  <p className={s.detailMeta}>{selected.email} · {fmt(selected.date)}</p>
                </div>
                <div className={s.detailActions}>
                  {deleteConfirm === selected.id ? (
                    <div className={s.confirmDelete}>
                      <span>Delete this message?</span>
                      <button className={s.confirmYes} onClick={() => deleteMessage(selected.id)}>Yes</button>
                      <button className={s.confirmNo} onClick={() => setDeleteConfirm(null)}>No</button>
                    </div>
                  ) : (
                    <button className={s.deleteBtn} onClick={() => setDeleteConfirm(selected.id)}>
                      🗑 Delete
                    </button>
                  )}
                  <button className={s.closeBtn} onClick={() => setSelected(null)}>✕</button>
                </div>
              </div>

              <div className={s.detailFields}>
                {selected.service && (
                  <div className={s.detailField}>
                    <span className={s.detailLabel}>Service</span>
                    <span>{selected.service}</span>
                  </div>
                )}
                {selected.location && (
                  <div className={s.detailField}>
                    <span className={s.detailLabel}>Location</span>
                    <span>{selected.location}</span>
                  </div>
                )}
              </div>

              <div className={s.detailBody}>
                <p className={s.detailMsgLabel}>Message</p>
                <div className={s.detailMsg}>{selected.message}</div>
              </div>

              <div className={s.replyBox}>
                <p className={s.replyLabel}>
                  {selected.reply ? '✓ Previously replied — edit & resend' : 'Reply to this message'}
                </p>
                <textarea
                  className={s.replyArea}
                  value={replyText}
                  onChange={e => { setReplyText(e.target.value); setReplySent(false); setSmtpStatus('') }}
                  placeholder={`Hi ${selected.name},\n\nThank you for reaching out to P-World Engineering…`}
                />

                <div className={s.replyFooter}>
                  <span className={s.replyTo}>To: {selected.email}</span>
                  <button
                    className={`${s.replyBtn} ${replySent ? s.replySent : ''}`}
                    onClick={sendReply}
                    disabled={!replyText.trim() || smtpStatus === 'Sending...'}
                  >
                    {replySent ? '✓ Sent Successfully' : '⚡ Send via SMTP'}
                  </button>
                </div>
                {smtpStatus && (
                  <p className={s.replyHint} style={{ color: smtpStatus.startsWith('Error') ? '#ff4444' : '#44ff44', marginTop: '10px' }}>
                    {smtpStatus}
                  </p>
                )}
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Delete confirm overlay */}
    </div>
  )
}
