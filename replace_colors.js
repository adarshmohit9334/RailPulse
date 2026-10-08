const fs = require('fs');
const path = require('path');

const replacements = [
  // text
  [/text-slate-900/g, 'text-rp-text-very-dark'],
  [/text-slate-800/g, 'text-rp-text-very-dark'],
  [/text-slate-700/g, 'text-rp-text-very-dark'],
  [/text-slate-600/g, 'text-rp-text-secondary'],
  [/text-slate-500/g, 'text-rp-text-muted'],
  [/text-slate-400/g, 'text-rp-text-muted'],
  [/text-slate-300/g, 'text-rp-text-muted'],
  [/text-blue-500/g, 'text-rp-blue-muted'],
  [/text-blue-600/g, 'text-rp-blue-muted'],
  [/text-blue-700/g, 'text-rp-blue-dark'],
  [/text-green-500/g, 'text-rp-success'],
  [/text-green-600/g, 'text-rp-success'],
  [/text-green-700/g, 'text-rp-success'],
  [/text-red-500/g, 'text-rp-danger'],
  [/text-red-600/g, 'text-rp-danger'],
  [/text-red-700/g, 'text-rp-danger'],
  [/text-amber-500/g, 'text-rp-warning'],
  [/text-amber-600/g, 'text-rp-warning'],
  [/text-amber-700/g, 'text-rp-warning'],
  [/text-rp-text /g, 'text-rp-text-very-dark '],
  [/text-rp-primary/g, 'text-rp-blue-primary'],
  
  // bg
  [/bg-white/g, 'bg-rp-surface'],
  [/bg-slate-50/g, 'bg-rp-bg-secondary'],
  [/bg-slate-100/g, 'bg-rp-bg-secondary'],
  [/bg-blue-50\/50/g, 'bg-rp-surface-soft'],
  [/bg-blue-50/g, 'bg-rp-surface-soft'],
  [/bg-blue-100/g, 'bg-[var(--color-rp-border-soft)]'],
  [/bg-blue-200/g, 'bg-[var(--color-rp-border-soft)]'],
  [/bg-blue-500/g, 'bg-rp-blue-muted'],
  [/bg-blue-600/g, 'bg-rp-blue-primary'],
  [/bg-blue-700/g, 'bg-rp-blue-dark'],
  [/bg-green-50/g, 'bg-rp-success-bg'],
  [/bg-green-100/g, 'bg-rp-success-bg'],
  [/bg-red-50/g, 'bg-rp-danger-bg'],
  [/bg-red-100/g, 'bg-rp-danger-bg'],
  [/bg-amber-50/g, 'bg-rp-warning-bg'],
  [/bg-amber-100/g, 'bg-rp-warning-bg'],

  // borders
  [/border-slate-100/g, 'border-rp-border-soft'],
  [/border-slate-200/g, 'border-rp-border'],
  [/border-slate-300/g, 'border-rp-border'],
  [/border-blue-100/g, 'border-rp-border-soft'],
  [/border-blue-500/g, 'border-rp-blue-muted'],
  [/border-blue-600/g, 'border-rp-blue-primary'],

  // border rings
  [/ring-blue-100/g, 'ring-[var(--color-rp-border-soft)]'],
  [/ring-blue-500\/20/g, 'ring-rp-blue-primary/20'],
  [/ring-blue-500/g, 'ring-rp-blue-muted'],

  // shadows
  [/shadow-sm/g, 'shadow-[var(--shadow-rp-soft)]'],
  [/shadow-md/g, 'shadow-[var(--shadow-rp-soft)]'],
  [/shadow-rp-sm/g, 'shadow-[var(--shadow-rp-soft)]'],

  // radiuses
  [/rounded-2xl/g, 'rounded-[var(--radius-rp-card)]'],
  [/rounded-3xl/g, 'rounded-[var(--radius-rp-card)]'],
  [/rounded-xl/g, 'rounded-[var(--radius-rp-input)]'],
  [/rounded-rp-card/g, 'rounded-[var(--radius-rp-card)]'],
  [/rounded-lg/g, 'rounded-[var(--radius-rp-button)]'],
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let newContent = content;
      for (const [regex, replacement] of replacements) {
        newContent = newContent.replace(regex, replacement);
      }
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

['app', 'components', 'features'].forEach(dir => processDirectory(dir));

