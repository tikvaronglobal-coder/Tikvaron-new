const riskyQuestion = /pesticide|herbicide|fungicide|insecticide|chemical|dose|dosage|treatment|diagnos|disease|symptom|poison|medicine|medication|antibiotic|mix(ing)? chemical|emergency|sick animal|animal health|human health/i;

export function isHighRiskQuestion(question) {
  return riskyQuestion.test(String(question ?? ''));
}

export function approvedSourceErrors(source = {}, today = new Date().toISOString().slice(0, 10)) {
  const errors = [];
  if (!/^https:\/\//i.test(source.url ?? '')) errors.push('https URL');
  if (!['Open licence verified', 'Permission granted'].includes(source.permission)) errors.push('verified permission');
  if (!source.reviewer?.trim() || source.reviewer.trim().toLowerCase() === 'unassigned') errors.push('independent reviewer');
  if (!source.expiry || source.expiry <= today) errors.push('future review date');
  if (source.permission === 'Synthetic demonstration') errors.push('non-synthetic source');
  return errors;
}

export function findApprovedSources(sources, countryCode, crop, today = new Date().toISOString().slice(0, 10)) {
  const normalizedCrop = String(crop ?? '').trim().toLowerCase();
  if (!countryCode || !normalizedCrop) return [];
  return (sources ?? []).filter(source =>
    source.status === 'Approved' &&
    source.country === countryCode &&
    String(source.crop ?? '').trim().toLowerCase() === normalizedCrop &&
    source.expiry > today &&
    approvedSourceErrors(source, today).length === 0
  );
}
