import React, { useState, useRef, useEffect } from 'react';

export const Terminal = () => {
  const [history, setHistory] = useState([
    { type: 'cmd', text: 'whoami' },
    { type: 'out', text: 'om' },
    { type: 'cmd', text: 'pwd' },
    { type: 'out', text: '/home/om' },
    { type: 'cmd', text: 'ls' },
    { type: 'out', text: 'projects  scripts  cloud-lab' },
    { type: 'cmd', text: 'echo "Building my cloud engineering journey"' },
    { type: 'out', text: 'Building my cloud engineering journey' },
  ]);

  const [inputVal, setInputVal] = useState('');
  const outputRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const runCommand = (raw) => {
    const cmd = raw.trim();
    if (!cmd) {
      setHistory((prev) => [...prev, { type: 'cmd', text: '' }]);
      return;
    }

    const parts = cmd.split(/\s+/);
    const name = parts[0].toLowerCase();

    if (name === 'clear') {
      setHistory([]);
      return;
    }

    let output = '';
    let isError = false;

    if (name === 'whoami') {
      output = 'om';
    } else if (name === 'pwd') {
      output = '/home/om';
    } else if (name === 'ls') {
      output = 'projects  scripts  cloud-lab';
    } else if (name === 'echo') {
      const rest = cmd.slice(4).trim().replace(/^(["'])(.*)\1$/, '$2');
      output = rest;
    } else if (name === 'help') {
      output =
        'Available commands:\n  whoami   show the current user\n  pwd      print the working directory\n  ls       list files\n  echo     print text, e.g. echo hello\n  help     show this list\n  clear    clear the screen';
    } else {
      isError = true;
      output = `${name}: command not found. This is a simulated terminal, type help to see what it supports.`;
    }

    setHistory((prev) => [
      ...prev,
      { type: 'cmd', text: raw },
      { type: isError ? 'err' : 'out', text: output },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    runCommand(inputVal);
    setInputVal('');
  };

  const quickCommands = ['whoami', 'pwd', 'ls', 'help', 'clear'];

  return (
    <section id="terminal">
      <div className="wrap">
        <div className="termgrid">
          <div className="rv">
            <div className="eyebrow mono">LINUX</div>
            <h2>Comfortable on the command line.</h2>
            <p className="sub">Try a few commands. Click a button or type one into the terminal.</p>

            <div className="cmds" id="cmds">
              {quickCommands.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    runCommand(c);
                    inputRef.current?.focus({ preventScroll: true });
                  }}
                >
                  {c}
                </button>
              ))}
            </div>

            <p className="safe mono">A SAFE, SIMULATED LINUX TERMINAL EXPERIENCE</p>
          </div>

          <div className="term rv" id="term">
            <div className="tbar">
              <i />
              <i />
              <i />
              <span>om@cloud-lab: ~</span>
            </div>

            <div className="tout" id="tout" ref={outputRef} role="log" aria-live="polite">
              {history.map((item, idx) => {
                if (item.type === 'cmd') {
                  return (
                    <div key={idx}>
                      <span className="pu">om@cloud-lab</span>:
                      <span className="ph">~</span>$ {item.text}
                    </div>
                  );
                }
                if (item.type === 'err') {
                  return (
                    <div key={idx} style={{ color: '#fca5a5' }}>
                      {item.text}
                    </div>
                  );
                }
                return <div key={idx}>{item.text}</div>;
              })}
            </div>

            <form
              className="tin"
              id="tform"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <label htmlFor="tcmd">
                <span className="pu">om@cloud-lab</span>:
                <span className="ph">~</span>$
              </label>
              <input
                id="tcmd"
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                spellCheck="false"
                autoCapitalize="off"
                autoComplete="off"
                aria-label="Terminal command, try help"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
