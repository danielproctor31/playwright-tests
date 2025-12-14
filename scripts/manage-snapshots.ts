#!/usr/bin/env node

/**
 * Visual Regression Snapshot Management Tool
 * 
 * This script helps manage visual regression test snapshots:
 * - Review snapshot differences
 * - Approve or reject changes
 * - Bulk operations on snapshots
 * 
 * Usage:
 *   pnpm snapshots:update    - Update all snapshots
 *   pnpm snapshots:approve   - Approve all snapshot changes
 *   pnpm snapshots:compare   - Compare snapshots without updating
 */

import { existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const SNAPSHOTS_DIR = './tests';

/**
 * Find all snapshot directories
 */
function findSnapshotDirectories(dir: string): string[] {
  const snapshots: string[] = [];
  
  try {
    const files = readdirSync(dir);
    
    for (const file of files) {
      const fullPath = join(dir, file);
      
      if (statSync(fullPath).isDirectory()) {
        if (file.endsWith('-snapshots')) {
          snapshots.push(fullPath);
        } else {
          // Recursively search subdirectories
          snapshots.push(...findSnapshotDirectories(fullPath));
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
  }
  
  return snapshots;
}

/**
 * Count snapshots in a directory
 */
function countSnapshots(dir: string): number {
  if (!existsSync(dir)) return 0;
  
  const files = readdirSync(dir);
  return files.filter(f => f.endsWith('.png')).length;
}

/**
 * Display snapshot summary
 */
function displaySnapshotSummary() {
  console.log('\n📸 Visual Regression Snapshot Summary\n');
  
  const snapshotDirs = findSnapshotDirectories(SNAPSHOTS_DIR);
  
  if (snapshotDirs.length === 0) {
    console.log('No snapshot directories found.');
    return;
  }
  
  let totalSnapshots = 0;
  
  for (const dir of snapshotDirs) {
    const count = countSnapshots(dir);
    totalSnapshots += count;
    console.log(`  ${dir}: ${count} snapshot(s)`);
  }
  
  console.log(`\n  Total: ${totalSnapshots} snapshot(s)\n`);
}

/**
 * Display usage instructions
 */
function displayUsage() {
  console.log(`
Visual Regression Snapshot Management
======================================

Available commands:

  pnpm snapshots:update     Update all visual snapshots
  pnpm snapshots:approve    Approve all snapshot changes (alias for update)
  pnpm snapshots:compare    Compare without updating

Workflow:

  1. Make UI changes
  2. Run: pnpm test:visual
  3. If differences found, review the HTML report: pnpm report
  4. Approve changes: pnpm snapshots:approve
  5. Commit updated snapshots

Tips:

  - Snapshots are stored in *-snapshots directories
  - Each browser/viewport has its own snapshots
  - Always review differences before approving
  - Commit snapshots along with code changes

Current snapshot status:
`);
  
  displaySnapshotSummary();
}

// Main execution
const command = process.argv[2];

if (command === 'summary') {
  displaySnapshotSummary();
} else {
  displayUsage();
}
