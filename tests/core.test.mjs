import test from 'node:test';
import assert from 'node:assert/strict';
import { approvedSourceErrors, findApprovedSources, isHighRiskQuestion } from '../farmvoice-core.mjs';

const today = '2026-11-20';
const valid = {
  status: 'Approved', country: 'KE', crop: 'Maize', url: 'https://example.org/evidence',
  permission: 'Open licence verified', reviewer: 'Qualified reviewer', expiry: '2027-02-01'
};

test('high-risk crop chemical and livestock questions are escalated', () => {
  assert.equal(isHighRiskQuestion('What pesticide dose should I apply?'), true);
  assert.equal(isHighRiskQuestion('My cow is sick, which medicine should I use?'), true);
  assert.equal(isHighRiskQuestion('How do farmers compare soil research?'), false);
});

test('approval rejects missing provenance, permission, review or expired records', () => {
  assert.deepEqual(approvedSourceErrors(valid, today), []);
  assert.ok(approvedSourceErrors({ ...valid, url: 'http://example.org' }, today).includes('https URL'));
  assert.ok(approvedSourceErrors({ ...valid, permission: 'Unknown' }, today).includes('verified permission'));
  assert.ok(approvedSourceErrors({ ...valid, reviewer: 'Unassigned' }, today).includes('independent reviewer'));
  assert.ok(approvedSourceErrors({ ...valid, expiry: today }, today).includes('future review date'));
  assert.ok(approvedSourceErrors({ ...valid, permission: 'Synthetic demonstration' }, today).includes('non-synthetic source'));
});

test('retrieval matches only approved sources with exact country, crop and current permission checks', () => {
  const records = [valid,
    { ...valid, country: 'IN' },
    { ...valid, crop: 'Beans' },
    { ...valid, status: 'Awaiting review' },
    { ...valid, expiry: '2026-11-19' },
    { ...valid, permission: 'Unknown' },
    { ...valid, permission: 'Synthetic demonstration' }
  ];
  assert.deepEqual(findApprovedSources(records, 'KE', 'Maize', today), [valid]);
  assert.deepEqual(findApprovedSources(records, 'IN', 'Maize', today), [records[1]]);
  assert.deepEqual(findApprovedSources(records, 'US', 'Maize', today), []);
  assert.deepEqual(findApprovedSources(records, 'KE', '', today), []);
});
