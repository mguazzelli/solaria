const SENSITIVE_TERMS = ['cura', 'curar', 'milagre', 'garantido', '100% eficaz'];

export function checkEthics(title: string, content: string) {
    const text = (title + ' ' + content).toLowerCase();
    const violations = SENSITIVE_TERMS.filter(term => text.includes(term));
    return {
        isEthical: violations.length === 0,
        violations
    };
}
